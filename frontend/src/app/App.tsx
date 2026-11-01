import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, requestJson } from '../lib/api/client'
import { AppShell } from '../components/AppShell'
import { AdminPage } from '../features/admin/AdminPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { LoginPage } from '../features/auth/LoginPage'
import type { SessionUser } from '../features/auth/types'
import './App.css'

const LEGACY_APP_URL =
  import.meta.env.VITE_LEGACY_APP_URL ??
  (import.meta.env.DEV ? 'http://127.0.0.1:5000' : window.location.origin)

const MINIMUM_NAVIGATION_NOTICE_MS = 1800

export default function App() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const isLoginPage = window.location.pathname === '/login'
  const [pathname, setPathname] = useState(window.location.pathname)
  const [navigationLoading, setNavigationLoading] = useState(false)
  const navigationStartedAt = useRef<number | null>(null)
  const navigationId = useRef(0)
  const [loading, setLoading] = useState(!isLoginPage)

  const startNavigation = useCallback((path: string) => {
    if (path === window.location.pathname) return
    window.history.pushState(null, '', path)
    navigationId.current += 1
    navigationStartedAt.current = Date.now()
    setPathname(path)
    setNavigationLoading(true)
  }, [])

  const markPageReady = useCallback(() => {
    const startedAt = navigationStartedAt.current
    if (startedAt === null) return

    const currentNavigationId = navigationId.current
    const remainingTime = Math.max(
      0,
      MINIMUM_NAVIGATION_NOTICE_MS - (Date.now() - startedAt),
    )
    window.setTimeout(() => {
      if (navigationId.current !== currentNavigationId) return
      navigationStartedAt.current = null
      setNavigationLoading(false)
    }, remainingTime)
  }, [])

  useEffect(() => {
    if (isLoginPage) return

    function syncPathname() {
      const currentPath = window.location.pathname
      if (currentPath === pathname) return
      navigationId.current += 1
      navigationStartedAt.current = Date.now()
      setPathname(currentPath)
      setNavigationLoading(true)
    }

    window.addEventListener('popstate', syncPathname)
    return () => window.removeEventListener('popstate', syncPathname)
  }, [isLoginPage, pathname])

  useEffect(() => {
    if (isLoginPage) return

    let active = true
    requestJson<SessionUser>('/auth/me')
      .then((currentUser) => {
        if (!active) return
        if (currentUser.role === 'viewer' || currentUser.role === 'advisor') {
          window.location.replace(`${LEGACY_APP_URL}/my-profile`)
          return
        }
        setUser(currentUser)
      })
      .catch((error: unknown) => {
        if (!active) return
        if (error instanceof ApiError && error.status === 401) {
          window.location.replace('/login')
          return
        }
        setLoading(false)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [isLoginPage])

  if (isLoginPage) return <LoginPage />
  if (loading || !user) {
    return (
      <main className="react-loading" aria-live="polite">
        <span className="loading-mark" aria-hidden="true">⚡</span>
        <p>{loading ? 'Loading your quality workspace…' : 'The workspace could not be loaded.'}</p>
        {!loading && (
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Try again
          </button>
        )}
      </main>
    )
  }

  return (
    <AppShell
      user={user}
      pathname={pathname}
      navigationLoading={navigationLoading}
      onNavigate={startNavigation}
    >
      {pathname.startsWith('/admin/')
        ? <AdminPage key={pathname} path={pathname} user={user} onPageReady={markPageReady} />
        : <DashboardPage user={user} onPageReady={markPageReady} />}
    </AppShell>
  )
}
