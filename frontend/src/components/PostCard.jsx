import { Link } from 'react-router-dom'
import Tilt from './Tilt'
import Avatar from './Avatar'
import { timeAgo } from '../lib/time'

function Heart({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}
function Bubble({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

export default function PostCard({ post, showCity = true }) {
  const excerpt = post.body?.length > 180 ? post.body.slice(0, 180).trimEnd() + '…' : post.body
  return (
    <Link to={`/posts/${post.id}`} className="block group">
      <Tilt max={3} lift={-3} className="glass rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-5">
          <Avatar user={post.author} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{post.author?.username}</p>
            <p className="tag mt-0.5">{timeAgo(post.created_at)}</p>
          </div>
          {showCity && post.city && (
            <span className="tag px-2.5 py-1 rounded-full border hairline text-crema-300">{post.city.name}</span>
          )}
        </div>

        <h3 className="font-display text-2xl leading-tight tracking-tight clamp-2 group-hover:text-crema-100 transition-colors">
          {post.title}
        </h3>
        <p className="mt-3 text-bone/65 text-[15px] leading-relaxed clamp-3">{excerpt}</p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-5 text-muted text-sm">
            <span className="inline-flex items-center gap-1.5"><Heart className="w-4 h-4" />{post.likes_count ?? 0}</span>
            <span className="inline-flex items-center gap-1.5"><Bubble className="w-4 h-4" />{post.comment_count ?? 0}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-crema-400 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            Read <span aria-hidden>→</span>
          </span>
        </div>
      </Tilt>
    </Link>
  )
}
