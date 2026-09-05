import { Link } from 'react-router-dom'
import Tilt from './Tilt'
import LiveClock from './LiveClock'
import { zoneFor } from '../lib/time'
import { CONTINENTS, FALLBACK_IMG } from '../lib/format'

export default function CityCard({ city, index = 0 }) {
  const tz = zoneFor(city)
  return (
    <Link to={`/cities/${city.id}`} className="block group" data-cursor="Explore">
      <Tilt className="rounded-3xl overflow-hidden aspect-[4/5] bg-ink-800 shadow-card">
        <img
          src={city.image_url || FALLBACK_IMG}
          alt={city.name}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="parallax absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="tag px-2.5 py-1 rounded-full glass text-bone/80">{CONTINENTS[city.continent] || city.continent}</span>
          {tz && <LiveClock timeZone={tz} seconds={false} className="text-[11px] px-2.5 py-1 rounded-full glass text-bone/90" />}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5" style={{ transform: 'translateZ(30px)' }}>
          <div className="tag mb-1 text-crema-300/90">{city.country}</div>
          <h3 className="font-display text-3xl leading-none tracking-tight">{city.name}</h3>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-bone/70">{city.post_count} {city.post_count === 1 ? 'story' : 'stories'}</span>
            <span className="inline-flex items-center gap-1 text-crema-400 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              Read <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Tilt>
    </Link>
  )
}
