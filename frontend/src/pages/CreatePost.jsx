import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Empty from '../components/Empty'
import Avatar from '../components/Avatar'
import LiveClock from '../components/LiveClock'
import { zoneFor } from '../lib/time'

export default function CreatePost() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [cities, setCities] = useState([])
  const [form, setForm] = useState({ city_id: params.get('city') || '', title: '', body: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => { client.get('/cities/').then(r => setCities(r.data)).catch(() => {}) }, [])

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const city = cities.find(c => String(c.id) === String(form.city_id))
  const words = form.body.trim() ? form.body.trim().split(/\s+/).length : 0

  const submit = async e => {
    e.preventDefault(); setError('')
    if (!form.city_id) return setError('Pick a city first.')
    if (!form.title.trim()) return setError('Give it a title.')
    if (!form.body.trim()) return setError('Write something — even a paragraph.')
    setBusy(true)
    try {
      const res = await client.post('/posts/', { city_id: Number(form.city_id), title: form.title, body: form.body })
      navigate(`/posts/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || "Couldn't publish. Try again?")
    } finally { setBusy(false) }
  }

  if (loading) return <div className="pt-48 px-5 max-w-2xl mx-auto"><div className="h-64 rounded-3xl shimmer" /></div>
  if (!user) {
    return <div className="pt-48 px-5 max-w-xl mx-auto"><Empty glyph="✎" title="Sign in to write" body="Stories are tied to the person who was there." action="Sign in" to="/login" /></div>
  }

  return (
    <div className="pt-36 pb-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Reveal><span className="eyebrow">New story</span></Reveal>
          <Reveal delay={60}><h1 className="mt-4 font-display text-5xl sm:text-7xl tracking-[-0.03em] leading-[0.95]">What was it <span className="display-italic text-crema-400">like</span>?</h1></Reveal>

          <Reveal delay={140}>
            <form onSubmit={submit} className="mt-12 space-y-5">
              {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 text-red-200 px-4 py-3 text-sm">{error}</div>}

              <div className="field">
                <select name="city_id" value={form.city_id} onChange={set} required>
                  <option value="">Choose…</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}, {c.country}</option>)}
                </select>
                <label>City</label>
              </div>

              <div className="field">
                <input name="title" value={form.title} onChange={set} placeholder=" " maxLength={200} required className="font-display text-2xl" />
                <label>Title</label>
              </div>

              <div className="field">
                <textarea name="body" value={form.body} onChange={set} placeholder=" " rows={12} required className="leading-relaxed" />
                <label>The story</label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="tag">{words} words · ~{Math.max(1, Math.round(words / 200))} min read</span>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                  <Button type="submit" disabled={busy} flip={false}>{busy ? 'Publishing…' : 'Publish'}</Button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Live preview */}
        <aside className="lg:col-span-5">
          <Reveal delay={220}>
            <div className="lg:sticky lg:top-32">
              <div className="tag mb-4">Live preview</div>
              <div className="glass rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Avatar user={user} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="tag mt-0.5">just now</p>
                  </div>
                  {city && <span className="tag px-2.5 py-1 rounded-full border hairline text-crema-300">{city.name}</span>}
                </div>
                <h3 className={`font-display text-2xl leading-tight tracking-tight ${form.title ? '' : 'text-muted/50'}`}>{form.title || 'Your title'}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed clamp-3 ${form.body ? 'text-bone/65' : 'text-muted/50'}`}>{form.body || 'The first lines of your story show up here.'}</p>
                {city && zoneFor(city) && (
                  <div className="mt-6 pt-5 border-t hairline flex items-center justify-between">
                    <span className="tag">Right now in {city.name}</span>
                    <LiveClock timeZone={zoneFor(city)} className="text-xs text-crema-300" />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
