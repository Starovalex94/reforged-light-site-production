import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import content from '../data/site-content.json'

function LogoIcon() {
  return (
    <img
      src="/logo.png"
      alt=""
      className="h-12 w-auto shrink-0 sm:h-14"
    />
  )
}

function NavLink({ href, children, onClick, tabIndex, className }) {
  const location = useLocation()
  const isExternal = href.startsWith('/') && !href.startsWith('/#')
  
  if (isExternal) {
    return (
      <Link to={href} onClick={onClick} tabIndex={tabIndex} className={className}>
        {children}
      </Link>
    )
  }

  if (location.pathname !== '/') {
    const hashHref = href.startsWith('#') ? `/${href}` : href
    return (
      <Link to={hashHref} onClick={onClick} tabIndex={tabIndex} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onClick} tabIndex={tabIndex} className={className}>
      {children}
    </a>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logo, nav } = content.header
  const location = useLocation()

  const handleLogoClick = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="relative z-10 bg-beige py-4">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
            <button
              type="button"
              className="flex flex-col gap-1.5 p-2 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ease-in ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-ink transition-opacity duration-300 ease-in ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ease-in ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>

            <Link
              to="/"
              className="absolute left-1/2 flex max-w-[calc(100%-5.5rem)] -translate-x-1/2 items-center gap-2 lg:static lg:max-w-none lg:translate-x-0"
              onClick={handleLogoClick}
            >
              <LogoIcon />
              <span className="font-serif text-base font-semibold leading-tight tracking-tight text-ink sm:text-lg lg:text-xl">
                {logo}
              </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="w-10 lg:hidden" aria-hidden="true" />
          </div>
        </div>

        <nav
          id="mobile-nav"
          className={`absolute left-0 right-0 top-full border-t border-ink/10 bg-beige px-6 py-6 transition-transform duration-300 ease-in lg:hidden ${
            menuOpen
              ? 'pointer-events-auto translate-y-0'
              : 'pointer-events-none -translate-y-full'
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col items-center gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  className="text-base font-medium text-ink/80 transition-colors hover:text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
