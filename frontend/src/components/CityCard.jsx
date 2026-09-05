import { Link } from 'react-router-dom'

const CONTINENT_COLORS = {
  EU: 'bg-blue-100 text-blue-700',
  AS: 'bg-red-100 text-red-700',
  NA: 'bg-green-100 text-green-700',
  SA: 'bg-yellow-100 text-yellow-700',
  AF: 'bg-orange-100 text-orange-700',
  OC: 'bg-purple-100 text-purple-700',
}

const CONTINENT_NAMES = {
  EU: 'Europe',
  AS: 'Asia',
  NA: 'North America',
  SA: 'South America',
  AF: 'Africa',
  OC: 'Oceania',
}

export default function CityCard({ city }) {
  return (
    <Link to={`/cities/${city.id}`} className="block group">
      <div className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="overflow-hidden h-48">
          <img
            src={city.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                {city.name}
              </h3>
              <p className="text-gray-500 text-sm">{city.country}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${CONTINENT_COLORS[city.continent] || 'bg-gray-100 text-gray-700'}`}>
              {CONTINENT_NAMES[city.continent] || city.continent}
            </span>
          </div>
          <p className="text-orange-500 text-sm font-medium">
            {city.post_count} {city.post_count === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </div>
    </Link>
  )
}
