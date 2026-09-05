import axios from 'axios'

// Vite inlines this at build time, so the deployed image is built with the
// backend's Cloud Run URL (see the frontend build step in cloudbuild.yaml).
// Falls back to the local dev server.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const client = axios.create({ baseURL })

client.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default client
