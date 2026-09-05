import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import client from '../api/client'
import Avatar from './Avatar'
import Button from './Button'
import { timeAgo } from '../lib/time'

export default function CommentSection({ postId, onCountChange }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    client.get(`/posts/${postId}/comments/`)
      .then(res => setComments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [postId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true); setError('')
    try {
      const res = await client.post(`/posts/${postId}/comments/`, { body })
      setComments(prev => { const next = [...prev, res.data]; onCountChange?.(next.length); return next })
      setBody('')
    } catch {
      setError("Couldn't post that. Try again?")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between mb-8">
        <h3 className="font-display text-3xl tracking-tight">
          Replies <span className="text-muted text-xl">({comments.length})</span>
        </h3>
      </div>

      {loading ? (
        <div className="space-y-4">{[0, 1].map(i => <div key={i} className="h-20 rounded-2xl shimmer" />)}</div>
      ) : comments.length === 0 ? (
        <p className="text-muted mb-8">Quiet so far. Say the first thing.</p>
      ) : (
        <ol className="space-y-6 mb-10">
          {comments.map((c, i) => (
            <li key={c.id} className="flex gap-4 page" style={{ animationDelay: `${i * 60}ms` }}>
              <Avatar user={c.author} size="sm" className="mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <Link to={`/profile/${c.author?.id}`} className="text-sm font-medium hover:text-crema-300 transition-colors" data-cursor="Profile">
                    {c.author?.username}
                  </Link>
                  <span className="tag">{timeAgo(c.created_at)}</span>
                </div>
                <p className="mt-1.5 text-bone/80 leading-relaxed">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="glass rounded-3xl p-5 sm:p-6">
          <div className="flex gap-4">
            <Avatar user={user} size="sm" className="mt-1 hidden sm:inline-grid" />
            <div className="flex-1">
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Add to the story…"
                rows={3}
                className="w-full bg-transparent resize-none outline-none text-bone placeholder:text-muted leading-relaxed"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="tag">{error ? <span className="text-red-400 normal-case tracking-normal">{error}</span> : `${body.length} chars`}</span>
                <Button type="submit" size="sm" disabled={submitting || !body.trim()} cursor="Send" flip={false}>
                  {submitting ? 'Sending…' : 'Reply'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-bone/80">Been there too? <span className="text-muted">Sign in to reply.</span></p>
          <Button to="/login" variant="ghost" size="sm" cursor="Sign in">Sign in</Button>
        </div>
      )}
    </section>
  )
}
