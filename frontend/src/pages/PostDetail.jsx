import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
import CommentSection from '../components/CommentSection'
import { useAuth } from '../context/AuthContext'

function getInitials(user) {
  if (!user) return '?'
  const first = user.first_name?.[0] || ''
  const last = user.last_name?.[0] || ''
  return (first + last).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
}

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    client.get(`/posts/${id}/`)
      .then(res => {
        setPost(res.data)
        setLiked(res.data.is_liked)
        setLikesCount(res.data.likes_count)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleLike = async () => {
    if (!user) { navigate('/login'); return }
    if (liking) return
    setLiking(true)
    try {
      const res = await client.post(`/posts/${id}/like/`)
      setLiked(res.data.liked)
      setLikesCount(res.data.count)
    } catch {
      // ignore
    } finally {
      setLiking(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Post not found</h2>
          <Link to="/explore" className="text-orange-500 hover:underline">Back to Explore</Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* City badge */}
          {post.city && (
            <Link
              to={`/cities/${post.city.id}`}
              className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full mb-4 hover:bg-orange-200 transition-colors"
            >
              {post.city.name}, {post.city.country}
            </Link>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Author row */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(post.author)}
            </div>
            <div>
              <Link to={`/profile/${post.author?.id}`} className="font-medium text-gray-900 hover:text-orange-500 transition-colors">
                @{post.author?.username}
              </Link>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>

          {/* Body */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8 text-base">
            {post.body}
          </div>

          {/* Like button */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all ${
                liked
                  ? 'border-red-400 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
          <CommentSection postId={post.id} initialComments={post.comments || []} />
        </div>
      </div>
    </div>
  )
}
