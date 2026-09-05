import { useRef } from 'react'

// 3D tilt that follows the pointer, exposing --mx/--my for the spotlight and
// border glow layers (see .tilt in index.css). Children opt into pointer
// parallax with the .parallax class.
export default function Tilt({ children, className = '', max = 8, lift = -6, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = e => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    el.style.setProperty('--lift', `${lift}px`)
  }
  const onEnter = () => ref.current?.classList.add('is-active')
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('is-active')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--lift', '0px')
  }

  return (
    <Tag
      ref={ref}
      className={`tilt relative ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      <span className="spotlight" aria-hidden />
      <span className="border-glow" aria-hidden />
    </Tag>
  )
}
