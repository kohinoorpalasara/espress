import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function CreatePost() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedCity = searchParams.get('city')

  const [cities, setCities] = useState([])
  const [cityId, setCityId] = useState(preselectedCity || '')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    client.get('/cities/')
      .then((res) => setCities(res.data))
      .catch(() => {})
  }, [])

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cityId || !title.trim() || !body.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await client.post('/posts/', { city_id: parseInt(cityId), title, body })
      navigate(`/posts/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Share Your Story</h1>
        <p className="text-gray-500 mt-2">Tell the community about your travel experience</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="">Select a city...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a compelling title..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Story *</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your experience, tips, hidden gems, and memories..."
            rows={10}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-xs text-gray-400 mt-1">{body.length} characters</p>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            {submitting ? 'Publishing...' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3.5 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
