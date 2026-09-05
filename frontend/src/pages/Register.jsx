import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthShell from '../components/AuthShell'
import Button from '../components/Button'

export default function Register() {
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ first_name: '', last_name: '', username: '', email: '', password: '', password2: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const strength = Math.min(4, [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^\w]/.test(form.password)].filter(Boolean).length)

  const submit = async e => {
    e.preventDefault(); setError('')
    if (form.password !== form.password2) return setError("Passwords don't match.")
    if (form.password.length < 8) return setError('Use at least 8 characters.')
    setBusy(true)
    try {
      const { password2, ...payload } = form
      await register(payload)
      await login(form.username, form.password)
      navigate('/explore')
    } catch (err) {
      const data = err.response?.data
      setError(data ? Object.values(data).flat().join(' ') : "Couldn't create the account. Try again?")
    } finally { setBusy(false) }
  }

  return (
    <AuthShell
      eyebrow="Join Espress"
      title={<>Somewhere is <span className="display-italic text-crema-400">waiting</span></>}
      footer={<>Already have an account? <Link to="/login" className="text-crema-400 hover:text-crema-200 transition-colors" data-cursor="Sign in">Sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 text-red-200 px-4 py-3 text-sm">{error}</div>}
        <div className="grid grid-cols-2 gap-4">
          <div className="field"><input name="first_name" value={form.first_name} onChange={set} placeholder=" " autoComplete="given-name" /><label>First name</label></div>
          <div className="field"><input name="last_name" value={form.last_name} onChange={set} placeholder=" " autoComplete="family-name" /><label>Last name</label></div>
        </div>
        <div className="field"><input name="username" value={form.username} onChange={set} placeholder=" " required autoComplete="username" /><label>Username</label></div>
        <div className="field"><input type="email" name="email" value={form.email} onChange={set} placeholder=" " required autoComplete="email" /><label>Email</label></div>
        <div className="field">
          <input type="password" name="password" value={form.password} onChange={set} placeholder=" " required autoComplete="new-password" />
          <label>Password</label>
        </div>
        <div className="flex gap-1.5 px-1" aria-hidden>
          {[0, 1, 2, 3].map(i => <span key={i} className={`h-px flex-1 transition-colors duration-500 ${i < strength ? 'bg-crema-400' : 'bg-white/10'}`} />)}
        </div>
        <div className="field"><input type="password" name="password2" value={form.password2} onChange={set} placeholder=" " required autoComplete="new-password" /><label>Confirm password</label></div>
        <div className="pt-2">
          <Button type="submit" size="lg" disabled={busy} className="w-full" cursor="Join" flip={false}>{busy ? 'Creating…' : 'Create account'}</Button>
        </div>
      </form>
    </AuthShell>
  )
}
