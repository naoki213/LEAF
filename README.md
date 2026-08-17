# LEAF

ホームページ制作サービス「LEAF」のサイトです。静的HTML + Jekyll（GitHub Pages標準のビルド）で構成されています。

## 構成

- トップページ・料金プラン・制作実例・よくある質問・お問い合わせ：`index.html` / `pricing.html` / `works.html` / `faq.html` / `contact.html`（従来通りの静的HTML）
- お知らせ・SEOコラム記事：`_news/`（コラム記事、1記事＝1ファイル、公開ページあり）と `_notices/`（短いお知らせ、`news.html`の一覧にのみ表示・専用ページなし）の2つのJekyllコレクションで管理
- 記事ページの共通デザイン：`_layouts/news-article.html`
- `news.html` とトップページの案内バーは、上記コレクションから自動で最新記事一覧・最新のお知らせを表示します（Liquidテンプレートで自動生成、手動更新不要）

## 記事・お知らせを増やすには

### 方法1: 管理画面（CMS）から追加する（推奨）

`/admin/` にアクセスすると、ブラウザ上のフォームから記事・お知らせを追加・編集できます（Sveltia CMS を使用）。認証用プロキシ（Cloudflare Worker: `leaf-cms-auth`）とGitHub OAuth Appのセットアップは完了済みです。`/admin/` からGitHubアカウントでログインし、記事の作成・編集・公開ができます（保存すると自動的にこのリポジトリにコミットされ、GitHub Pagesが再デプロイされます）。

セットアップをやり直す・別の環境に移す場合は以下の手順です。

1. **GitHub OAuth Appを作成する**（https://github.com/settings/developers → 「New OAuth App」）。Authorization callback URLはCloudflare WorkerのURLに `/callback` を付けたもの。
2. **https://github.com/sveltia/sveltia-cms-auth をCloudflare Workersにデプロイ**し、環境変数（Secrets）に `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` を設定する。
3. **`admin/config.yml` の `base_url`** を、デプロイしたWorkerのURLに書き換える。

### 方法2: ファイルを直接追加する

`_news/YYYY-MM-DD-slug.md`（コラム記事）または `_notices/YYYY-MM-DD-slug.md`（短いお知らせ）に、既存ファイルと同じ形式でMarkdownファイルを追加してください。フィールドの意味は `admin/config.yml` のラベルを参照してください。

## ローカルでのビルド確認

```
gem install jekyll
jekyll build
jekyll serve # http://localhost:4000 でプレビュー
```
