import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Login from './pages/Login.jsx'
import Profiles from './pages/Profiles.jsx'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
