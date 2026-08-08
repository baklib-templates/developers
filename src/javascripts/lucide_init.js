import { createIcons } from "lucide"
import { lucideIconsBundle } from "./lucide_icons"

const DEFAULT_ATTRS = { "stroke-width": 1.6 }

export function initLucideIcons(root = document) {
  if (typeof document === "undefined") return

  createIcons({
    icons: lucideIconsBundle,
    attrs: DEFAULT_ATTRS,
    nameAttr: "data-lucide",
    root,
    // Must stay false: nav_tree itemTemplate uses Mustache {{icon}} inside <template>.
    // Lucide would otherwise warn that "{{icon}}" is missing from the icons object.
    inTemplates: false,
  })
}

function bindLucideInit() {
  initLucideIcons()

  document.addEventListener("turbo:load", () => initLucideIcons())
  document.addEventListener("turbo:render", () => initLucideIcons())
  document.addEventListener("turbo:frame-render", () => initLucideIcons())
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLucideInit)
  } else {
    bindLucideInit()
  }
}
