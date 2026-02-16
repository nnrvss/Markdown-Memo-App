# プロジェクト進捗管理表

## 全体フェーズ

- [x] Phase 1: 初期の環境構築 (Docker, Hono, React)
- [ ] Phase 2: メモ管理機能のバックエンド実装 (CRUD)
- [ ] Phase 3: フロントエンド実装 (一覧、作成、詳細、編集)
- [ ] Phase 4: タグ機能の実装
- [ ] Phase 5: デザイン調整・ポリッシュ (Tailwind / shadcn)
- [ ] Phase 6: バグ修正・リリース準備

---

## タスク詳細

### Phase 1: 環境構築

- [x] Dockerfile (Frontend/Backend) 作成
- [x] docker-compose.yml 作成
- [x] Hono (Backend) 初期設定
- [x] React (Frontend) 初期設定
- [x] Drizzle ORM / SQLite 設定
- [x] DBマイグレーション実行基盤の整備
- [x] Drizzle Studio (DB管理画面) のセットアップ

### Phase 2: バックエンド実装 (CRUD)

- [x] DBスキーマ定義 (`memos`, `tags`, `memo_tags`)
- [x] APIルート定義 (`src/routes/memos.ts`)
  - [x] GET /api/memos (一覧)
  - [x] GET /api/memos/:id (詳細)
  - [x] POST /api/memos (作成)
  - [x] PUT /api/memos/:id (更新)
  - [x] DELETE /api/memos/:id (削除)
- [ ] バリデーション実装 (zod) -> ※一部実装済みだが動作確認が必要
- [ ] エラーハンドリングの共通化

### Phase 3: フロントエンド実装

- [ ] Hono RPCクライアント設定 (`src/client.ts`)
  - [ ] 型定義の共有設定 (tsconfig pathsなど)
- [ ] メモ一覧画面 (MemoList)
- [ ] メモ作成・編集画面 (MemoEditor)
- [ ] マークダウンプレビュー機能 (react-markdown)
- [ ] 削除機能のUI実装

### Phase 4: タグ機能

- [ ] タグのDB操作ロジック追加 (Backend)
- [ ] タグ管理API実装
- [ ] フロントエンドでのタグ入力UI
- [ ] タグによるフィルタリング機能

### Phase 5: デザイン・UX

- [ ] 全体レイアウト (Layout Component)
- [ ] レスポンシブ対応
- [ ] ローディング状態の表示 (Skeletonなど)
