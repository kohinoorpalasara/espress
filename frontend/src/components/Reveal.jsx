import { useEffect, useRef } from 'react'

// Fades and lifts its content in when it scrolls into view. `delay` is ms.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', once = true }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { el.classList.add('is-in'); if (once) io.unobserve(el) }
        else if (!once) el.classList.remove('is-in')
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [once])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </Tag>
  )
}
