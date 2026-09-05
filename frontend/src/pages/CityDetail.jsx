import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function CityDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [city, setCity] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      client.get(`/cities/${id}/`),
      client.get(`/posts/?city=${id}`)
    ])
      .then(([cityRes, postsRes]) => {
        setCity(cityRes.data)
        setPosts(postsRes.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="h-80 bg-gray-200 animate-pulse" />
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    )
  }

  if (!city) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">City not found</h2>
          <Link to="/explore" className="text-orange-500 hover:underline">Back to Explore</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={city.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200'}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">{city.name}</h1>
            <p className="text-xl text-orange-300">{city.country}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">{city.description}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-gray-500">{posts.length} {posts.length === 1 ? 'story' : 'stories'} shared</span>
            <button
              onClick={() => user ? navigate(`/create-post?city=${id}`) : navigate('/login')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Share your experience
            </button>
          </div>
        </div>

        {/* Posts */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Stories from {city.name}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No stories yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your experience in {city.name}!</p>
            <Link
              to={user ? `/create-post?city=${id}` : '/login'}
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors"
            >
              Write a story
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
