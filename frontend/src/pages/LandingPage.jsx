import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import CityCard from '../components/CityCard'

export default function LandingPage() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.get('/cities/')
      .then((res) => setCities(res.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="600" cy="100" r="300" fill="white" />
            <circle cx="100" cy="500" r="200" fill="white" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            ✈ Travel Community
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            Discover the World<br />
            <span className="text-amber-100">with Fellow Travelers</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Share your adventures, discover hidden gems, and connect with passionate travelers from around the globe. Every journey begins with a story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/cities"
              className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-3.5 rounded-xl text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Cities
            </Link>
            <Link
              to="/register"
              className="bg-amber-700/40 backdrop-blur-sm hover:bg-amber-700/60 text-white font-bold px-8 py-3.5 rounded-xl text-lg border border-white/30 transition-all"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Popular Destinations</h2>
          <p className="mt-3 text-gray-500 text-lg">Explore what travelers are talking about</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/cities"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-xl transition-colors"
          >
            View All Cities
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Join thousands of travelers</h2>
            <p className="mt-2 text-gray-500">Be part of the global travel community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌍', value: '50+', label: 'Destinations Covered' },
              { icon: '✍️', value: '1,000+', label: 'Travel Stories Shared' },
              { icon: '👥', value: '500+', label: 'Community Members' },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-amber-100">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-amber-500 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to start your journey?</h2>
        <p className="text-gray-500 text-lg mb-8">Share your travel stories and inspire others to explore the world.</p>
        <Link
          to="/register"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg"
        >
          Get Started — It's Free
        </Link>
      </section>
    </div>
  )
}
