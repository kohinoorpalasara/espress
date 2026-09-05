import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Ambient from './components/Ambient'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import CityExplorer from './pages/CityExplorer'
import CityDetail from './pages/CityDetail'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <AuthProvider>
      <Ambient />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Keyed on pathname so every route change replays the enter animation. */}
        <main key={pathname} className="flex-1 page">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<CityExplorer />} />
            <Route path="/cities/:id" element={<CityDetail />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
