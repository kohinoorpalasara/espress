import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const username = user?.user?.username

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
            ✈ Espress
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Explore
            </Link>
            {user && (
              <Link
                to="/create-post"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
              >
                + New Post
              </Link>
            )}
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700 font-medium">Hi, {username}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-3">
            <Link
              to="/explore"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors px-2"
              onClick={() => setMenuOpen(false)}
            >
              Explore
            </Link>
            {user && (
              <Link
                to="/create-post"
                className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium text-center"
                onClick={() => setMenuOpen(false)}
              >
                + New Post
              </Link>
            )}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-500 font-medium px-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-full font-medium text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700 font-medium px-2">Hi, {username}</span>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false) }}
                  className="text-left text-red-500 font-medium px-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
