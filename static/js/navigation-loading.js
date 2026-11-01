(() => {
  const storageKey = 'msedcl-navigation-started'
  const minimumVisibleDuration = 1800
  let minimumVisibleUntil = 0
  let pageLoaded = document.readyState === 'complete'
  let toast
  let removeTimeout

  function showToast() {
    if (!document.body) return
    if (removeTimeout) window.clearTimeout(removeTimeout)
    minimumVisibleUntil = Math.max(
      minimumVisibleUntil,
      Date.now() + minimumVisibleDuration,
    )
    if (!toast) {
      const style = document.createElement('style')
      style.textContent = `
        .navigation-loading-toast {
          position: fixed;
          z-index: 10000;
          top: 76px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          color: #fff;
          background: #102c4d;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgb(15 23 42 / 20%);
          font: 500 13px/1.4 Inter, system-ui, sans-serif;
        }
        .navigation-loading-spinner {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          border: 2px solid rgb(255 255 255 / 40%);
          border-top-color: #fff;
          border-radius: 50%;
          animation: navigation-loading-spin 0.8s linear infinite;
        }
        @keyframes navigation-loading-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .navigation-loading-spinner { animation: none; }
        }
      `
      document.head.append(style)
      toast = document.createElement('div')
      toast.className = 'navigation-loading-toast'
      toast.setAttribute('role', 'status')
      toast.setAttribute('aria-live', 'polite')
      const spinner = document.createElement('span')
      spinner.className = 'navigation-loading-spinner'
      spinner.setAttribute('aria-hidden', 'true')
      const message = document.createElement('span')
      message.textContent = 'Loading page, please wait…'
      toast.append(spinner, message)
    }
    if (!toast.isConnected) document.body.append(toast)
    scheduleRemoval()
  }

  function scheduleRemoval() {
    if (removeTimeout) window.clearTimeout(removeTimeout)
    const remainingTime = Math.max(0, minimumVisibleUntil - Date.now())
    removeTimeout = window.setTimeout(() => {
      if (!pageLoaded) return
      toast?.remove()
      toast = undefined
    }, remainingTime)
  }

  window.addEventListener('load', () => {
    pageLoaded = true
    if (toast?.isConnected) scheduleRemoval()
  }, { once: true })

  let navigationStartedAt = 0
  try {
    navigationStartedAt = Number(sessionStorage.getItem(storageKey)) || 0
    sessionStorage.removeItem(storageKey)
  } catch {
    navigationStartedAt = 0
  }

  if (navigationStartedAt && Date.now() - navigationStartedAt < 30_000) {
    showToast()
  }

  document.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return

    const target = event.target
    if (!(target instanceof Element)) return
    const link = target.closest('a[href]')
    if (
      !(link instanceof HTMLAnchorElement) ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self')
    ) return

    const destination = new URL(link.href, window.location.href)
    if (
      destination.origin !== window.location.origin ||
      (destination.pathname === window.location.pathname &&
        destination.search === window.location.search)
    ) return

    try {
      sessionStorage.setItem(storageKey, String(Date.now()))
    } catch {
      return
    }
    showToast()
  })
})()
