import { useEffect, useState } from 'react'
import LiveClock from './LiveClock'
import Reveal from './Reveal'

const SCENES = [
  { city: 'Tokyo', tz: 'Asia/Tokyo', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80', line: 'The vending machine glowed like it was waiting for me.' },
  { city: 'Lisbon', tz: 'Europe/Lisbon', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80', line: 'Tram 28 was full, so I walked. Better.' },
  { city: 'Cape Town', tz: 'Africa/Johannesburg', img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=80', line: 'The mountain kept changing colour. I stopped taking photos.' },
  { city: 'New York', tz: 'America/New_York', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&q=80', line: 'Nobody looked up, and somehow that felt like a welcome.' },
]

// Split-screen shell shared by Login and Register: a slow slideshow of
// places with their live time on the left, the form on the right.
export default function AuthShell({ eyebrow, title, children, footer }) {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI(v => (v + 1) % SCENES.length), 6000); return () => clearInterval(id) }, [])
  const s = SCENES[i]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <aside className="relative hidden lg:block overflow-hidden">
        {SCENES.map((sc, k) => (
          <img key={sc.city} src={sc.img} alt="" className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1600ms] ease-out ${k === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/20" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <div key={i} className="page">
            <div className="tag mb-3">Right now in {s.city}</div>
            <LiveClock timeZone={s.tz} mood className="text-crema-300 text-lg" />
            <p className="mt-6 font-display text-3xl display-italic text-bone/90 max-w-md leading-snug">“{s.line}”</p>
          </div>
          <div className="mt-8 flex gap-1.5">
            {SCENES.map((_, k) => <span key={k} className={`h-px transition-all duration-700 ${k === i ? 'w-10 bg-crema-400' : 'w-4 bg-white/25'}`} />)}
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center px-5 sm:px-12 pt-32 pb-16">
        <div className="w-full max-w-md">
          <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
          <Reveal delay={60}><h1 className="mt-3 font-display text-5xl sm:text-6xl tracking-[-0.03em] leading-[0.95]">{title}</h1></Reveal>
          <Reveal delay={140}><div className="mt-10">{children}</div></Reveal>
          {footer && <Reveal delay={220}><div className="mt-8 text-sm text-muted">{footer}</div></Reveal>}
        </div>
      </main>
    </div>
  )
}
