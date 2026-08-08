import { Application } from "@hotwired/stimulus"
import TocController from "./toc_controller"
import ImagesViewerController from "./images_viewer_controller"
import Clipboard from './clipboard_controller'
import TurboNavTreeController from "./turbo_nav_tree_controller"
import NavtreeController from "./navtree_controller"
import ElementDoc from "./element_doc_controller"
import CopyPageController from "./copy_page_controller"
import PageToolsController from "./page_tools_controller"
import ThemeController from "./theme_controller"
import LinkTargetController from "./link_target_controller"
import AiSearchCompletionController from "./ai_search_completion_controller"
import AiSearchPanelController from "./ai_search_panel_controller"
import SearchPageController from "./search_page_controller"

if (!window.Stimulus) {
  window.Stimulus = Application.start()
}
const application = window.Stimulus

application.register('toc', TocController)
application.register('images-viewer', ImagesViewerController)
application.register('clipboard', Clipboard)
application.register('navtree', NavtreeController)
application.register('turbo-nav-tree', TurboNavTreeController)
application.register('theme', ThemeController)
application.register('element-doc', ElementDoc)
application.register("copy-page", CopyPageController)
application.register("page-tools", PageToolsController)
application.register("link-target", LinkTargetController)
application.register("ai-search", AiSearchCompletionController)
application.register("ai-search-panel", AiSearchPanelController)
application.register("search-page", SearchPageController)
