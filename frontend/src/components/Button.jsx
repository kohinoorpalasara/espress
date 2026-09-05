import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

// Calm, magnetic button. Renders a <Link> when `to` is given.
export default function Button({
  to, href, onClick, children, variant = 'primary', size = 'md',
  className = '', type = 'button', disabled, flip, cursor, ...rest
}) {
  const cls = `btn btn-${variant} ${SIZES[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`
  const inner = <span className="relative z-10">{children}</span>

  let node
  if (to) node = <Link to={to} className={cls} {...rest}>{inner}</Link>
  else if (href) node = <a href={href} className={cls} {...rest}>{inner}</a>
  else node = <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{inner}</button>

  return <Magnetic strength={0.18}>{node}</Magnetic>
}
