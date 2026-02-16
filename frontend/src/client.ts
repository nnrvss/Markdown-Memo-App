import { hc } from "hono/client";
import { AppType } from "../index";

// Hono Clientの設定
// ViteのProxy設定で /api -> http://backend:3000 に転送されるため、
// クライアントのベースURLは '/' でOK。
export const client = hc<AppType>("/");
