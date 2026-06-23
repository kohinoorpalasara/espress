import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import CityCard from '../components/CityCard'

export default function LandingPage() {
  const [cities, setCities] = useState([])

  useEffect(() => {
    client.get('/cities/').then(res => setCities(res.data.slice(0, 4))).catch(() => {})
  }, [])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">✈</div>
          <div className="absolute bottom-10 right-10 text-8xl">🌍</div>
          <div className="absolute top-1/2 left-1/3 text-7xl">🗺</div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover the World,<br />Share Your Journey
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers sharing authentic stories, hidden gems, and local tips from cities around the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg"
            >
              Explore Cities
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500">500+</div>
              <div className="text-gray-500 mt-1 text-sm md:text-base">Travelers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500">50+</div>
              <div className="text-gray-500 mt-1 text-sm md:text-base">Cities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500">1000+</div>
              <div className="text-gray-500 mt-1 text-sm md:text-base">Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      {cities.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Cities</h2>
                <p className="text-gray-500 mt-1">Explore stories from around the world</p>
              </div>
              <Link to="/explore" className="text-orange-500 hover:text-orange-600 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cities.map(city => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500 mb-12">Start your journey in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover</h3>
              <p className="text-gray-500">Browse cities from every continent and find your next destination through real traveler stories.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share</h3>
              <p className="text-gray-500">Write posts about your travel experiences, tips, and hidden gems that only locals know.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-500">Like and comment on posts, connect with fellow travelers, and build your travel community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-orange-100 mb-8 text-lg">Join thousands of travelers sharing their stories every day.</p>
          <Link
            to="/explore"
            className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg inline-block"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  )
}
