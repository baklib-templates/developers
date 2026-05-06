import { Controller } from "@hotwired/stimulus"
import yaml from "js-yaml"

// <div
//   data-controller="element-doc"
//   data-element-doc-url-value="/api_docs/openapi.json"
// >
//   <div data-element-doc-target="loading" class="text-gray-500">加载中...</div>
// </div>

export default class extends Controller {
  static targets = ["loading"]
  static values = {
    content: String, // JSON 字符串
    url: String      // 远程 URL
  }

  initialize() {
  }

  connect() {
    this.loadElementsApi()
  }

  disconnect() {
  }

  async loadElementsApi() {
    console.log('loadElementsApi')
    const specJson = await this.fetchSpec()

    if (!specJson) return

    // 创建 <elements-api> 元素
    const el = document.createElement("elements-api")
    el.setAttribute("router", "hash")
    el.setAttribute("hideTryIt", "true")
    el.setAttribute("layout", "responsive")
    el.setAttribute("useShadowDom", "true")
    el.style.display = "none"

    // 挂载 JSON 内容
    el.apiDescriptionDocument = JSON.stringify(specJson)

    // 监听加载完成
    const observer = new MutationObserver((mutations, obs) => {
      if (el.querySelector(".sl-elements-api")) {
        el.style.display = ""
        this.loadingTarget?.remove()
        obs.disconnect()
      }
    })
    observer.observe(el, { childList: true, subtree: true })
    this.element.appendChild(el)
  }

  async fetchSpec() {
    let content = null

    if (this.urlValue) {
      try {
        const res = await fetch(this.urlValue)
        if (!res.ok) throw new Error(`请求失败：${res.status}`)
        content = await res.text() // ⚠️ 注意，用 text() 而非 json()，方便识别 YAML
      } catch (err) {
        console.error("❌ 无法加载 API 文档 URL:", this.urlValue, err)
        this.showError("无法加载远程文档")
        return null
      }
    } else if (this.contentValue) {
      content = this.contentValue
    }

    if (!content) {
      this.showError("未提供 API 文档数据")
      return null
    }

    // 判断 JSON / YAML
    try {
      if (this.looksLikeJSON(content)) {
        return JSON.parse(content)
      } else {
        return yaml.load(content)
      }
    } catch (err) {
      console.error("❌ 文档解析失败:", err)
      this.showError("API 文档格式无效")
      return null
    }
  }

  looksLikeJSON(str) {
    const first = str.trim()[0]
    return first === '{' || first === '['
  }

  // 错误提示函数
  showError(message) {
    if (this.loadingTarget) {
      this.loadingTarget.textContent = message
      this.loadingTarget.classList.add("text-red-500")
    } else {
      console.error(message)
    }
  }
}
