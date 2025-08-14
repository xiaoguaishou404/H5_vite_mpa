const urlParams = new URLSearchParams(window.location.search)
const safeAreaTop = urlParams.get('top')
const safeAreaBottom = urlParams.get('bottom')

// 设置CSS变量来处理安全区
if (safeAreaTop && safeAreaBottom) {
  document.documentElement.style.setProperty('--safe-area-top', `${safeAreaTop}px`)
  document.documentElement.style.setProperty('--safe-area-bottom', `${safeAreaBottom}px`)
}
