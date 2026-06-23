import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from '../api/client'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function CityDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [city, setCity] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      client.get(`/cities/${id}/`),
      client.get(`/posts/?city=${id}`),
    ])
      .then(([cityRes, postsRes]) => {
        setCity(cityRes.data)
        setPosts(postsRes.data)
      })
      .catch(() => setError('Failed to load city details.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-gray-200" />
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    )
  }

  if (error || !city) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error || 'City not found.'}</p>
        <Link to="/cities" className="text-amber-600 underline mt-4 inline-block">Back to Cities</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        {city.image_url ? (
          <img src={city.image_url} alt={city.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-5xl mx-auto">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
              {city.continent_display || city.continent}
            </span>
            <h1 className="text-5xl font-extrabold text-white">{city.name}</h1>
            <p className="text-xl text-gray-200 mt-1">{city.country}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Description + Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">{city.description}</p>
          <div className="flex items-center gap-6 mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <strong className="text-gray-900">{city.post_count}</strong> posts
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {city.country}
            </span>
          </div>
        </div>

        {/* Posts Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Travel Stories</h2>
          {user && (
            <Link
              to={`/posts/create?city=${id}`}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Write a Post
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">✍️</div>
            <p className="text-gray-500 text-lg mb-4">No posts yet for {city.name}.</p>
            {user ? (
              <Link
                to={`/posts/create?city=${id}`}
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Be the first to write one
              </Link>
            ) : (
              <Link to="/login" className="text-amber-600 underline font-medium">Login to write the first post</Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
