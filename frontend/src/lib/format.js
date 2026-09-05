export function initials(user) {
  if (!user) return '?'
  const a = user.first_name?.[0] || ''
  const b = user.last_name?.[0] || ''
  return (a + b).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
}

const HUES = [28, 160, 200, 260, 320, 40, 90, 350]

// Deterministic warm/cool gradient per username so avatars stay stable.
export function avatarStyle(username = '') {
  let h = 0
  for (let i = 0; i < username.length; i++) h = username.charCodeAt(i) + ((h << 5) - h)
  const hue = HUES[Math.abs(h) % HUES.length]
  return {
    background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 40) % 360} 60% 35%))`,
  }
}

export function displayName(user) {
  if (!user) return ''
  return [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username
}

export const CONTINENTS = {
  EU: 'Europe', AS: 'Asia', NA: 'North America', SA: 'South America', AF: 'Africa', OC: 'Oceania',
}

export const FALLBACK_IMG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'
