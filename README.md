# Yanren Website Monorepo

这个 Monorepo 管理着我的网站源代码，使用 **SvelteKit**、**UnoCSS** 和 **TypeScript** 构建。对应 package 下的文件夹名就是网站的域名。

## 📂 项目结构

本项目使用 `pnpm` workspace 管理多个包：

### 🌐 网站项目 (`website/*`)

- **[imyan.ren](./website/imyan.ren)**: 个站主站
- **[pay.imyan.ren](./website/pay.imyan.ren)**: 支付
- **[note.imyan.ren](./website/note.imyan.ren)**: 笔记

### 📦 共享包 (`shared/*`)

- **[@yanren/common](./shared/common)**: 公共 UI 组件
- **[@yanren/config](./shared/config)**: 公共配置
- **[@yanren/i18n](./shared/i18n)**: 公共国际化逻辑与类型

## 🛠️ 开发指南

### 环境要求

- [Node.js](https://nodejs.org/) (推荐最新 LTS 版本)
- [pnpm](https://pnpm.io/) (包管理器)

### 快速开始

1. **安装依赖**:

    ```bash
    pnpm install
    ```

2. **启动开发服务器**:

    ```bash
    # 启动主站
    pnpm dev:imyan.ren

    # 启动支付页
    pnpm dev:pay.imyan.ren

    # 启动笔记页
    pnpm dev:note.imyan.ren
    ```

## 📜 可用脚本

请在根目录下运行这些命令：

| 命令                        | 说明                                     |
| :-------------------------- | :--------------------------------------- |
| `pnpm dev:imyan.ren`        | 启动 `imyan.ren` 开发服务器              |
| `pnpm dev:pay.imyan.ren`    | 启动 `pay.imyan.ren` 开发服务器          |
| `pnpm dev:note.imyan.ren`   | 启动 `note.imyan.ren` 开发服务器         |
| `pnpm build:imyan.ren`      | 构建 `imyan.ren` 生产版本                |
| `pnpm build:pay.imyan.ren`  | 构建 `pay.imyan.ren` 生产版本            |
| `pnpm build:note.imyan.ren` | 构建 `note.imyan.ren` 生产版本           |
| `pnpm check`                | 对整个 Monorepo 进行 TypeScript 类型检查 |
| `pnpm clean:all`            | 清理所有 `node_modules` 和构建产物       |

## 🚀 部署

所有项目均配置为使用 `@sveltejs/adapter-static` 进行静态托管 (例如 Cloudflare Pages)。

**Cloudflare Pages 参考配置:**

- **imyan.ren**:
  - 构建命令 (Build command): `pnpm build:imyan.ren`
  - 输出目录 (Output directory): `website/imyan.ren/build`
- **pay.imyan.ren**:
  - 构建命令 (Build command): `pnpm build:pay.imyan.ren`
  - 输出目录 (Output directory): `website/pay.imyan.ren/build`
- **note.imyan.ren**:
  - 构建命令 (Build command): `pnpm build:note.imyan.ren`
  - 输出目录 (Output directory): `website/note.imyan.ren/build`

> **注意**: 请将 Cloudflare Pages 的 **根目录 (Root Directory)** 设置为 `/` (留空)，以确保能正确处理 Monorepo 结构。
