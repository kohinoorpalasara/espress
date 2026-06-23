import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatDistanceToNow, format } from 'date-fns'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import CommentSection from '../components/CommentSection'

function AuthorAvatar({ username, size = 'md' }) {
  const colors = [
    'bg-rose-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-amber-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  ]
  const color = colors[(username?.charCodeAt(0) || 0) % colors.length]
  const sizeClass = size === 'md' ? 'w-10 h-10 text-base' : 'w-14 h-14 text-xl'
  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {username?.[0]?.toUpperCase() || '?'}
    </div>
  )
}

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    client.get(`/posts/${id}/`)
      .then((res) => {
        setPost(res.data)
        setLiked(res.data.is_liked)
        setLikesCount(res.data.likes_count)
      })
      .catch(() => setError('Failed to load post.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleLike = async () => {
    if (!user) { window.location.href = '/login'; return }
    setLiking(true)
    try {
      const res = await client.post(`/posts/${id}/like/`)
      setLiked(res.data.liked)
      setLikesCount(res.data.likes_count)
    } catch {
      // ignore
    } finally {
      setLiking(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error || 'Post not found.'}</p>
        <Link to="/cities" className="text-amber-600 underline mt-4 inline-block">Back to Cities</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* City Badge */}
      {post.city && (
        <Link
          to={`/cities/${post.city.id}`}
          className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-5 hover:bg-amber-200 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {post.city.name}, {post.city.country}
        </Link>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">{post.title}</h1>

      {/* Author */}
      <div className="flex items-center gap-3 mb-8">
        <AuthorAvatar username={post.author?.username} />
        <div>
          <Link to={`/profile/${post.author?.id}`} className="font-semibold text-gray-900 hover:text-amber-600 transition-colors">
            {post.author?.username}
          </Link>
          <p className="text-sm text-gray-400">
            {post.created_at ? format(new Date(post.created_at), 'MMMM d, yyyy') : ''}
            {' · '}
            {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : ''}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10 whitespace-pre-wrap">
        {post.body}
      </div>

      {/* Like */}
      <div className="flex items-center gap-4 py-6 border-y border-gray-100">
        <button
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            liked
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500'
          }`}
        >
          <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {liked ? 'Liked' : 'Like'}
          <span className="bg-white/60 px-2 py-0.5 rounded-full">{likesCount}</span>
        </button>
        <span className="text-gray-400 text-sm">{post.comment_count} comments</span>
      </div>

      <CommentSection postId={id} />
    </div>
  )
}
