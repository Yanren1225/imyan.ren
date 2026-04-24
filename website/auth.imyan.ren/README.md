# auth.imyan.ren

统一认证站，负责 GitHub/Google 登录，并为同域下其他服务提供共享会话 Cookie。

## 技术栈

- SvelteKit 2 + Svelte 5
- Auth.js SvelteKit
- UnoCSS
- `@yanren/auth` 公共认证封装
- `@sveltejs/adapter-cloudflare`

## 本地开发

先准备环境变量：

```bash
cp .env.example .env
```

推荐从仓库根目录运行：

```bash
pnpm dev:auth.imyan.ren
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
pnpm check:auth.imyan.ren
pnpm build:auth.imyan.ren
pnpm serve:auth.imyan.ren
```

## 环境变量

见 `.env.example`。

必需变量：

- `AUTH_SECRET`: Auth.js secret，生产环境必须固定且足够随机
- `GITHUB_ID`: GitHub OAuth Client ID
- `GITHUB_SECRET`: GitHub OAuth Client Secret
- `GOOGLE_ID`: Google OAuth Client ID
- `GOOGLE_SECRET`: Google OAuth Client Secret

可选变量：

- `ALLOWED_EMAILS`: 允许登录的邮箱列表，逗号分隔；为空则不限制邮箱
- `COOKIE_DOMAIN`: 共享 Cookie 域名，生产环境通常为 `.imyan.ren`

## 行为说明

- 登录页：`src/routes/+page.svelte`
- 认证配置：`src/auth.ts`
- Hook 入口：`src/hooks.server.ts`
- 只允许跳转到相对路径、同源 URL 或 `COOKIE_DOMAIN` 下的根域/子域
- 会话 Cookie 名由 `@yanren/auth` 统一设置为 `yanren.session-token`

## 部署

使用 `@sveltejs/adapter-cloudflare` 部署到 Cloudflare Pages/Workers。

Cloudflare Pages 参考配置：

- Build command: `pnpm build:auth.imyan.ren`
- Root directory: 仓库根目录
- 环境变量：按 `.env.example` 配置

生产环境中，`AUTH_SECRET` 必须和依赖共享登录态的站点保持一致。
