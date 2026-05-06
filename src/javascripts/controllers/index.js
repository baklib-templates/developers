import { Application } from "@hotwired/stimulus"
import TocController from "./toc_controller"
import MenuController from "./menu_controller"
import ImagesViewerController from "./images_viewer_controller"
import Clipboard from './clipboard_controller'
import TurboNavTreeController from "./turbo_nav_tree_controller"

import NavtreeController from "./navtree_controller"
// import ThemeController from "./theme_controller"
// import Dropdown from 'stimulus-dropdown'
import Daisyui from "daisyui"
import ElementDoc from "./element_doc_controller"

if (!window.Stimulus) {
  window.Stimulus = Application.start()
}
const application = window.Stimulus

application.register('toc', TocController)
application.register('menu', MenuController)
application.register('images-viewer', ImagesViewerController)
application.register('clipboard', Clipboard)
application.register('navtree', NavtreeController)
application.register('turbo-nav-tree', TurboNavTreeController)
// application.register('theme', ThemeController)
// application.register('dropdown', Dropdown)
application.register('daisyui', Daisyui)
application.register('element-doc', ElementDoc)
