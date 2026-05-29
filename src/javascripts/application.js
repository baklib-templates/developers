import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import './lucide_init'
import './controllers'

function registerSearchStore(Alpine) {
  Alpine.store('search', {
    open: false,
    openSearch() {
      this.open = true
      document.body.classList.add('overflow-hidden')
      Alpine.nextTick(() => {
        document.getElementById('modal-search')?.focus()
      })
    },
    closeSearch() {
      this.open = false
      document.body.classList.remove('overflow-hidden')
    },
  })
}

// main.js 已打包并启动 Alpine；此处复用同一实例，避免 $store 注册到另一份 Alpine 上
const alpine = window.Alpine || Alpine

registerSearchStore(alpine)

if (!window.Alpine) {
  window.Alpine = Alpine
  Alpine.plugin(collapse)
  Alpine.start()
} else {
  // main.js 在 <head> 中已 start，body 内搜索弹窗需单独挂载
  const searchModalRoot = document.getElementById('site-search-modal-root')
  if (searchModalRoot) alpine.initTree(searchModalRoot)
}

// Handle all dropdown auto close
// https://stackoverflow.com/questions/76786642/daisyui-click-outside-to-close-details-summary-dropdown
window.addEventListener('click', function (e) {
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    if (!dropdown.contains(e.target)) {
      dropdown.open = false
    }
  })
})

// 主要用于在不同layout切换页面时, turbo_frame id不同，栏目树中链接又只能指向一个turbo_frame id
document.addEventListener("turbo:frame-missing", (e) => {
  e.preventDefault()

  const frame = e.detail?.frame
  const response = e.detail?.response

  const redirectUrl =
    response?.url ||
    frame?.src ||
    frame?.dataset?.src ||
    window.location.href

  if (redirectUrl) {
    if (window.Turbo) {
      window.Turbo.visit(redirectUrl, { action: "replace" })
    } else {
      window.location.href = redirectUrl
    }
  } else {
    window.location.reload()
  }
})
