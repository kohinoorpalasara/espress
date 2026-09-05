import { useRef } from 'react'

// Pulls its child toward the pointer while hovered, then springs back.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  const onMove = e => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onEnter = () => ref.current?.classList.add('is-active')
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('is-active')
    el.style.transform = ''
  }

  return (
    <span ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </span>
  )
}
