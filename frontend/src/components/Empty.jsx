import Button from './Button'

export default function Empty({ glyph = '◌', title, body, action, to }) {
  return (
    <div className="glass rounded-3xl px-8 py-16 text-center">
      <div className="font-display text-6xl text-crema-400/70 mb-4">{glyph}</div>
      <h3 className="font-display text-2xl tracking-tight">{title}</h3>
      {body && <p className="mt-2 text-muted max-w-sm mx-auto">{body}</p>}
      {action && to && <div className="mt-8"><Button to={to}>{action}</Button></div>}
    </div>
  )
}
