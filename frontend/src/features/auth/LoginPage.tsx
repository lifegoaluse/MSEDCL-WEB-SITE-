import { useState, type FormEvent, type ReactNode } from 'react'
import { ApiError, requestJson } from '../../lib/api/client'
import type { SessionUser } from './types'

const LEGACY_APP_URL =
  import.meta.env.VITE_LEGACY_APP_URL ??
  (import.meta.env.DEV ? 'http://127.0.0.1:5000' : window.location.origin)

interface LoginResponse {
  user: SessionUser
  next: string
}

type IconName = 'user' | 'lock' | 'eye' | 'eyeOff' | 'arrow' | 'moon' | 'sun'

function LoginIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    lock: (
      <>
        <rect x="4.5" y="10" width="15" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6.1 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.6M6.2 6.8C3.8 8.3 2.5 12 2.5 12s3.4 6 9.5 6c1 0 1.9-.2 2.7-.5" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    moon: <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRecoveryHelp, setShowRecoveryHelp] = useState(false)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark',
  )

  function toggleTheme() {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('msedcl_theme', next ? 'dark' : 'light')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const response = await requestJson<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      if (response.next === '/my-profile') {
        window.location.replace(`${LEGACY_APP_URL}${response.next}`)
      } else {
        window.location.replace('/')
      }
    } catch (requestError: unknown) {
      if (requestError instanceof ApiError) {
        setError(requestError.message)
      } else {
        setError('Sign-in could not be completed. Check your connection and try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-layout">
        <section className="login-story" aria-label="MSEDCL quality assurance">
          <a className="login-brand" href="/" aria-label="MSEDCL Quality Audit home">
            <span className="login-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 32" focusable="false">
                <path d="M14.4 1 3.1 17h7.6L9.2 31l11.7-18h-7.7L14.4 1Z" />
              </svg>
            </span>
            <span className="login-brand-divider" aria-hidden="true" />
            <span className="login-brand-copy">
              <strong>MSEDCL</strong>
              <small>Quality Audit Portal</small>
            </span>
          </a>

          <div className="login-story-copy">
            <p className="login-story-kicker">
              <span aria-hidden="true" />
              Maharashtra State Electricity Distribution
            </p>
            <h1>
              Better quality.
              <br />
              <span>Better service.</span>
            </h1>
            <p>Review performance, learn from every interaction, and help deliver a better experience for every customer.</p>
          </div>

          <div className="login-grid-art" aria-hidden="true">
            <svg viewBox="0 0 640 260" role="presentation" focusable="false">
              <path className="grid-line" d="M0 224H640M0 184H640M0 144H640M0 104H640M0 64H640" />
              <path className="grid-line" d="M80 0V260M160 0V260M240 0V260M320 0V260M400 0V260M480 0V260M560 0V260" />
              <path className="horizon-line" d="M0 211H640" />
              <path className="tree-line" d="M0 225 10 219l8 5 12-10 10 8 13-13 12 14 12-9 12 8 14-13 12 11 13-8 9 10 15-15 12 13 13-9 11 9 13-12 12 11 12-8 12 10 15-15 12 12 14-9 14 11 12-13 13 9 14-8 14 10 12-14 12 10 13-8 12 10 14-12 13 11 14-8 12 12 15-13 11 10 14-9 11 8 13-13 13 10 13-8 14 11 12-12 13 9 15-12 12 12 12-10 13 10 12-14 13 12 13-9 12 10 13-11 13 8 15-14 12 11 13-8 12 9 14-12 13 11 12-9 14 10 13-12 12 8 14-10 13 12 11-9 16 11 12-13 12 10 15-12 13 11 14-9 12 11 13-10 14 12 13-13 14 11 13-8 14 12 14-10 12 9 16-14 12 11 14-9 13 10 12-10 15 11 13-12 13 10 14-9 12 11 15-14 14 12 12-8 16 10 12-12 14 11 14-10 14 11 12-8 15 9 12-12 15 13 12-9 15 10 12-10 15 11 13-13 12 11 14-8 15 10 13-12 13 11 13-9 14 11 14-13 13 10 14-8 14 11 13-11 14 9 15-13 13 12 14-8 15 9 14-12 13 11 14-9 15 11 14-13 14 10 15-9 14 10 13-12 17 11 15-10 14 11 15-12 14 9 18-13 14 11 14-9 17 12 13-10 16 10 13-11 16 12 15-10 16 11 16-13 14 10 18-12 16 11 16-9 17 13 16-10 16 12 17-11 16 10 18-13 16 12 18-11 16 10 18-12 16 11 20-10 18 12 22-12V260H0Z" />
              <path className="power-line" d="M0 151C112 151 140 184 260 184S398 105 640 105" />
              <path className="power-line power-line-secondary" d="M0 177C132 177 154 207 270 207S435 132 640 132" />
              <path className="power-line power-line-bright" d="M0 198C116 198 180 170 280 178S470 215 640 176" />
              <g className="tower-lines">
                <path d="M484 77 430 224M484 77 538 224M451 131h66m-78 27h91m-102 28h113m-125 30h137M443 131l83 27m-83-27 79 27m-89 0 94 28m-94-28 91 28m-101 0 106 30m-106-30 103 30m-111 0 119 30m-119-30 116 30" />
                <path d="M418 131h132m-142 27h153m-163 28h174m-184 30h195M476 224h16" />
              </g>
              <circle className="tower-beacon" cx="484" cy="74" r="4" />
            </svg>
          </div>
          <div className="login-story-footer">
            <span className="login-shield" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" focusable="false">
                <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />
                <path d="m8.5 12 2.3 2.3 4.8-5" />
              </svg>
            </span>
            <span>Reliable service starts with quality</span>
          </div>
        </section>

        <section className="login-container" aria-labelledby="loginHeading">
          <div className="login-panel-top">
            <span className="login-panel-label">Employee access</span>
            <span className="login-panel-rule" aria-hidden="true" />
            <button
              type="button"
              className="theme-corner-btn"
              onClick={toggleTheme}
              title="Toggle color theme"
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              <LoginIcon name={darkMode ? 'sun' : 'moon'} />
            </button>
          </div>

          <div className="login-form-content">
            <p className="login-welcome">Welcome back</p>
            <h2 className="login-heading" id="loginHeading">Sign in to your account</h2>
            <p className="login-description">Enter your credentials to continue to the quality audit portal.</p>

            {error && <div className="alert alert-danger" role="alert" aria-live="polite">{error}</div>}

            <form className="login-form" onSubmit={submit}>
              <div className="login-field">
                <label htmlFor="username">Username</label>
                <div className="login-input-wrap">
                  <LoginIcon name="user" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="password">Password</label>
                <div className="login-input-wrap">
                  <LoginIcon name="lock" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    <LoginIcon name={showPassword ? 'eyeOff' : 'eye'} />
                  </button>
                </div>
                <div className="login-recovery">
                  <button
                    type="button"
                    aria-expanded={showRecoveryHelp}
                    onClick={() => setShowRecoveryHelp((visible) => !visible)}
                  >
                    Forgot password?
                  </button>
                </div>
                {showRecoveryHelp && (
                  <p className="login-recovery-help" role="status">
                    Contact your system administrator to reset your password.
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary login-submit" disabled={submitting}>
                <span className="login-submit-label">
                  {submitting && <span className="login-spinner" aria-hidden="true" />}
                  {submitting ? 'Signing in…' : 'Sign in'}
                </span>
                <LoginIcon name="arrow" />
              </button>
            </form>

            <div className="login-security-note">
              <span className="login-security-rule" aria-hidden="true" />
              <span className="login-security-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" focusable="false">
                  <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />
                  <path d="m8.5 12 2.3 2.3 4.8-5" />
                </svg>
              </span>
              <p>Secure, role-based access. Account activity is monitored.</p>
              <span className="login-security-rule" aria-hidden="true" />
            </div>
          </div>
          <div className="login-panel-footer">
            <span aria-hidden="true" />
            <p>Need access? Contact your system administrator.</p>
            <span aria-hidden="true" />
          </div>
        </section>
      </div>
    </main>
  )
}
