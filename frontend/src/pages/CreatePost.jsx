import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function CreatePost() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [cities, setCities] = useState([])
  const [form, setForm] = useState({
    city_id: searchParams.get('city') || '',
    title: '',
    body: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    client.get('/cities/').then(res => setCities(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const cityParam = searchParams.get('city')
    if (cityParam) setForm(f => ({ ...f, city_id: cityParam }))
  }, [searchParams])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.city_id) { setError('Please select a city.'); return }
    if (!form.title.trim()) { setError('Please enter a title.'); return }
    if (!form.body.trim()) { setError('Please write some content.'); return }

    setSubmitting(true)
    try {
      const res = await client.post('/posts/', {
        city_id: parseInt(form.city_id),
        title: form.title,
        body: form.body,
      })
      navigate(`/posts/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" /></div>
  }

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✍️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to share</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to create a post.</p>
          <Link to="/login" className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Story</h1>
        <p className="text-gray-500 mb-8">Tell the community about your travel experience</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <select
              name="city_id"
              value={form.city_id}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
              required
            >
              <option value="">Select a city...</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your story a title"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              maxLength={200}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Story <span className="text-red-500">*</span>
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Share your experience, tips, and discoveries..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none min-h-48"
              required
              rows={8}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-full font-semibold transition-colors"
            >
              {submitting ? 'Publishing...' : 'Publish Story'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
