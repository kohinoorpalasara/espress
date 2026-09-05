import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
import CommentSection from '../components/CommentSection'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import Empty from '../components/Empty'
import LiveClock from '../components/LiveClock'
import { useAuth } from '../context/AuthContext'
import { longDate, zoneFor } from '../lib/time'
import { displayName } from '../lib/format'

function LikeButton({ liked, count, onClick, busy }) {
  const [bursts, setBursts] = useState([])
  const handle = () => {
    if (!liked) setBursts(b => [...b, Date.now()])
    onClick()
  }
  return (
    <button
      onClick={handle}
      disabled={busy}
      className={`relative inline-flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-400 ease-out ${
        liked ? 'border-crema-400 bg-crema-400/10 text-crema-300' : 'border-white/15 text-bone/80 hover:border-crema-400/60 hover:text-crema-300'
      }`}
    >
      <svg className={`w-5 h-5 transition-transform duration-500 ${liked ? 'scale-110' : ''}`} viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="tabular-nums">{count} {count === 1 ? 'like' : 'likes'}</span>
      {bursts.map(k => (
        <span key={k} className="burst" onAnimationEnd={() => setBursts(b => b.filter(x => x !== k))}>
          {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ '--a': `${i * 45}deg` }} />)}
        </span>
      ))}
    </button>
  )
}

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    client.get(`/posts/${id}/`)
      .then(res => { setPost(res.data); setLiked(!!res.data.is_liked); setLikes(res.data.likes_count ?? 0) })
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [id])

  // Reading progress bar.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLike = async () => {
    if (!user) { navigate('/login'); return }
    if (busy) return
    setBusy(true)
    try {
      const res = await client.post(`/posts/${id}/like/`)
      setLiked(res.data.liked); setLikes(res.data.likes_count)
    } catch { /* leave state as-is */ } finally { setBusy(false) }
  }

  if (loading) {
    return (
      <div className="pt-40 max-w-3xl mx-auto px-5 space-y-5">
        <div className="h-4 w-24 rounded shimmer" /><div className="h-16 w-4/5 rounded shimmer" /><div className="h-64 rounded-3xl shimmer" />
      </div>
    )
  }
  if (!post) {
    return <div className="pt-48 px-5 max-w-xl mx-auto"><Empty glyph="?" title="Story not found" action="Back to the board" to="/explore" /></div>
  }

  const tz = zoneFor(post.city)
  const words = post.body?.trim().split(/\s+/).length || 0
  const mins = Math.max(1, Math.round(words / 200))

  return (
    <article className="pt-36 pb-10">
      <div className="fixed top-0 inset-x-0 h-[2px] z-[60] bg-crema-400 origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} aria-hidden />

      <header className="max-w-4xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 tag">
            {post.city && (
              <Link to={`/cities/${post.city.id}`} className="text-crema-400 hover:text-crema-200 transition-colors normal-case tracking-normal text-sm">
                {post.city.name}, {post.city.country}
              </Link>
            )}
            {tz && <LiveClock timeZone={tz} seconds={false} className="text-[11px]" />}
            <span>{mins} min read</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl leading-[0.98] tracking-[-0.03em]">{post.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 flex items-center gap-4">
            <Avatar user={post.author} size="lg" />
            <div>
              <Link to={`/profile/${post.author?.id}`} className="font-medium hover:text-crema-300 transition-colors">
                {displayName(post.author)}
              </Link>
              <p className="tag mt-0.5">@{post.author?.username} · {longDate(post.created_at)}</p>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-16">
        <Reveal>
          <div className="dropcap font-display text-[1.35rem] sm:text-2xl leading-[1.6] text-bone/90 whitespace-pre-wrap">{post.body}</div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 pt-8 border-t hairline flex flex-wrap items-center justify-between gap-4">
            <LikeButton liked={liked} count={likes} onClick={toggleLike} busy={busy} />
            <button onClick={() => navigate(-1)} className="tag hover:text-bone transition-colors">← Back</button>
          </div>
        </Reveal>

        <CommentSection postId={post.id} />
      </div>
    </article>
  )
}
