# note.imyan.ren

个人笔记站，读取本地 Markdown 文件生成文章列表、分类页和文章详情页。

## 技术栈

- SvelteKit 2 + Svelte 5
- UnoCSS
- `gray-matter` 解析 frontmatter
- `marked` 渲染 Markdown
- `@yanren/common` 公共组件
- `@yanren/i18n` 国际化逻辑
- `@sveltejs/adapter-static` 静态部署

## 本地开发

推荐从仓库根目录运行：

```bash
pnpm dev:note.imyan.ren
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
pnpm check:note.imyan.ren
pnpm build:note.imyan.ren
pnpm serve:note.imyan.ren
```

## 文章格式

文章放在 `posts/*.md`，文件名会作为 slug。

示例：

```md
---
title: Hello World
date: 2026-01-01
category: Tech
tags:
  - SvelteKit
excerpt: 摘要内容
hidden: false
---

正文内容
```

## 内容位置

- 文章目录：`posts`
- 文章读取逻辑：`src/lib/server/posts.ts`
- 首页：`src/routes/+page.svelte`
- 分类页：`src/routes/category`
- 文章页：`src/routes/post/[slug]`

## 部署

使用 `@sveltejs/adapter-static` 输出静态文件。

Cloudflare Pages 参考配置：

- Build command: `pnpm build:note.imyan.ren`
- Output directory: `website/note.imyan.ren/build`
- Root directory: 仓库根目录
