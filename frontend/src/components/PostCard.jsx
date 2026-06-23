import { Link } from 'react-router-dom'

function timeAgo(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`
  return `${Math.floor(diff / 31536000)}y ago`
}

function getInitials(user) {
  if (!user) return '?'
  const first = user.first_name?.[0] || ''
  const last = user.last_name?.[0] || ''
  return (first + last).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
}

const AVATAR_COLORS = [
  'bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400',
  'bg-pink-400', 'bg-yellow-400', 'bg-teal-400', 'bg-red-400',
]

function getAvatarColor(username) {
  if (!username) return AVATAR_COLORS[0]
  let hash = 0
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function PostCard({ post }) {
  const initials = getInitials(post.author)
  const avatarColor = getAvatarColor(post.author?.username)
  const excerpt = post.body?.length > 150 ? post.body.slice(0, 150) + '...' : post.body

  return (
    <Link to={`/posts/${post.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">@{post.author?.username}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.created_at)}</p>
          </div>
          {post.city && (
            <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
              {post.city.name}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {post.likes_count ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comments_count ?? 0}
          </span>
        </div>
      </div>
    </Link>
  )
}
