import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import './Navbar.css'
import PATHS from '../routes/paths.js'

export default function Navbar({
  showSearch = true,
  searchQuery = '',
  onSearchChange,
}) {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const searchInputRef = useRef(null)

  const variant = useMemo(() => {
    if (location.pathname.startsWith(PATHS.login)) return 'auth'
    if (location.pathname.startsWith(PATHS.profiles)) return 'profiles'
    return 'default'
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!showSearch) return

    const onKeyDown = (e) => {
      if (e.defaultPrevented) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key !== '/') return

      const tag = e.target?.tagName
      const isTypingTarget =
        tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable
      if (isTypingTarget) return

      e.preventDefault()
      searchInputRef.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showSearch])

  return (
    <header
      className={[
        'nav',
        isScrolled ? 'nav--solid' : 'nav--transparent',
        variant !== 'default' ? `nav--${variant}` : '',
      ].join(' ')}
    >
      <div className="nav__inner">
        <Link to={PATHS.home} className="nav__brand" aria-label="Netflix">
          <span className="nav__logo">NETFLIX</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to={PATHS.home} end className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Home
          </NavLink>
          <NavLink to={PATHS.profiles} className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Profiles
          </NavLink>
          <NavLink to={PATHS.login} className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Login
          </NavLink>
        </nav>

        {showSearch ? (
          <div className="navSearch" role="search" aria-label="Search movies">
            <span className="navSearch__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              className="navSearch__input"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onSearchChange?.('')
              }}
              placeholder="Titles, people, genres"
              aria-label="Search movies"
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery ? (
              <button
                type="button"
                className="navSearch__clear"
                onClick={() => onSearchChange?.('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="nav__actions">
          <button className="nav__iconBtn" type="button" aria-label="Notifications (UI only)">
            <span aria-hidden="true">⟡</span>
          </button>
          <div className="nav__avatar" aria-hidden="true" />
        </div>
      </div>
      <div className="nav__fade" aria-hidden="true" />
    </header>
  )
}

