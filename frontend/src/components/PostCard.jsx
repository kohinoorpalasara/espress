import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

function AuthorAvatar({ username, size = 'sm' }) {
  const colors = [
    'bg-rose-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-amber-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  ]
  const color = colors[(username?.charCodeAt(0) || 0) % colors.length]
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base'

  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {username?.[0]?.toUpperCase() || '?'}
    </div>
  )
}

export default function PostCard({ post }) {
  const preview = post.body?.length > 150 ? post.body.slice(0, 150) + '...' : post.body

  return (
    <Link
      to={`/posts/${post.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-amber-200 p-5"
    >
      {post.city && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {post.city.name}, {post.city.country}
          </span>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug mb-3">
        {post.title}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <AuthorAvatar username={post.author?.username} />
        <span className="text-sm text-gray-600 font-medium">{post.author?.username}</span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-4">{preview}</p>

      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {post.likes_count}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comment_count}
          </span>
        </div>
        <span>
          {post.created_at
            ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
            : ''}
        </span>
      </div>
    </Link>
  )
}
