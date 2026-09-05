// Departures-board text roll: on hover the label slides up and a gold copy
// slides in from below. Triggered by hovering the FlipText itself or any
// ancestor <a>/<button>.
export default function FlipText({ children, className = '' }) {
  return (
    <span className={`flip ${className}`}>
      <span className="flip-inner">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  )
}
