import { Controller } from "@hotwired/stimulus"

/**
 * Keeps search-list turbo-frame updates from disturbing the AI chat panel.
 * - Shows/hides the AI panel from results meta inside the frame
 * - Only re-triggers AI auto-submit when keywords change (new search), not on pagination
 */
export default class extends Controller {
  static targets = ["resultsMeta"]
  static values = {
    lastKeywords: { type: String, default: "" }
  }

  connect() {
    this.#syncFromMeta({ initial: true })
  }

  frameLoaded() {
    this.#syncFromMeta({ initial: false })
  }

  #syncFromMeta({ initial }) {
    if (!this.hasResultsMetaTarget) return

    const meta = this.resultsMetaTarget
    const keywords = (meta.dataset.keywords || "").trim()
    const hasResults = meta.dataset.hasResults === "true"
    const container = document.getElementById("js--ai-search-container")
    const aiSearch = document.getElementById("js--ai-search")
    if (!container) return

    if (!hasResults) {
      container.classList.add("hidden")
      return
    }

    container.classList.remove("hidden")

    const keywordsChanged = keywords !== this.lastKeywordsValue
    if (aiSearch && keywords && (initial || keywordsChanged)) {
      this.lastKeywordsValue = keywords
      aiSearch.dataset.aiSearchMessageValue = keywords
    }
  }
}
