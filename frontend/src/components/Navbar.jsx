import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './Button'
import Avatar from './Avatar'
import LiveClock from './LiveClock'

function Plane({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      <path d="M12 34l8-3 12-16 6 2-8 14 14-2 4 4-22 6-6 10-4-1 2-8-6-3z" />
    </svg>
  )
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLogout = () => { logout(); navigate('/') }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const linkCls = ({ isActive }) =>
    `link-u text-sm font-medium transition-colors ${isActive ? 'text-crema-400' : 'text-bone/80 hover:text-bone'}`

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <nav className={`flex items-center justify-between rounded-full px-4 sm:px-5 h-14 transition-all duration-500 ease-out ${scrolled ? 'glass shadow-card' : ''}`}>
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="relative grid place-items-center w-9 h-9 rounded-full bg-crema-400 text-ink-900 overflow-hidden">
                <Plane className="w-5 h-5 transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:-translate-y-8" />
                <Plane className="w-5 h-5 absolute -translate-x-8 translate-y-8 transition-transform duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
              <span className="font-display text-xl tracking-tight">Espress</span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              <NavLink to="/explore" className={linkCls}>Explore</NavLink>
              {user && <NavLink to="/create-post" className={linkCls}>Write</NavLink>}
              <span className="hidden lg:inline-flex tag items-center">
                <LiveClock timeZone={tz} seconds={false} className="text-[11px]" />
                <span className="ml-2">you</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-bone/80 hover:text-bone transition-colors px-2 link-u">
                    Sign in
                  </Link>
                  <Button to="/register" size="sm">Join</Button>
                </>
              ) : (
                <>
                  <Link to={`/profile/${user.id}`} className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-white/5 transition-colors">
                    <Avatar user={user} size="sm" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-muted hover:text-bone transition-colors link-u">
                    Log out
                  </button>
                </>
              )}
            </div>

            <button
              className="md:hidden relative w-10 h-10 grid place-items-center rounded-full hover:bg-white/5"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`absolute h-px w-5 bg-bone transition-all duration-400 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute h-px w-5 bg-bone transition-all duration-400 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-ink-950/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={`relative h-full flex flex-col justify-center px-8 gap-6 transition-transform duration-500 ease-out ${open ? 'translate-y-0' : 'translate-y-6'}`}>
          <span className="eyebrow">Menu</span>
          <Link to="/explore" className="font-display text-5xl display-italic">Explore</Link>
          {user && <Link to="/create-post" className="font-display text-5xl display-italic">Write</Link>}
          {!user ? (
            <>
              <Link to="/login" className="font-display text-5xl display-italic">Sign in</Link>
              <Link to="/register" className="font-display text-5xl display-italic text-crema-400">Join</Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${user.id}`} className="font-display text-5xl display-italic">Profile</Link>
              <button onClick={handleLogout} className="text-left font-display text-5xl display-italic text-muted">Log out</button>
            </>
          )}
          <div className="mt-10 tag">Your time · <LiveClock timeZone={tz} /></div>
        </div>
      </div>
    </>
  )
}
