import { useEffect, useState } from 'react'
import { localHour, moodFor } from '../lib/time'

// Ticks once a second in the given IANA time zone. `mood` adds the
// what's-happening-there line; `seconds` shows :ss.
export default function LiveClock({ timeZone, mood = false, seconds = true, className = '' }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeZone) return null
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', ...(seconds ? { second: '2-digit' } : {}), hour12: false, timeZone,
  }).format(now)
  const m = moodFor(localHour(timeZone, now))

  return (
    <span className={`inline-flex items-center gap-2 font-mono tabular-nums ${className}`}>
      <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-mist text-mist" aria-hidden />
      <span>{time}</span>
      {mood && <span className="text-muted">· {m.icon} {m.label}</span>}
    </span>
  )
}
