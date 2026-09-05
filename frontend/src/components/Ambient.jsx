import { useEffect, useRef } from 'react'

// Slow-drifting colour orbs behind everything, nudged by the pointer so the
// whole page feels like it breathes with you. Plus the film grain overlay.
export default function Ambient() {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const orbs = el.querySelectorAll('.orb')
    const onMove = e => {
      const x = (e.clientX / window.innerWidth - 0.5)
      const y = (e.clientY / window.innerHeight - 0.5)
      orbs.forEach((o, i) => {
        const depth = (i + 1) * 30
        o.style.transform = `translate(${x * depth}px, ${y * depth}px)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={wrap} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,32,48,0.9),#0b0e14_60%)]" />
        <div className="orb w-[52vw] h-[52vw] -top-[18vw] -left-[12vw] bg-crema-500/25" />
        <div className="orb w-[40vw] h-[40vw] top-[30vh] -right-[14vw] bg-mist/15" />
        <div className="orb w-[36vw] h-[36vw] -bottom-[16vw] left-[28vw] bg-[#7a5cff]/12" />
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>
      <div className="grain" aria-hidden />
    </>
  )
}
