# Baklib Developers 主题

面向开发者与技术团队的文档主题：API 参考（OpenAPI）、集成指南、Copy for LLM / MCP 工具链。

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
