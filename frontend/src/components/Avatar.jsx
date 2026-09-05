import { initials, avatarStyle } from '../lib/format'

const SIZES = { sm: 'w-8 h-8 text-[11px]', md: 'w-10 h-10 text-xs', lg: 'w-14 h-14 text-base', xl: 'w-24 h-24 text-2xl' }

export default function Avatar({ user, size = 'md', className = '' }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-full font-semibold text-white shrink-0 ring-1 ring-white/10 ${SIZES[size]} ${className}`}
      style={avatarStyle(user?.username)}
      aria-hidden
    >
      {initials(user)}
    </span>
  )
}
