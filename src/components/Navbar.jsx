import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  const variant = useMemo(() => {
    if (location.pathname.startsWith('/login')) return 'auth'
    if (location.pathname.startsWith('/profiles')) return 'profiles'
    return 'default'
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'nav',
        isScrolled ? 'nav--solid' : 'nav--transparent',
        variant !== 'default' ? `nav--${variant}` : '',
      ].join(' ')}
    >
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Netflix">
          <span className="nav__logo">NETFLIX</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Home
          </NavLink>
          <NavLink to="/profiles" className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Profiles
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Login
          </NavLink>
        </nav>

        <div className="nav__actions">
          <button className="nav__iconBtn" type="button" aria-label="Search (UI only)">
            <span aria-hidden="true">⌕</span>
          </button>
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

