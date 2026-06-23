import React from 'react'
import { Link } from 'react-router-dom'

const CONTINENT_LABELS = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America',
}

export default function CityCard({ city }) {
  return (
    <Link
      to={`/cities/${city.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        {city.image_url ? (
          <img
            src={city.image_url}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-5xl">🌍</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {city.continent_display || CONTINENT_LABELS[city.continent] || city.continent}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
              {city.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {city.country}
            </p>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="text-sm font-medium">{city.post_count}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {city.description}
        </p>

        <div className="mt-4 flex items-center text-amber-600 text-sm font-semibold">
          View posts
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
