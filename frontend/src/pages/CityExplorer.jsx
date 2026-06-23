import React, { useEffect, useState } from 'react'
import client from '../api/client'
import CityCard from '../components/CityCard'

const CONTINENTS = [
  { code: 'all', label: 'All' },
  { code: 'AF', label: 'Africa' },
  { code: 'AS', label: 'Asia' },
  { code: 'EU', label: 'Europe' },
  { code: 'NA', label: 'North America' },
  { code: 'OC', label: 'Oceania' },
  { code: 'SA', label: 'South America' },
]

export default function CityExplorer() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('all')

  useEffect(() => {
    client.get('/cities/')
      .then((res) => setCities(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = cities.filter((city) => {
    const matchSearch =
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())
    const matchContinent = continent === 'all' || city.continent === continent
    return matchSearch && matchContinent
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Cities</h1>
        <p className="text-gray-500 text-lg">Discover travel stories from around the world</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search cities or countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Continent Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CONTINENTS.map((c) => (
          <button
            key={c.code}
            onClick={() => setContinent(c.code)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              continent === c.code
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">No cities found matching your search.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filtered.length} destination{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
