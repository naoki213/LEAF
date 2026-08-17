# LEAF

ホームページ制作サービス「LEAF」のサイトです。静的HTML + Jekyll（GitHub Pages標準のビルド）で構成されています。

## 構成

- トップページ・料金プラン・制作実例・よくある質問・お問い合わせ：`index.html` / `pricing.html` / `works.html` / `faq.html` / `contact.html`（従来通りの静的HTML）
- お知らせ・SEOコラム記事：`_news/`（コラム記事、1記事＝1ファイル、公開ページあり）と `_notices/`（短いお知らせ、`news.html`の一覧にのみ表示・専用ページなし）の2つのJekyllコレクションで管理
- 記事ページの共通デザイン：`_layouts/news-article.html`
- `news.html` とトップページの案内バーは、上記コレクションから自動で最新記事一覧・最新のお知らせを表示します（Liquidテンプレートで自動生成、手動更新不要）

## 記事・お知らせを増やすには

### 方法1: 管理画面（CMS）から追加する（推奨）

`/admin/` にアクセスすると、ブラウザ上のフォームから記事・お知らせを追加・編集できます（Sveltia CMS を使用）。ただし、利用開始前に以下の一度きりのセットアップが必要です。

1. **GitHub OAuth Appを作成する**
   - https://github.com/settings/developers → 「New OAuth App」
   - Homepage URL: `https://naoki213.github.io/LEAF/`
   - Authorization callback URL: 後述のCloudflare WorkerのURLに `/callback` を付けたもの（例: `https://leaf-cms-auth.your-name.workers.dev/callback`）
   - 作成後に発行される **Client ID** と **Client Secret** を控える

2. **認証用の無料プロキシ（Cloudflare Worker）をデプロイする**
   - Cloudflareの無料アカウントを作成（https://dash.cloudflare.com/ ）
   - 参考実装: https://github.com/sveltia/sveltia-cms-auth をCloudflare Workersにデプロイ
   - Workerの環境変数（Secrets）に、手順1で発行された `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` を設定
   - デプロイ後に発行されるWorkerのURL（例: `https://leaf-cms-auth.your-name.workers.dev`）を控える

3. **`admin/config.yml` の `base_url` を書き換える**
   - `base_url: https://REPLACE-WITH-YOUR-OAUTH-WORKER.workers.dev` の部分を、手順2で控えたWorkerのURLに書き換えてコミット・プッシュする

設定が完了すると、`/admin/` からGitHubアカウントでログインし、記事の作成・編集・公開ができるようになります（保存すると自動的にこのリポジトリにコミットされ、GitHub Pagesが再デプロイされます）。

### 方法2: ファイルを直接追加する

`_news/YYYY-MM-DD-slug.md`（コラム記事）または `_notices/YYYY-MM-DD-slug.md`（短いお知らせ）に、既存ファイルと同じ形式でMarkdownファイルを追加してください。フィールドの意味は `admin/config.yml` のラベルを参照してください。

## ローカルでのビルド確認

```
gem install jekyll
jekyll build
jekyll serve # http://localhost:4000 でプレビュー
```
