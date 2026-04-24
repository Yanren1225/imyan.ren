# r2.imyan.ren

Cloudflare R2 文件管理站，支持列出、上传和删除 R2 Bucket 中的文件。

## 技术栈

- SvelteKit 2 + Svelte 5
- UnoCSS
- Auth.js SvelteKit
- `@yanren/auth` 公共认证封装
- `aws4fetch` 请求 R2 S3 API
- `fast-xml-parser` 解析 ListObjectsV2 XML 响应
- `@sveltejs/adapter-cloudflare`

## 本地开发

先准备环境变量：

```bash
cp .env.example .env
```

推荐从仓库根目录运行：

```bash
pnpm dev:r2.imyan.ren
```

也可以在当前目录运行：

```bash
pnpm dev
```

## 常用命令

```bash
pnpm dev
pnpm check
pnpm build
pnpm serve
```

从仓库根目录对应命令：

```bash
pnpm check:r2.imyan.ren
pnpm build:r2.imyan.ren
pnpm serve:r2.imyan.ren
```

## 环境变量

见 `.env.example`。

R2 必需变量：

- `R2_ACCOUNT_ID`: Cloudflare Account ID
- `R2_ACCESS_KEY_ID`: R2 API access key
- `R2_SECRET_ACCESS_KEY`: R2 API secret key
- `R2_BUCKET_NAME`: Bucket 名称

认证必需变量：

- `AUTH_SECRET`: 必须和 `auth.imyan.ren` 一致

常用可选变量：

- `COOKIE_DOMAIN`: 共享 Cookie 域名，生产环境通常为 `.imyan.ren`
- `PUBLIC_ASSETS_DOMAIN`: 公开资源域名，例如 `assets.imyan.ren`

## 行为说明

- 页面入口：`src/routes/+page.svelte`
- 服务端 actions：`src/routes/+page.server.ts`
- R2 客户端：`src/lib/server/r2.ts`
- 认证 Hook：`src/hooks.server.ts`
- 文件 key 使用 `年/月/sha256.ext` 格式
- 上传限制：最大 50MB，拒绝空文件，阻止常见脚本/可执行文件类型

## 部署

使用 `@sveltejs/adapter-cloudflare` 部署到 Cloudflare Pages/Workers。

Cloudflare Pages 参考配置：

- Build command: `pnpm build:r2.imyan.ren`
- Root directory: 仓库根目录
- 环境变量：按 `.env.example` 配置

生产环境中，`AUTH_SECRET` 和 `COOKIE_DOMAIN` 需要与认证站配置一致，否则共享登录态不会生效。
