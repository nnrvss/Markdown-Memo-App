import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import memosApp from "./routes/memos";

const app = new Hono();

// CORS Middleware
app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// RPC Routes
const routes = app.route("/api/memos", memosApp);

// Export type for RPC Client
export type AppType = typeof routes;

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
