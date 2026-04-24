# imyan.ren

个站主站，负责个人主页、关于页、友链页和评论入口。

## 技术栈

- SvelteKit 2 + Svelte 5
- UnoCSS
- mdsvex
- `@yanren/common` 公共组件
- `@yanren/i18n` 国际化逻辑
- `@sveltejs/adapter-static` 静态部署

## 本地开发

推荐从仓库根目录运行：

```bash
pnpm dev:imyan.ren
```

也可以在当前目录运行：

```bash
pnpm dev
```

启动前会执行 `sort-link-json.cjs`，按拼音排序友链数据。

## 常用命令

```bash
pnpm dev
pnpm check
pnpm build
pnpm serve
```

从仓库根目录对应命令：

```bash
pnpm check:imyan.ren
pnpm build:imyan.ren
pnpm serve:imyan.ren
```

## 内容位置

- 首页：`src/routes/(home)`
- 关于页：`src/routes/about`
- 友链页：`src/routes/friend`
- 友链数据：`static/link.json`
- 多语言文案：`src/lib/i18n/locale`

## 部署

使用 `@sveltejs/adapter-static` 输出静态文件。

Cloudflare Pages 参考配置：

- Build command: `pnpm build:imyan.ren`
- Output directory: `website/imyan.ren/build`
- Root directory: 仓库根目录
