import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-2xl font-extrabold text-white">Espress ✈</span>
            <p className="mt-1 text-sm text-gray-400">Discover the world with fellow travelers.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/cities" className="hover:text-white transition-colors">Cities</Link>
            <Link to="/register" className="hover:text-white transition-colors">Join Community</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-xs text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Espress Travel Community. Built with Django + React.
        </div>
      </div>
    </footer>
  )
}
