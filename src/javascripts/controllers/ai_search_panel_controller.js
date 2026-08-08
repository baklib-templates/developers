import { Controller } from "@hotwired/stimulus"
import { initLucideIcons } from "../lucide_init"

const STORAGE_KEY = "developers-ai-search-panel"

/**
 * Search-page AI chat chrome: widen/narrow relative to main column, collapse to FAB.
 * Layout classes are toggled on the nearest `.help-layout-with-aside` ancestor.
 */
export default class extends Controller {
  static targets = ["dialog", "fab", "widenIcon", "narrowIcon", "widthButton"]
  static values = {
    wide: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false }
  }

  connect() {
    this.#restoreState()
    this.#applyState()
  }

  toggleWidth(event) {
    event?.preventDefault()
    if (this.collapsedValue) return
    this.wideValue = !this.wideValue
    this.#applyState()
    this.#persistState()
  }

  collapse(event) {
    event?.preventDefault()
    this.collapsedValue = true
    this.#applyState()
    this.#persistState()
  }

  expand(event) {
    event?.preventDefault()
    this.collapsedValue = false
    this.#applyState()
    this.#persistState()
    initLucideIcons()
  }

  get layout() {
    return this.element.closest(".help-layout-with-aside")
  }

  #restoreState() {
    try {
      const raw = window.sessionStorage?.getItem(STORAGE_KEY)
      if (!raw) return
      const state = JSON.parse(raw)
      if (typeof state.wide === "boolean") this.wideValue = state.wide
      if (typeof state.collapsed === "boolean") this.collapsedValue = state.collapsed
    } catch (_) {
      /* ignore */
    }
  }

  #persistState() {
    try {
      window.sessionStorage?.setItem(
        STORAGE_KEY,
        JSON.stringify({ wide: this.wideValue, collapsed: this.collapsedValue })
      )
    } catch (_) {
      /* ignore */
    }
  }

  #applyState() {
    const layout = this.layout
    if (layout) {
      layout.classList.toggle("is-ai-wide", this.wideValue && !this.collapsedValue)
      layout.classList.toggle("is-ai-collapsed", this.collapsedValue)
    }

    if (this.hasDialogTarget) {
      this.dialogTarget.classList.toggle("hidden", this.collapsedValue)
    }
    if (this.hasFabTarget) {
      this.fabTarget.classList.toggle("hidden", !this.collapsedValue)
    }

    this.#syncWidthIcons()
  }

  #syncWidthIcons() {
    if (this.hasWidenIconTarget) {
      this.widenIconTarget.classList.toggle("hidden", this.wideValue)
    }
    if (this.hasNarrowIconTarget) {
      this.narrowIconTarget.classList.toggle("hidden", !this.wideValue)
    }
    if (this.hasWidthButtonTarget) {
      const label = this.wideValue
        ? this.widthButtonTarget.dataset.aiSearchPanelNarrowLabelParam
        : this.widthButtonTarget.dataset.aiSearchPanelWidenLabelParam
      if (label) {
        this.widthButtonTarget.setAttribute("aria-label", label)
        this.widthButtonTarget.setAttribute("title", label)
      }
    }
  }
}
