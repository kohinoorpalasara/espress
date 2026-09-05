import { useEffect, useRef, useState } from 'react'

// A two-part cursor: a dot that sits exactly under the pointer, and a ring
// that lags behind it. Over anything with [data-cursor="Label"] the ring
// swells into a filled disc carrying the label; over text inputs it thins
// into a caret. Disabled on touch devices and for reduced-motion users.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [mode, setMode] = useState('')

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    if (!fine || !motion) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const pos = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let raf
    let visible = false

    const move = e => {
      pos.x = e.clientX; pos.y = e.clientY
      if (!visible) { visible = true; lag.x = pos.x; lag.y = pos.y }
      dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
    }
    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18
      lag.y += (pos.y - lag.y) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${lag.x}px, ${lag.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = e => {
      const t = e.target.closest?.('[data-cursor]')
      if (t) { setLabel(t.dataset.cursor); setMode('hover'); return }
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') { setMode('text'); setLabel(''); return }
      setMode(''); setLabel('')
    }
    const leave = () => setMode('hidden')
    const enter = () => setMode('')

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className={`cursor-ring ${mode ? `is-${mode}` : ''}`} aria-hidden>
        <span className="cursor-label">{label}</span>
      </div>
    </>
  )
}
