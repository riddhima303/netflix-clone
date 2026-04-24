import { Link } from 'react-router-dom'
import './Banner.css'

export default function Banner({ movie, onPlay }) {
  if (!movie) return null

  return (
    <section className="banner">
      <div
        className="banner__bg"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        aria-hidden="true"
      />
      <div className="banner__vignette" aria-hidden="true" />

      <div className="banner__content container">
        <div className="banner__badge" aria-hidden="true">
          N SERIES
        </div>

        <h1 className="banner__title">{movie.title}</h1>

        <div className="banner__meta">
          <span className="banner__metaStrong">{movie.maturityRating}</span>
          <span className="dot">•</span>
          <span>{movie.year}</span>
          <span className="dot">•</span>
          <span>{movie.duration}</span>
        </div>

        <p className="banner__desc">{movie.overview}</p>

        <div className="banner__actions">
          <button
            type="button"
            className="btn btn--play"
            aria-label="Play trailer"
            onClick={() => onPlay?.(movie)}
          >
            <span aria-hidden="true">▶</span>
            Play
          </button>
          <Link to={`/movie/${movie.id}`} className="btn btn--info" aria-label="More info">
            <span aria-hidden="true">ℹ</span>
            More Info
          </Link>
        </div>
      </div>

      <div className="banner__bottomFade" aria-hidden="true" />
    </section>
  )
}

