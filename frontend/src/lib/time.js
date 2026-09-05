// Local-time helpers so every city on the site carries a live clock.

const CITY_TZ = {
  'Paris': 'Europe/Paris', 'Rome': 'Europe/Rome', 'London': 'Europe/London', 'Lisbon': 'Europe/Lisbon',
  'Barcelona': 'Europe/Madrid', 'Madrid': 'Europe/Madrid', 'Amsterdam': 'Europe/Amsterdam', 'Berlin': 'Europe/Berlin',
  'Prague': 'Europe/Prague', 'Vienna': 'Europe/Vienna', 'Athens': 'Europe/Athens', 'Istanbul': 'Europe/Istanbul',
  'Tokyo': 'Asia/Tokyo', 'Kyoto': 'Asia/Tokyo', 'Osaka': 'Asia/Tokyo', 'Seoul': 'Asia/Seoul', 'Bangkok': 'Asia/Bangkok',
  'Bali': 'Asia/Makassar', 'Singapore': 'Asia/Singapore', 'Hong Kong': 'Asia/Hong_Kong', 'Hanoi': 'Asia/Ho_Chi_Minh',
  'Mumbai': 'Asia/Kolkata', 'Delhi': 'Asia/Kolkata', 'Dubai': 'Asia/Dubai', 'Kathmandu': 'Asia/Kathmandu',
  'New York': 'America/New_York', 'New York City': 'America/New_York', 'Los Angeles': 'America/Los_Angeles',
  'San Francisco': 'America/Los_Angeles', 'Chicago': 'America/Chicago', 'Vancouver': 'America/Vancouver',
  'Toronto': 'America/Toronto', 'Mexico City': 'America/Mexico_City', 'Havana': 'America/Havana',
  'Rio de Janeiro': 'America/Sao_Paulo', 'Buenos Aires': 'America/Argentina/Buenos_Aires', 'Lima': 'America/Lima',
  'Bogota': 'America/Bogota', 'Santiago': 'America/Santiago', 'Cusco': 'America/Lima',
  'Cape Town': 'Africa/Johannesburg', 'Marrakech': 'Africa/Casablanca', 'Cairo': 'Africa/Cairo',
  'Nairobi': 'Africa/Nairobi', 'Zanzibar': 'Africa/Dar_es_Salaam',
  'Sydney': 'Australia/Sydney', 'Melbourne': 'Australia/Melbourne', 'Auckland': 'Pacific/Auckland', 'Queenstown': 'Pacific/Auckland',
}

const CONTINENT_TZ = {
  EU: 'Europe/Paris', AS: 'Asia/Bangkok', NA: 'America/New_York',
  SA: 'America/Sao_Paulo', AF: 'Africa/Johannesburg', OC: 'Australia/Sydney',
}

export function zoneFor(city) {
  if (!city) return undefined
  return CITY_TZ[city.name] || CONTINENT_TZ[city.continent]
}

export function localHour(timeZone, date = new Date()) {
  const h = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone }).format(date)
  return parseInt(h, 10) % 24
}

// A short, human "what's happening there right now" line keyed off the hour.
export function moodFor(hour) {
  if (hour < 5) return { label: 'Deep night', icon: '☾' }
  if (hour < 7) return { label: 'First light', icon: '◐' }
  if (hour < 10) return { label: 'Morning coffee', icon: '☕' }
  if (hour < 12) return { label: 'Late morning', icon: '☀' }
  if (hour < 15) return { label: 'Midday', icon: '☀' }
  if (hour < 17) return { label: 'Afternoon', icon: '☀' }
  if (hour < 19) return { label: 'Golden hour', icon: '◑' }
  if (hour < 22) return { label: 'Night market', icon: '☾' }
  return { label: 'Late night', icon: '☾' }
}

export function timeAgo(dateString) {
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`
  return `${Math.floor(diff / 31536000)}y ago`
}

export function longDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
