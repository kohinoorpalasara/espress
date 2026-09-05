import { Link } from 'react-router-dom'
import FlipText from './FlipText'
import LiveClock from './LiveClock'

const ZONES = [
  ['Tokyo', 'Asia/Tokyo'], ['Paris', 'Europe/Paris'], ['New York', 'America/New_York'],
  ['Sydney', 'Australia/Sydney'], ['Cape Town', 'Africa/Johannesburg'],
]

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t hairline">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-6xl md:text-7xl leading-none tracking-tight">
              Espress<span className="text-crema-400">.</span>
            </div>
            <p className="mt-5 text-muted max-w-sm leading-relaxed">
              Real stories from people who were just there. Written the night they got home, while it still felt like it.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Go</div>
            <ul className="space-y-3">
              {[['Explore cities', '/explore'], ['Write a story', '/create-post'], ['Join', '/register'], ['Sign in', '/login']].map(([l, to]) => (
                <li key={to}><Link to={to} className="text-bone/80 hover:text-bone" data-cursor="Go"><FlipText>{l}</FlipText></Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5">Right now</div>
            <ul className="space-y-2.5">
              {ZONES.map(([name, tz]) => (
                <li key={tz} className="flex items-center justify-between text-sm">
                  <span className="text-bone/80">{name}</span>
                  <LiveClock timeZone={tz} seconds={false} className="text-muted text-xs" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 tag">
          <span>© {new Date().getFullYear()} Espress · A travel community</span>
          <span>Departures every day</span>
        </div>
      </div>
    </footer>
  )
}
