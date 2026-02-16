# **マークダウン・メモアプリ開発 技術仕様書**

## **1\. プロジェクト概要**

### **1.1 プロジェクト名**

Markdown Memo App (仮)

### **1.2 目的**

- モダンWeb開発（Full Stack TypeScript）の基礎学習
- SPA (Single Page Application) のアーキテクチャ理解
- フロントエンド・バックエンド間の型安全な通信 (RPC) の実践
- Dockerを用いたコンテナベースの開発フローの習得

### **1.3 アプリケーション概要**

マークダウン形式で記述可能なメモ帳アプリ。タグによる管理機能を持ち、リアルタイムプレビューが可能。

## **2\. 技術スタック**

| カテゴリ            | 技術・ツール                    | 選定理由・備考                                   |
| :------------------ | :------------------------------ | :----------------------------------------------- |
| **Frontend**        | **React** (v18+)                | コンポーネント指向UI構築のデファクトスタンダード |
|                     | **TypeScript**                  | 型安全性による開発効率と保守性の向上             |
|                     | **Vite**                        | 高速なビルドツール・開発サーバー                 |
|                     | **Tailwind CSS**                | ユーティリティファーストなCSSフレームワーク      |
|                     | **shadcn/ui**                   | モダンでカスタマイズ容易なUIコンポーネント集     |
|                     | **react-markdown**              | マークダウンのレンダリング用ライブラリ           |
| **Backend**         | **Node.js**                     | サーバーサイドランタイム                         |
|                     | **Hono**                        | 超軽量・高速なWebフレームワーク。RPC機能を活用   |
|                     | **TypeScript**                  | フロントエンドと型定義を共有                     |
| **Database**        | **SQLite**                      | サーバーレスで軽量なファイルベースRDB            |
| **ORM**             | **Drizzle ORM**                 | TypeScript製の軽量ORM。SQLライクな操作感         |
| **Infrastructure**  | **Docker** / **Docker Compose** | 開発環境のコンテナ化・統一                       |
| **Version Control** | **GitHub**                      | ソースコード管理                                 |

## **3\. システムアーキテクチャ**

### **3.1 全体構成 (Monorepo)**

フロントエンドとバックエンドを単一のリポジトリで管理し、型定義の共有を容易にする。

graph LR  
 User\[ユーザー\] \--\> Browser\[ブラウザ (React)\]  
 Browser \-- JSON (Hono RPC) \--\> Server\[バックエンド (Hono)\]  
 Server \-- SQL \--\> DB\[(SQLite Database)\]

### **3.2 ディレクトリ構成案**

markdown-memo-app/  
├── docker-compose.yml \# 全体の起動設定  
├── .gitignore  
├── README.md  
├── backend/ \# バックエンド (Hono)  
│ ├── src/  
│ │ ├── index.ts \# エントリーポイント  
│ │ ├── db/ \# Drizzle設定・スキーマ定義  
│ │ │ ├── schema.ts  
│ │ │ └── connect.ts  
│ │ └── routes/ \# APIルート定義 (RPC用)  
│ ├── package.json  
│ ├── tsconfig.json  
│ └── Dockerfile  
└── frontend/ \# フロントエンド (React)  
 ├── src/  
 │ ├── client.ts \# Hono RPCクライアント設定  
 │ ├── components/ \# UIコンポーネント  
 │ ├── App.tsx  
 │ └── main.tsx  
 ├── package.json  
 ├── tsconfig.json  
 ├── vite.config.ts  
 └── Dockerfile

## **4\. データベース設計 (Schema)**

### **4.1 ER図 (概念)**

- **memos**: メモ本体
- **tags**: タグ情報
- **memo_tags**: メモとタグの多対多リレーション

### **4.2 テーブル定義 (Drizzle Schema イメージ)**

#### **memos テーブル**

| カラム名   | データ型 | 制約                       | 説明             |
| :--------- | :------- | :------------------------- | :--------------- |
| id         | Integer  | PK, Auto Increment         | メモID           |
| title      | Text     | Not Null                   | タイトル         |
| content    | Text     | Not Null                   | 本文（Markdown） |
| created_at | Text     | Default: Current Timestamp | 作成日時         |
| updated_at | Text     | Default: Current Timestamp | 更新日時         |

#### **tags テーブル**

| カラム名 | データ型 | 制約               | 説明                         |
| :------- | :------- | :----------------- | :--------------------------- |
| id       | Integer  | PK, Auto Increment | タグID                       |
| name     | Text     | Not Null, Unique   | タグ名（例: "idea", "work"） |

#### **memo_tags テーブル (中間テーブル)**

| カラム名 | データ型 | 制約              | 説明       |
| :------- | :------- | :---------------- | :--------- |
| memo_id  | Integer  | FK (memos.id)     | メモID     |
| tag_id   | Integer  | FK (tags.id)      | タグID     |
| **PK**   |          | (memo_id, tag_id) | 複合主キー |

## **5\. 機能要件**

### **5.1 メモ管理機能 (CRUD)**

- **一覧表示 (Read):** 作成日順または更新日順でメモのリストを表示。
- **詳細表示 (Read):** 選択したメモの内容を表示。マークダウンをHTMLに変換してプレビュー。
- **新規作成 (Create):** タイトルと本文を入力して新しいメモを作成。
- **編集 (Update):** 既存のメモの内容を修正して保存。
- **削除 (Delete):** 不要なメモを削除（論理削除ではなく物理削除で実装予定）。

### **5.2 タグ機能**

- メモ作成・編集時にタグを追加・削除できる。
- タグによるメモの絞り込み検索機能。

### **5.3 UI/UX要件**

- **レスポンシブデザイン:** PCおよびタブレットでの利用を想定。
- **リアルタイムプレビュー:** 編集画面において、入力と同時にプレビューが更新されること。
- **ローディング表示:** データ取得中に適切なローディングインジケータを表示する。

## **6\. API設計方針 (Hono RPC)**

REST APIのエンドポイントを個別に定義するのではなく、HonoのRPC機能を使用し、バックエンドの型定義をフロントエンドで直接利用する。

- **Route:** /api
  - .memos
    - .get (一覧取得)
    - .post (新規作成)
    - .:id
      - .get (詳細取得)
      - .put (更新)
      - .delete (削除)
