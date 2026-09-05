import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'
import FlipText from './FlipText'

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

// Magnetic, shine-on-hover button. Renders a <Link> when `to` is given.
export default function Button({
  to, href, onClick, children, variant = 'primary', size = 'md', cursor,
  className = '', flip = true, type = 'button', disabled, ...rest
}) {
  const cls = `btn btn-${variant} ${SIZES[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`
  const inner = flip ? <FlipText>{children}</FlipText> : children
  const cursorLabel = cursor ?? (variant === 'primary' ? 'Go' : 'Open')

  let node
  if (to) node = <Link to={to} className={cls} data-cursor={cursorLabel} {...rest}>{inner}</Link>
  else if (href) node = <a href={href} className={cls} data-cursor={cursorLabel} {...rest}>{inner}</a>
  else node = <button type={type} onClick={onClick} disabled={disabled} className={cls} data-cursor={cursorLabel} {...rest}>{inner}</button>

  return <Magnetic strength={0.25}>{node}</Magnetic>
}
