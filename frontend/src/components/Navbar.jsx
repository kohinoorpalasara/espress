import React, { useState } from 'react'
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

  return (
    <nav className="sticky top-0 z-50 bg-amber-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Espress ✈
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/cities"
              className="text-amber-50 hover:text-white font-medium transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/cities"
              className="text-amber-50 hover:text-white font-medium transition-colors"
            >
              Cities
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className="text-amber-50 hover:text-white font-medium transition-colors"
                >
                  {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-amber-50 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/cities" className="block text-amber-50 hover:text-white py-2 font-medium" onClick={() => setMenuOpen(false)}>Explore</Link>
            {user ? (
              <>
                <Link to={`/profile/${user.id}`} className="block text-amber-50 hover:text-white py-2 font-medium" onClick={() => setMenuOpen(false)}>{user.username}</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="block text-amber-50 hover:text-white py-2 font-medium w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-amber-50 hover:text-white py-2 font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block text-amber-50 hover:text-white py-2 font-medium" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
