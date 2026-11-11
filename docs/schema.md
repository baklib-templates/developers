# 字段

以设置项的 `id` 为准。界面上的中文来自语言包，改文案不会改字段名。

## 全站

| id | 类型 | 作用 |
| --- | --- | --- |
| `logo_url` | 图片 | 站点 Logo |
| `left_sidebar_width` | 范围 | 左侧栏宽度 |
| `nav_tree_expand_by_default` | 开关 | 侧栏导航默认展开 |
| `enable_ai_chat_search` | 开关 | 打开搜索页 AI |
| `ai_search_completed_text` | 文本 | AI 回答结束语 |
| `hot_tags` | 多行文本 | 热门搜索词 |
| `is_allow_published_at` | 开关 | 文章显示发布日期 |
| `is_allow_author` | 开关 | 文章显示作者 |
| `show_page_tools_dropdown` | 开关 | 显示 Copy 工具菜单 |
| `show_page_illustration` | 开关 | 显示页顶背景图 |
| `page_top_illustration` | 图片 | 页顶背景图 |
| `header_menu_html` | HTML | 顶栏插入 |
| `footer_menu_html` | HTML | 页脚插入 |
| `features_one` | HTML | 侧栏附加内容 |
| `head_html` | HTML | 写入 `<head>` |
| `lucide_icons` | 多行文本 | 可用的 Lucide 图标名 |
| `weixin_app_id` / `weixin_app_secret` / `weixin_enabled` / `weixin_debug` | 文本或开关 | 微信分享 |

## 首页 `index.book`

子页面用 `page`。

| id | 类型 | 作用 |
| --- | --- | --- |
| `toc_title` | 文本 | 目录页标题 |
| `toc_max_depth` | 数字 | 目录最大层级 |
| `show_chapter_prefix` | 开关 | 一级条目显示章节前缀 |
| `chapter_prefix` | 文本 | 章节前缀文案 |
| `show_page_numbers` | 开关 | 显示页码 |

## 首页 `index.documentation`

子页面用 `page`。

| id | 类型 | 作用 |
| --- | --- | --- |
| `hero_image_url` | 图片 | 头图 |
| `hero_font_color` | 颜色 | 头图文字颜色 |
| `hero_slogan` | 文本 | 标语标题 |
| `hero_description` | 文本 | 标语描述 |
| `featured_section_title` | 文本 | 精选卡片区标题 |
| `featured_count` | 数字 | 精选卡片数量 |

## 首页 `index.portal`

子页面用 `page`。

| id | 类型 | 作用 |
| --- | --- | --- |
| `hero_image_url` | 图片 | 头图 |
| `hero_font_color` | 颜色 | 头图文字颜色 |
| `hero_slogan` | 文本 | 标语标题 |
| `hero_description` | 文本 | 标语描述 |
| `index_card_page_count` | 数字 | 每张栏目卡片列出的子页条数 |

## 正文页 `page`

子页面也用 `page`。导入的是知识库正文。

| id | 类型 | 能否改 | 作用 |
| --- | --- | --- | --- |
| `tags` | 标签 | 可写 | 页面标签 |
| `nav_lucide_icon` | 选择 | 可写 | 侧栏分组图标 |
| `description` | 多行文本 | 可写 | 摘要 |
| `title` | 文本 | 只读 | 来自知识库文章标题 |
| `content` | 富文本 | 只读 | 来自知识库正文 |

## 栏目壳 `page.channel`

子页面用 `page`。`title`、`content` 只读，来自知识库。

| id | 类型 | 能否改 | 作用 |
| --- | --- | --- | --- |
| `nav_lucide_icon` | 选择 | 可写 | 侧栏分组图标 |
| `title` | 文本 | 只读 | 来自知识库标题 |
| `content` | 富文本 | 只读 | 来自知识库正文 |

## API 规格 `page.api`

子页面用 `page`。这一页不是导入正文。

| id | 类型 | 能否改 | 作用 |
| --- | --- | --- | --- |
| `title` | 文本 | 可写 | 规格页标题 |
| `nav_lucide_icon` | 选择 | 可写 | 侧栏分组图标 |
| `api_document` | 多行文本 | 可写 | OpenAPI 文档 |
| `api_document_url` | 文本 | 可写 | OpenAPI 文档 URL |

`search`、`tag`、`feedback_*` 没有设置项。
