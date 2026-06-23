import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import client from '../api/client'
import PostCard from '../components/PostCard'

function AuthorAvatar({ username }) {
  const colors = [
    'bg-rose-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-amber-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  ]
  const color = colors[(username?.charCodeAt(0) || 0) % colors.length]
  return (
    <div className={`w-24 h-24 ${color} rounded-full flex items-center justify-center text-white font-extrabold text-4xl`}>
      {username?.[0]?.toUpperCase() || '?'}
    </div>
  )
}

export default function UserProfile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      client.get(`/users/${id}/`),
      client.get(`/posts/?user=${id}`),
    ])
      .then(([profileRes, postsRes]) => {
        setProfile(profileRes.data)
        setPosts(postsRes.data)
      })
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-36" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error || 'User not found.'}</p>
        <Link to="/" className="text-amber-600 underline mt-4 inline-block">Go Home</Link>
      </div>
    )
  }

  const joinedDate = profile.profile?.joined_date
    ? formatDistanceToNow(new Date(profile.profile.joined_date), { addSuffix: true })
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AuthorAvatar username={profile.username} />
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {profile.first_name && profile.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : profile.username}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">@{profile.username}</p>

            {profile.profile?.location && (
              <p className="mt-2 text-sm text-gray-600 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profile.profile.location}
              </p>
            )}

            {profile.profile?.bio && (
              <p className="mt-3 text-gray-700 leading-relaxed">{profile.profile.bio}</p>
            )}

            <div className="flex items-center gap-5 mt-4 text-sm text-gray-500">
              {joinedDate && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {joinedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <strong className="text-gray-900">{profile.post_count}</strong> posts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Travel Stories</h2>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-4xl mb-3">✍️</div>
          <p className="text-gray-500">No posts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
