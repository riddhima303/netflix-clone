import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ movie, variant = 'poster' }) {
  if (!movie) return null
  const title = movie.title || movie.name || 'Untitled'
  const year = movie.year || movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)
  const posterSrc = movie.posterUrl || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '')

  if (!posterSrc) return null

  return (
    <Link to={`/movie/${movie.id}`} className={`card card--${variant}`} aria-label={title}>
      <div className="card__media">
        <img
          className="card__img"
          src={posterSrc}
          alt={title}
          loading="lazy"
          draggable="false"
        />
        <div className="card__glow" aria-hidden="true" />
      </div>
      <div className="card__meta" aria-hidden="true">
        <div className="card__title">{title}</div>
        <div className="card__sub">
          <span>{year || 'N/A'}</span>
          <span className="dot">•</span>
          <span>{movie.maturityRating || '13+'}</span>
        </div>
      </div>
    </Link>
  )
}

