import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ movie, variant = 'poster' }) {
  if (!movie) return null

  return (
    <Link to={`/movie/${movie.id}`} className={`card card--${variant}`} aria-label={movie.title}>
      <div className="card__media">
        <img
          className="card__img"
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          draggable="false"
        />
        <div className="card__glow" aria-hidden="true" />
      </div>
      <div className="card__meta" aria-hidden="true">
        <div className="card__title">{movie.title}</div>
        <div className="card__sub">
          <span>{movie.year}</span>
          <span className="dot">•</span>
          <span>{movie.maturityRating}</span>
        </div>
      </div>
    </Link>
  )
}

