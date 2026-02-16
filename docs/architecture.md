# 実装アーキテクチャ・設計メモ

## 1. ディレクトリ構成と役割

- **backend/**: Hono + Drizzle ORM + SQLite
- **frontend/**: React + Vite + TailwindCSS
- **docker-compose.yml**: 全体の起動管理

## 2. データベース設計 (SQLite)

- `memos`: メモの本体 (id, title, content, dates)
- `tags`: タグ情報 (id, name)
- `memo_tags`: 中間テーブル

## 3. 技術的決定事項と解決策ログ

### 2026-02-16: Drizzle Studioの起動問題

- **課題**: `db-studio` コンテナが `drizzle-orm` を見つけられず起動失敗。
- **解決策**: 独立イメージではなく `build: ./backend` を使用し、バックエンドと同じ環境で起動するように `docker-compose.yml` を修正。

### 2026-02-16: Hono RPCの型共有 (予定)

- **課題**: Monorepo構成において、FrontendからBackendの型 (`AppType`) をどう参照するか。
- **方針**: `tsconfig.json` の `paths` 設定を利用して、ファイルシステム上のバックエンドコードを直接参照させる簡易的な方法を採用予定。

## 4. 環境構築コマンド

```bash
# 初回起動
docker-compose up --build

# DBマイグレーション (手動実行が必要な場合)
docker-compose exec backend npx tsx src/db/migrate.ts

# DB管理画面 (Drizzle Studio)
https://local.drizzle.studio/?host=localhost&port=4983
```
