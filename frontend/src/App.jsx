import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
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
