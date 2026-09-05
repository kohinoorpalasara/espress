// Infinite horizontal ticker. Content is rendered twice so the loop is
// seamless; pauses on hover.
export default function Marquee({ children, speed = 40, className = '' }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ '--speed': `${speed}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
