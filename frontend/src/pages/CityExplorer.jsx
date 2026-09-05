import { useState, useEffect } from 'react'
import client from '../api/client'
import CityCard from '../components/CityCard'

const CONTINENTS = [
  { key: 'ALL', label: 'All' },
  { key: 'EU', label: 'Europe' },
  { key: 'AS', label: 'Asia' },
  { key: 'NA', label: 'Americas' },
  { key: 'SA', label: 'Americas' },
  { key: 'AF', label: 'Africa' },
  { key: 'OC', label: 'Oceania' },
]

const CONTINENT_FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'EU', label: 'Europe' },
  { key: 'AS', label: 'Asia' },
  { key: 'AMERICAS', label: 'Americas', codes: ['NA', 'SA'] },
  { key: 'AF', label: 'Africa' },
  { key: 'OC', label: 'Oceania' },
]

export default function CityExplorer() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('ALL')

  useEffect(() => {
    client.get('/cities/')
      .then(res => setCities(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = cities.filter(city => {
    const matchesSearch = !search ||
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())

    const matchesContinent = continent === 'ALL' ||
      (continent === 'AMERICAS' ? ['NA', 'SA'].includes(city.continent) : city.continent === continent)

    return matchesSearch && matchesContinent
  })

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Cities</h1>
          <p className="text-gray-500 mb-6">Discover travel stories from around the world</p>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search cities or countries..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Continent filters */}
          <div className="flex flex-wrap gap-2">
            {CONTINENT_FILTERS.map(c => (
              <button
                key={c.key}
                onClick={() => setContinent(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  continent === c.key
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg animate-pulse bg-white">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cities found</h3>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-6">{filtered.length} {filtered.length === 1 ? 'city' : 'cities'} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(city => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
