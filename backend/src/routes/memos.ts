import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../db/connect";
import { memos } from "../db/schema";
import { eq, desc } from "drizzle-orm";

const app = new Hono();

// Zod Schema for Memo Validation
const createMemoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

const updateMemoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

// === Routes ===

// 1. GET /api/memos (一覧取得)
app.get("/", async (c) => {
  try {
    const allMemos = await db
      .select()
      .from(memos)
      .orderBy(desc(memos.updatedAt))
      .all();
    return c.json(allMemos);
  } catch (error) {
    return c.json({ error: "Failed to fetch memos" }, 500);
  }
});

// 2. GET /api/memos/:id (詳細取得)
app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const memo = await db.select().from(memos).where(eq(memos.id, id)).get();
    if (!memo) return c.json({ error: "Memo not found" }, 404);
    return c.json(memo);
  } catch (error) {
    return c.json({ error: "Failed to fetch memo" }, 500);
  }
});

// 3. POST /api/memos (新規作成)
app.post("/", zValidator("json", createMemoSchema), async (c) => {
  const body = c.req.valid("json");

  try {
    const result = await db
      .insert(memos)
      .values({
        title: body.title,
        content: body.content,
      })
      .returning()
      .get();

    // TODO: Handle tags (later step)

    return c.json(result, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create memo" }, 500);
  }
});

// 4. PUT /api/memos/:id (更新)
app.put("/:id", zValidator("json", updateMemoSchema), async (c) => {
  const id = Number(c.req.param("id"));
  const body = c.req.valid("json");

  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const existing = await db
      .select()
      .from(memos)
      .where(eq(memos.id, id))
      .get();
    if (!existing) return c.json({ error: "Memo not found" }, 404);

    const result = await db
      .update(memos)
      .set({
        title: body.title,
        content: body.content,
        updatedAt: new Date().toISOString(), // Update timestamp
      })
      .where(eq(memos.id, id))
      .returning()
      .get();

    // TODO: Handle tags (later step)

    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to update memo" }, 500);
  }
});

// 5. DELETE /api/memos/:id (削除)
app.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const result = await db
      .delete(memos)
      .where(eq(memos.id, id))
      .returning()
      .get();
    if (!result) return c.json({ error: "Memo not found" }, 404);
    return c.json({ message: "Deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete memo" }, 500);
  }
});

export default app;
