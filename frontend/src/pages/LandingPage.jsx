import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import CityCard from '../components/CityCard'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import LiveClock from '../components/LiveClock'
import { zoneFor, localHour, moodFor } from '../lib/time'

const WORDS = ['changes you.', 'slows you down.', 'wakes you up.', 'stays with you.']

const FALLBACK = [
  { id: 'p', name: 'Paris', country: 'France', continent: 'EU', post_count: 0 },
  { id: 't', name: 'Tokyo', country: 'Japan', continent: 'AS', post_count: 0 },
  { id: 'n', name: 'New York', country: 'USA', continent: 'NA', post_count: 0 },
  { id: 's', name: 'Sydney', country: 'Australia', continent: 'OC', post_count: 0 },
]

function Rotator({ words, interval = 2800 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return (
    <span className="rotator display-italic text-crema-400">
      <span key={i}>{words[i]}</span>
    </span>
  )
}

function Board({ cities }) {
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick(t => t + 1), 30000); return () => clearInterval(id) }, [])
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1.4fr_1fr_1fr_1.2fr_.6fr_.4fr] gap-4 px-6 py-3 border-b hairline tag">
        <span>Destination</span><span>Country</span><span>Local time</span><span>Right now</span><span className="text-right">Stories</span><span />
      </div>
      <ul>
        {cities.map((c, i) => {
          const tz = zoneFor(c)
          const mood = tz ? moodFor(localHour(tz)) : null
          return (
            <li key={c.id}>
              <Link
                to={typeof c.id === 'number' ? `/cities/${c.id}` : '/explore'}
                className="board-row grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_1fr_1.2fr_.6fr_.4fr] gap-x-4 gap-y-1 items-center px-6 py-4 border-b hairline last:border-b-0"
                data-cursor="Board"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="font-display text-2xl tracking-tight">{c.name}</span>
                <span className="text-muted text-sm text-right sm:text-left">{c.country}</span>
                <span className="text-sm">{tz && <LiveClock timeZone={tz} seconds={false} />}</span>
                <span className="text-sm text-bone/70 text-right sm:text-left">{mood && <>{mood.icon} {mood.label}</>}</span>
                <span className="hidden sm:block text-right text-muted text-sm tabular-nums">{c.post_count}</span>
                <span className="hidden sm:block go text-crema-400 text-right">→</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function LandingPage() {
  const [cities, setCities] = useState([])
  const [spot, setSpot] = useState(0)

  useEffect(() => {
    client.get('/cities/').then(res => setCities(res.data)).catch(() => {})
  }, [])

  const list = cities.length ? cities : FALLBACK
  useEffect(() => {
    const id = setInterval(() => setSpot(s => (s + 1) % list.length), 4000)
    return () => clearInterval(id)
  }, [list.length])

  const spotlight = list[spot % list.length]
  const spotTz = zoneFor(spotlight)
  const spotMood = spotTz ? moodFor(localHour(spotTz)) : null
  const featured = useMemo(() => cities.slice(0, 4), [cities])
  const totalStories = cities.reduce((n, c) => n + (c.post_count || 0), 0)

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end pb-20 pt-40 px-5 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <Reveal><span className="eyebrow">Departures · every day · {list.length} cities</span></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[13vw] sm:text-[9vw] lg:text-[7.2vw] leading-[0.92] tracking-[-0.03em] max-w-6xl">
              Go somewhere<br />that <Rotator words={WORDS} />
            </h1>
          </Reveal>
          <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
            <Reveal delay={200} className="lg:col-span-6">
              <p className="text-lg sm:text-xl text-bone/70 leading-relaxed max-w-xl">
                A travel community built on what it actually felt like — written by people who were just there,
                with the local time still ticking under every city.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/explore" size="lg" cursor="Explore">Explore cities</Button>
                <Button to="/register" size="lg" variant="ghost" cursor="Join">Join the community</Button>
              </div>
            </Reveal>
            <Reveal delay={320} className="lg:col-span-6 lg:justify-self-end">
              <div key={spotlight?.id} className="glass rounded-3xl px-6 py-5 min-w-[280px] page">
                <div className="tag mb-2">Right now in</div>
                <div className="font-display text-4xl tracking-tight">{spotlight?.name}</div>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  {spotTz && <LiveClock timeZone={spotTz} className="text-crema-300" />}
                  {spotMood && <span className="text-muted">{spotMood.icon} {spotMood.label}</span>}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 tag">
          <span className="w-10 h-px bg-white/20" /> scroll
        </div>
      </section>

      {/* Ticker */}
      <Marquee speed={45} className="border-y hairline py-4">
        {list.map(c => (
          <span key={c.id} className="flex items-center gap-4 px-8 whitespace-nowrap">
            <span className="font-display text-2xl">{c.name}</span>
            <LiveClock timeZone={zoneFor(c)} seconds={false} className="text-xs text-muted" />
            <span className="text-crema-400/60">✦</span>
          </span>
        ))}
      </Marquee>

      {/* Board */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <Reveal>
            <span className="eyebrow">The board</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">What time is it <span className="display-italic">there</span>?</h2>
          </Reveal>
          <Reveal delay={120}><p className="text-muted max-w-sm">Every city carries its own clock. Hover a row and go.</p></Reveal>
        </div>
        <Reveal delay={100}><Board cities={list.slice(0, 8)} /></Reveal>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-32">
          <div className="flex items-end justify-between mb-10">
            <Reveal>
              <span className="eyebrow">Featured</span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">Where people are <span className="display-italic">writing from</span></h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/explore" className="hidden sm:inline-flex items-center gap-2 text-sm text-crema-400 hover:gap-3 transition-all" data-cursor="All">
                All cities <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}><CityCard city={c} index={i} /></Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Manifesto */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-36">
        <Reveal>
          <p className="font-display text-3xl sm:text-5xl leading-[1.15] tracking-tight text-bone/90">
            Guidebooks tell you where. <span className="display-italic text-crema-400">Espress</span> tells you what it was like
            at 11pm when the rain started and the café stayed open anyway.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
            {[[cities.length || '—', 'cities'], [totalStories || '—', 'stories'], ['24/7', 'live clocks']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl sm:text-5xl text-crema-400 tabular-nums">{n}</div>
                <div className="tag mt-1">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* How */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-36">
        <Reveal><span className="eyebrow">How it works</span></Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            ['01', 'Pick a city', 'Browse by continent, search by name, or just follow the clock that reads golden hour.'],
            ['02', 'Read what it felt like', 'Short, honest stories from people who were just there. No listicles.'],
            ['03', 'Leave yours', 'Write while it still feels like something. Thirty seconds after you land is fine.'],
          ].map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="glass rounded-3xl p-8 h-full group hover:-translate-y-1 transition-transform duration-500 ease-out" data-cursor="✦">
                <div className="font-mono text-crema-400 text-sm">{n}</div>
                <h3 className="mt-6 font-display text-3xl tracking-tight">{t}</h3>
                <p className="mt-3 text-bone/65 leading-relaxed">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-36">
        <Reveal>
          <div className="relative rounded-[2.5rem] overflow-hidden px-8 py-20 sm:px-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-crema-500 via-crema-400 to-crema-200" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.5),transparent_40%)]" />
            <div className="relative text-ink-900">
              <div className="font-mono text-xs uppercase tracking-tag opacity-70">Boarding now</div>
              <h2 className="mt-4 font-display text-5xl sm:text-7xl tracking-tight leading-none">Ready when <span className="display-italic">you</span> are.</h2>
              <div className="mt-10 inline-flex">
                <Link to="/register" className="btn bg-ink-900 text-bone px-8 py-4 text-base hover:bg-ink-800 transition-colors" data-cursor="Join">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
