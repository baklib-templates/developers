# Wiki Developers (`developers`)

English | [简体中文](README.zh-CN.md)

This is a developer documentation site on the wiki scope. Use it for API reference, integration manuals, and technical guides. Do not use it for end-user help centers or a chat-first home.

Read `docs/` in this order. The rest of this file is positioning and build notes, not the content model. The docs are in Chinese.

| File | Read it to learn |
| --- | --- |
| [docs/README.md](docs/README.md) | Index of the docs |
| [docs/overview.md](docs/overview.md) | What it is, and when to use it |
| [docs/structure.md](docs/structure.md) | Home variants and how pages relate |
| [docs/schema.md](docs/schema.md) | Field ids, and which ones are writable |
| [docs/usage.md](docs/usage.md) | How to set the site up |
| [docs/activation.yml](docs/activation.yml) | Get-started arrangement recipe |

## 定位

- **docs**：产品用户 / 深树导航 / 全站 AI 侧栏
- **help**：终端客户 / FAQ / 客服自助
- **developers**（本主题）：开发者 / API-first / 搜索即到达 / LLM 工具

## 开发

```bash
npm install
npm run dev
```

构建生产资源：

```bash
npm run build
```

## 目录结构

| 路径 | 说明 |
|------|------|
| `templates/` | 页面模板（Portal 首页、Reference 首页、`page` / `page.api` 等） |
| `snippets/` | 可复用片段（`_site_header`、`_hero`、页面工具下拉等） |
| `layout/` | `theme` / `page_layout` / `api_doc` 三套布局 |
| `presets/` | `header_menu_html`、`footer_menu_html` 默认 HTML |
| `statics/` | 静态页（`about`、`brand`） |
| `locales/` | 前台与 schema 多语言 |

## 文档

- 主题说明：<https://help.baklib.cn/themes/developers>
- 公开仓库：<https://gitlab.com/baklib/themes/developers>
