import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../context/AuthContext'
import client from '../api/client'

function AuthorAvatar({ username }) {
  const colors = [
    'bg-rose-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-amber-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  ]
  const color = colors[(username?.charCodeAt(0) || 0) % colors.length]
  return (
    <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {username?.[0]?.toUpperCase() || '?'}
    </div>
  )
}

export default function CommentSection({ postId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    client.get(`/posts/${postId}/comments/`)
      .then((res) => setComments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await client.post(`/posts/${postId}/comments/`, { body })
      setComments((prev) => [...prev, res.data])
      setBody('')
    } catch (err) {
      setError('Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Comments
        <span className="ml-2 text-sm font-normal text-gray-500">({comments.length})</span>
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <AuthorAvatar username={comment.author?.username} />
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{comment.author?.username}</span>
                  <span className="text-xs text-gray-400">
                    {comment.created_at
                      ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })
                      : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-3">
            <AuthorAvatar username={user.username} />
            <div className="flex-1">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={submitting || !body.trim()}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-800">
            <a href="/login" className="font-semibold underline">Login</a> to join the conversation.
          </p>
        </div>
      )}
    </div>
  )
}
