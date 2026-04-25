import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Banner.css'

export default function Banner({ movie, movies = [], onPlay }) {
  const slides = useMemo(() => {
    if (Array.isArray(movies) && movies.length > 0) return movies.filter(Boolean)
    return movie ? [movie] : []
  }, [movie, movies])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const activeMovie = slides[activeIndex]
  if (!activeMovie) return null

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="banner">
      <div
        className="banner__bg"
        style={{ backgroundImage: `url(${activeMovie.backdropUrl})` }}
        aria-hidden="true"
      />
      <div className="banner__vignette" aria-hidden="true" />

      {slides.length > 1 ? (
        <div className="banner__nav" aria-label="Featured titles carousel controls">
          <button type="button" className="banner__navBtn" onClick={goToPrev} aria-label="Previous featured title">
            ‹
          </button>
          <button type="button" className="banner__navBtn" onClick={goToNext} aria-label="Next featured title">
            ›
          </button>
        </div>
      ) : null}

      <div className="banner__content container">
        <div className="banner__badge" aria-hidden="true">
          N SERIES
        </div>

        <h1 className="banner__title">{activeMovie.title}</h1>

        <div className="banner__meta">
          <span className="banner__metaStrong">{activeMovie.maturityRating}</span>
          <span className="dot">•</span>
          <span>{activeMovie.year}</span>
          <span className="dot">•</span>
          <span>{activeMovie.duration}</span>
        </div>

        <p className="banner__desc">{activeMovie.overview}</p>

        <div className="banner__actions">
          <button
            type="button"
            className="btn btn--play"
            aria-label="Play trailer"
            onClick={() => onPlay?.(activeMovie)}
          >
            <span aria-hidden="true">▶</span>
            Play
          </button>
          <Link to={`/movie/${activeMovie.id}`} className="btn btn--info" aria-label="More info">
            <span aria-hidden="true">ℹ</span>
            More Info
          </Link>
        </div>

        {slides.length > 1 ? (
          <div className="banner__dots" role="tablist" aria-label="Featured title selector">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`banner__dot ${idx === activeIndex ? 'isActive' : ''}`}
                onClick={() => setActiveIndex(idx)}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Show ${slide.title}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="banner__bottomFade" aria-hidden="true" />
    </section>
  )
}

