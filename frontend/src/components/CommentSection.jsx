import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import client from '../api/client'

function timeAgo(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 2592000)}mo ago`
}

function getInitials(user) {
  if (!user) return '?'
  const first = user.first_name?.[0] || ''
  const last = user.last_name?.[0] || ''
  return (first + last).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
}

const AVATAR_COLORS = [
  'bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400',
  'bg-pink-400', 'bg-teal-400',
]
function getAvatarColor(username) {
  if (!username) return AVATAR_COLORS[0]
  let hash = 0
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function CommentSection({ postId, initialComments = [] }) {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await client.post('/comments/', { post: postId, body })
      setComments(prev => [...prev, res.data])
      setBody('')
    } catch {
      setError('Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 && (
        <p className="text-gray-500 mb-6">No comments yet. Be the first to share your thoughts!</p>
      )}

      <div className="space-y-4 mb-8">
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-full ${getAvatarColor(comment.author?.username)} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                {getInitials(comment.author)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">@{comment.author?.username}</p>
                <p className="text-xs text-gray-500">{timeAgo(comment.created_at)}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{comment.body}</p>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Add a comment</h4>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            required
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={submitting || !body.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-gray-700">
            <Link to="/login" className="text-orange-500 font-medium hover:text-orange-600">
              Login
            </Link>{' '}
            to leave a comment.
          </p>
        </div>
      )}
    </div>
  )
}
