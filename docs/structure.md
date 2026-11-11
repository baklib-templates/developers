# 结构

范围是 wiki。快速开始放入网址或文件时，会先建知识库，再投影到这个模板的站点。站点页面跟着知识库文章走，不在这里另建一套正文。

本模板没有示例种子。还没有知识库内容时，不能靠「先用示例体验」看到成品站。

## 首页

三套首页的子页面都用 `page`。

| 文件 | 布局 | 看见的东西 |
| --- | --- | --- |
| `templates/index.book.liquid` | book | 书式目录：章节前缀、层级和页码 |
| `templates/index.documentation.liquid` | documentation | 头图、标语、精选卡片 |
| `templates/index.portal.liquid` | portal | 头图、栏目卡片（每张带若干子页）、热门页 |

## 正文、栏目壳、API 规格

导入正文是 `templates/page.liquid`。`title`、`content` 只读，来自知识库。标签、摘要、侧栏图标写在页面上。子页面用 `page`。

栏目壳是 `templates/page.channel.liquid`。`title`、`content` 同样只读，页面列出子页。子页面仍用 `page`。

API 规格是 `templates/page.api.liquid`。内容是 `api_document` 或 `api_document_url`，`title` 可写。这不是知识库导入的正文。它的子页面仍用 `page`。

## 提问入口

AI 作答在 `templates/search.liquid` 右侧（`snippets/_support_ai_search.liquid`）。首页和文章没有独立 AI 侧栏。提问入口是 `-/search`。`templates/tag.liquid` 是标签浏览。`templates/feedback_*` 是页面反馈的响应，不是内容模板。这三处都没有设置项。
