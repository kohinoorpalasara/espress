import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Empty from '../components/Empty'
import LiveClock from '../components/LiveClock'
import Gallery from '../components/Gallery'
import { scenesFor } from '../lib/scenes'
import { zoneFor, localHour, moodFor } from '../lib/time'
import { CONTINENTS, FALLBACK_IMG } from '../lib/format'
import { useAuth } from '../context/AuthContext'

export default function CityDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [city, setCity] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const heroImg = useRef(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([client.get(`/cities/${id}/`), client.get(`/posts/?city=${id}`)])
      .then(([c, p]) => { setCity(c.data); setPosts(p.data) })
      .catch(() => setCity(null))
      .finally(() => setLoading(false))
  }, [id])

  // Parallax the hero image against scroll.
  useEffect(() => {
    const onScroll = () => {
      if (heroImg.current) heroImg.current.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.1)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) {
    return (
      <div className="pt-24">
        <div className="h-[70vh] shimmer" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 space-y-4">
          <div className="h-6 w-1/3 rounded shimmer" /><div className="h-4 w-2/3 rounded shimmer" />
        </div>
      </div>
    )
  }
  if (!city) {
    return (
      <div className="pt-48 px-5 max-w-xl mx-auto">
        <Empty glyph="?" title="No such city" body="It may have been removed, or the link is off." action="Back to the board" to="/explore" />
      </div>
    )
  }

  const tz = zoneFor(city)
  const mood = tz ? moodFor(localHour(tz)) : null
  const writeTo = user ? `/create-post?city=${id}` : '/login'

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden">
        <img ref={heroImg} src={city.image_url || FALLBACK_IMG} alt={city.name} className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 pb-14 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <Link to="/explore" className="inline-flex items-center gap-2 tag hover:text-bone transition-colors">
                <span aria-hidden>←</span> {CONTINENTS[city.continent] || 'Explore'}
              </Link>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-[16vw] sm:text-[11vw] lg:text-[9vw] leading-[0.85] tracking-[-0.04em]">{city.name}</h1>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="text-xl text-crema-300">{city.country}</span>
                {tz && <LiveClock timeZone={tz} className="text-lg" />}
                {mood && <span className="text-bone/70">{mood.icon} {mood.label} there</span>}
                <span className="tag">{posts.length} {posts.length === 1 ? 'story' : 'stories'}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Streets & plates */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow">Streets &amp; plates</span>
              <h2 className="mt-3 font-display text-4xl tracking-tight">Walk it, then <span className="display-italic">eat</span></h2>
            </div>
            <p className="text-muted max-w-sm text-sm">What {city.name} looks like at street level, and what to order when you sit down.</p>
          </div>
        </Reveal>
        <Reveal delay={100}><Gallery scenes={scenesFor(city)} /></Reveal>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8">
            <Reveal>
              <p className="font-display text-2xl sm:text-3xl leading-snug text-bone/90">{city.description}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="glass rounded-3xl p-6">
                <div className="tag mb-3">Been here?</div>
                <p className="text-bone/70 mb-6">Write it down while it still feels like something.</p>
                <Button to={writeTo} className="w-full">Share your story</Button>
              </div>
            </Reveal>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <Reveal>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display text-4xl tracking-tight">Stories from <span className="display-italic">{city.name}</span></h2>
            </div>
          </Reveal>
          {posts.length === 0 ? (
            <Reveal><Empty glyph="✎" title="No stories yet" body={`Be the first to write about ${city.name}.`} action="Write the first one" to={writeTo} /></Reveal>
          ) : (
            <div className="grid gap-5">
              {posts.map((p, i) => <Reveal key={p.id} delay={i * 60}><PostCard post={p} showCity={false} /></Reveal>)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
