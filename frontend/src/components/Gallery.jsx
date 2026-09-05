import { useState } from 'react'
import { STREET_FALLBACK, DISH_FALLBACK } from '../lib/scenes'

function Photo({ scene, tall }) {
  const [src, setSrc] = useState(scene.src)
  const fallback = scene.kind === 'dish' ? DISH_FALLBACK : STREET_FALLBACK
  return (
    <figure className={`photo group relative overflow-hidden rounded-2xl bg-ink-800 ${tall ? 'row-span-2' : ''}`}>
      <img
        src={src}
        alt={scene.title}
        loading="lazy"
        onError={() => src !== fallback && setSrc(fallback)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
      <span className={`absolute top-3 left-3 tag px-2.5 py-1 rounded-full glass ${scene.kind === 'dish' ? 'text-crema-300' : 'text-bone/80'}`}>
        {scene.kind === 'dish' ? 'On the plate' : 'On the street'}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        {scene.city && <div className="tag text-crema-300/90 mb-1">{scene.city}</div>}
        <div className="font-display text-xl leading-tight tracking-tight">{scene.title}</div>
        <p className="text-sm text-bone/70 mt-1 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden">
          {scene.note}
        </p>
      </figcaption>
    </figure>
  )
}

// Editorial photo grid: streets and dishes side by side. Every third item
// spans two rows so the grid reads like a magazine spread, not a table.
export default function Gallery({ scenes, className = '' }) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4 ${className}`}>
      {scenes.map((s, i) => <Photo key={`${s.src}-${i}`} scene={s} tall={i % 3 === 0} />)}
    </div>
  )
}
