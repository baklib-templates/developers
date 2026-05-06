import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import './controllers'

// Search Modal, place this script before Alpine.start
Alpine.data('handleSearch', () => ({
  searchOpen: false,
  openSearch() {
    this.searchOpen = true
    document.body.classList.add('overflow-hidden')
    Alpine.nextTick(() => {
      this.$refs.searchInput.focus()
    })
  },
  closeSearch() {
    this.searchOpen = false
    document.body.classList.remove('overflow-hidden')
  }
}))

// Handle all dropdown auto close
// https://stackoverflow.com/questions/76786642/daisyui-click-outside-to-close-details-summary-dropdown
window.addEventListener('click', function (e) {
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    if (!dropdown.contains(e.target)) {
      // Click was outside the dropdown, close it
      dropdown.open = false
    }
  })
})

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()


// 主要用于在不同layout切换页面时, turbo_frame id不同，栏目树中链接又只能指向一个turbo_frame id
document.addEventListener("turbo:frame-missing", (e) => {
  e.preventDefault()

  const frame = e.detail?.frame
  const response = e.detail?.response

  // if (!frame) {
  //   console.warn("⚠️ turbo:frame-missing 触发，但未找到 frame 对象", e.detail)
  // }

  const frameId = frame?.id || "unknown"
  // console.log(`Turbo frame "${frameId}" missing, fallback to full reload.`)

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
