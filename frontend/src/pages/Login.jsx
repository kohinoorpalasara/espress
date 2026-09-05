import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthShell from '../components/AuthShell'
import Button from '../components/Button'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault(); setError(''); setBusy(true)
    try { await login(form.username, form.password); navigate('/explore') }
    catch { setError("That didn't match. Check your username and password.") }
    finally { setBusy(false) }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title={<>Pick up where you <span className="display-italic text-crema-400">left off</span></>}
      footer={<>New here? <Link to="/register" className="text-crema-400 hover:text-crema-200 transition-colors" data-cursor="Join">Create an account</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 text-red-200 px-4 py-3 text-sm">{error}</div>}
        <div className="field">
          <input name="username" value={form.username} onChange={set} placeholder=" " required autoComplete="username" />
          <label>Username</label>
        </div>
        <div className="field">
          <input type="password" name="password" value={form.password} onChange={set} placeholder=" " required autoComplete="current-password" />
          <label>Password</label>
        </div>
        <div className="pt-2">
          <Button type="submit" size="lg" disabled={busy} className="w-full" cursor="Sign in" flip={false}>{busy ? 'Signing in…' : 'Sign in'}</Button>
        </div>
      </form>
    </AuthShell>
  )
}
