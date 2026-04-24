# pay.imyan.ren

个人支付/赞助页面，展示支付方式并根据设备环境提供适配体验。

## 技术栈

- SvelteKit 2 + Svelte 5
- UnoCSS
- Less
- `qrcode`
- `ua-parser-js`
- `@yanren/common` 公共组件
- `@yanren/i18n` 国际化逻辑
- `@sveltejs/adapter-static` 静态部署

## 本地开发

推荐从仓库根目录运行：

```bash
pnpm dev:pay.imyan.ren
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
pnpm check:pay.imyan.ren
pnpm build:pay.imyan.ren
pnpm serve:pay.imyan.ren
```

## 内容位置

- 页面入口：`src/routes/+page.svelte`
- 支付组件：`src/lib/components/Payments.svelte`
- 多语言文案：`src/lib/i18n`

## 部署

使用 `@sveltejs/adapter-static` 输出静态文件。

Cloudflare Pages 参考配置：

- Build command: `pnpm build:pay.imyan.ren`
- Output directory: `website/pay.imyan.ren/build`
- Root directory: 仓库根目录
