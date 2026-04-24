import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Login from './pages/Login.jsx'
import Profiles from './pages/Profiles.jsx'
import PATHS from './routes/paths.js'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.movieDetails} element={<MovieDetails />} />
        <Route path={PATHS.login} element={<Login />} />
        <Route path={PATHS.profiles} element={<Profiles />} />
        <Route path="*" element={<Navigate to={PATHS.home} replace />} />
      </Routes>
    </div>
  )
}

export default App
