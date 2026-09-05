import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import Empty from '../components/Empty'
import { displayName } from '../lib/format'
import { useAuth } from '../context/AuthContext'

export default function UserProfile() {
  const { id } = useParams()
  const { user: me } = useAuth()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([client.get(`/users/${id}/`), client.get(`/posts/?user=${id}`)])
      .then(([u, p]) => { setUser(u.data); setPosts(p.data) })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-40 max-w-4xl mx-auto px-5 space-y-6">
        <div className="flex items-center gap-6"><div className="w-24 h-24 rounded-full shimmer" /><div className="space-y-3"><div className="h-8 w-56 rounded shimmer" /><div className="h-4 w-32 rounded shimmer" /></div></div>
      </div>
    )
  }
  if (!user) return <div className="pt-48 px-5 max-w-xl mx-auto"><Empty glyph="?" title="No such traveller" action="Back to the board" to="/explore" /></div>

  const profile = user.profile || {}
  const since = user.date_joined ? new Date(user.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : null
  const isMe = me?.id === user.id
  const cities = new Set(posts.map(p => p.city?.id).filter(Boolean)).size
  const likes = posts.reduce((n, p) => n + (p.likes_count || 0), 0)

  return (
    <div className="pt-36 pb-10 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <Avatar user={user} size="xl" className="ring-4 ring-crema-400/20" />
            <div className="flex-1">
              <div className="tag">{isMe ? 'This is you' : 'Traveller'}{since && ` · since ${since}`}</div>
              <h1 className="mt-2 font-display text-5xl sm:text-7xl tracking-[-0.03em] leading-[0.95]">{displayName(user)}</h1>
              <p className="mt-2 text-muted">@{user.username}{profile.location && <> · {profile.location}</>}</p>
            </div>
          </div>
        </Reveal>

        {profile.bio && <Reveal delay={80}><p className="mt-10 font-display text-2xl sm:text-3xl leading-snug text-bone/85 max-w-3xl">{profile.bio}</p></Reveal>}

        <Reveal delay={140}>
          <div className="mt-12 grid grid-cols-3 gap-5 max-w-xl">
            {[[posts.length, 'stories'], [cities, cities === 1 ? 'city' : 'cities'], [likes, 'likes']].map(([n, l]) => (
              <div key={l} className="glass rounded-2xl px-5 py-4">
                <div className="font-display text-3xl text-crema-400 tabular-nums">{n}</div>
                <div className="tag mt-1">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal><h2 className="font-display text-4xl tracking-tight mb-8">Stories by <span className="display-italic">{user.username}</span></h2></Reveal>
          {posts.length === 0 ? (
            <Reveal><Empty glyph="✎" title="Nothing written yet" body={isMe ? 'Your first story is one click away.' : 'Check back after their next trip.'} action={isMe ? 'Write one' : undefined} to={isMe ? '/create-post' : undefined} /></Reveal>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {posts.map((p, i) => <Reveal key={p.id} delay={(i % 2) * 80}><PostCard post={p} /></Reveal>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
