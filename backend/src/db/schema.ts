import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const memos = sqliteTable("memos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const memoTags = sqliteTable(
  "memo_tags",
  {
    memoId: integer("memo_id").references(() => memos.id),
    tagId: integer("tag_id").references(() => tags.id),
  },
  (t) => ({
    pk: { columns: [t.memoId, t.tagId] },
  }),
);
