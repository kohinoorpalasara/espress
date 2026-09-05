import { useEffect, useMemo, useState } from 'react'
import client from '../api/client'
import CityCard from '../components/CityCard'
import Reveal from '../components/Reveal'
import Empty from '../components/Empty'

const FILTERS = [
  { key: 'ALL', label: 'Everywhere', codes: null },
  { key: 'EU', label: 'Europe', codes: ['EU'] },
  { key: 'AS', label: 'Asia', codes: ['AS'] },
  { key: 'AM', label: 'Americas', codes: ['NA', 'SA'] },
  { key: 'AF', label: 'Africa', codes: ['AF'] },
  { key: 'OC', label: 'Oceania', codes: ['OC'] },
]

export default function CityExplorer() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    client.get('/cities/').then(res => setCities(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const counts = useMemo(() => Object.fromEntries(
    FILTERS.map(f => [f.key, f.codes ? cities.filter(c => f.codes.includes(c.continent)).length : cities.length])
  ), [cities])

  const filtered = cities.filter(c => {
    const s = q.trim().toLowerCase()
    const hit = !s || c.name.toLowerCase().includes(s) || c.country.toLowerCase().includes(s)
    const f = FILTERS.find(x => x.key === filter)
    return hit && (!f?.codes || f.codes.includes(c.continent))
  })

  return (
    <div className="pt-36 pb-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal><span className="eyebrow">Explore</span></Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 font-display text-6xl sm:text-8xl tracking-[-0.03em] leading-[0.9]">
            Pick a <span className="display-italic text-crema-400">city</span>
          </h1>
        </Reveal>

        {/* Search */}
        <Reveal delay={140}>
          <div className="mt-12 relative max-w-2xl group">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search a city or country"
              className="w-full bg-transparent border-b border-white/15 focus:border-crema-400 py-4 pr-12 text-2xl sm:text-3xl font-display placeholder:text-muted/60 outline-none transition-colors"
              aria-label="Search cities"
            />
            <span className="absolute right-0 bottom-5 text-muted group-focus-within:text-crema-400 transition-colors" aria-hidden>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map(f => {
              const on = filter === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  data-cursor="Filter"
                  className={`group px-4 py-2 rounded-full text-sm border transition-all duration-400 ease-out ${
                    on ? 'bg-crema-400 text-ink-900 border-crema-400' : 'border-white/10 text-bone/80 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 font-mono text-[11px] ${on ? 'text-ink-900/60' : 'text-muted'}`}>{counts[f.key] ?? 0}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-14">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-3xl shimmer" />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty glyph="◌" title="Nothing on the board" body="No city matches that. Try a country, or clear the filter." />
          ) : (
            <>
              <p className="tag mb-6">{filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filtered.map((c, i) => (
                  <Reveal key={c.id} delay={(i % 4) * 70}><CityCard city={c} index={i} /></Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
