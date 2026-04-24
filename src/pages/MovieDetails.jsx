import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Row from '../components/Row.jsx'
import Footer from '../components/Footer.jsx'
import { getMovieById, getMoviesByIds, rows } from '../data/movies.js'
import './MovieDetails.css'

export default function MovieDetails() {
  const { movieId } = useParams()
  const movie = getMovieById(movieId)

  const similar = (() => {
    const allIds = rows.flatMap((r) => r.movieIds)
    const unique = Array.from(new Set(allIds)).filter((id) => String(id) !== String(movieId))
    return getMoviesByIds(unique).slice(0, 10)
  })()

  if (!movie) {
    return (
      <div className="details details--missing">
        <Navbar />
        <main className="container details__missing">
          <h1 className="details__missingTitle">Movie not found</h1>
          <p className="details__missingDesc">
            This is mock data UI. Pick a title from the home page.
          </p>
          <Link to="/" className="details__backLink">
            ← Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="details">
      <Navbar />

      <main>
        <section className="detailsHero">
          <div
            className="detailsHero__bg"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
            aria-hidden="true"
          />
          <div className="detailsHero__overlay" aria-hidden="true" />

          <div className="detailsHero__content container">
            <h1 className="detailsHero__title">{movie.title}</h1>

            <div className="detailsHero__meta">
              <span className="pill">{movie.maturityRating}</span>
              <span className="dot">•</span>
              <span>{movie.year}</span>
              <span className="dot">•</span>
              <span>{movie.duration}</span>
            </div>

            <p className="detailsHero__desc">{movie.overview}</p>

            <div className="detailsHero__genres">
              {movie.genres.map((g) => (
                <span className="genre" key={g}>
                  {g}
                </span>
              ))}
            </div>

            <div className="detailsHero__actions">
              <button type="button" className="btn btn--play" aria-label="Play (UI only)">
                <span aria-hidden="true">▶</span>
                Play
              </button>
              <Link to="/" className="btn btn--info">
                Browse more
              </Link>
            </div>
          </div>

          <div className="detailsHero__bottomFade" aria-hidden="true" />
        </section>

        <section className="details__rows">
          <Row title="More Like This" movies={similar} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

