import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from '../api/client'
import PostCard from '../components/PostCard'

function getInitials(user) {
  if (!user) return '?'
  const first = user.first_name?.[0] || ''
  const last = user.last_name?.[0] || ''
  return (first + last).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
}

export default function UserProfile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.get(`/profiles/${id}/`)
      .then(res => {
        setProfile(res.data)
        return client.get('/posts/')
      })
      .then(postsRes => {
        const userPosts = postsRes.data.filter(p => p.author?.id === parseInt(id))
        setPosts(userPosts)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">User not found</h2>
          <Link to="/explore" className="text-orange-500 hover:underline">Back to Explore</Link>
        </div>
      </div>
    )
  }

  const user = profile.user
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.username

  const memberSince = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Profile card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-orange-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {getInitials(user)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
              <p className="text-gray-500">@{user?.username}</p>
              {profile.location && (
                <p className="text-gray-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.location}
                </p>
              )}
              {memberSince && (
                <p className="text-gray-400 text-sm mt-1">Member since {memberSince}</p>
              )}
            </div>
          </div>

          {profile.bio && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Posts */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Posts by @{user?.username}
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-4xl mb-3">✍️</div>
            <p className="text-gray-500">No posts yet.</p>
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
