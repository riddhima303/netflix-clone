import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import Row from '../components/Row.jsx'
import Footer from '../components/Footer.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMoviesByIds, movies, rows } from '../data/movies.js'
import MovieCard from '../components/MovieCard.jsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import './Home.css'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const heroMovie = movies[0]
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeResultIndex, setActiveResultIndex] = useState(0)
  const activeResultRef = useRef(null)

  useEffect(() => {
    setSearchQuery('')
  }, [location.pathname])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 250)

    return () => window.clearTimeout(handle)
  }, [searchQuery])

  const filteredMovies = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return []
    return movies.filter((m) => m.title.toLowerCase().includes(q))
  }, [debouncedQuery])

  const isSearching = searchQuery.trim().length > 0
  const isSearchLoading = isSearching && searchQuery !== debouncedQuery
  const highlightQuery = debouncedQuery.trim()

  useEffect(() => {
    setActiveResultIndex(0)
  }, [debouncedQuery])

  useEffect(() => {
    if (!isSearching || isSearchLoading || filteredMovies.length === 0) return

    const onKeyDown = (e) => {
      const tag = e.target?.tagName
      const isTypingTarget = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable
      const isSearchInput = e.target?.classList?.contains('navSearch__input')
      if (isTypingTarget && !isSearchInput) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveResultIndex((prev) => (prev + 1) % filteredMovies.length)
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveResultIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length)
      }

      if (e.key === 'Enter' && filteredMovies[activeResultIndex]) {
        e.preventDefault()
        navigate(`/movie/${filteredMovies[activeResultIndex].id}`)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeResultIndex, filteredMovies, isSearchLoading, isSearching, navigate])

  useEffect(() => {
    if (!isSearching || isSearchLoading || filteredMovies.length === 0) return
    activeResultRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    })
  }, [activeResultIndex, filteredMovies.length, isSearchLoading, isSearching])

  const renderHighlightedTitle = (title) => {
    if (!highlightQuery) return title

    const lowerTitle = title.toLowerCase()
    const lowerQuery = highlightQuery.toLowerCase()
    const index = lowerTitle.indexOf(lowerQuery)

    if (index === -1) return title

    const before = title.slice(0, index)
    const match = title.slice(index, index + highlightQuery.length)
    const after = title.slice(index + highlightQuery.length)

    return (
      <>
        {before}
        <mark className="searchResults__mark">{match}</mark>
        {after}
      </>
    )
  }

  return (
    <div className="home">
      <Navbar showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        {isSearching ? (
          <section className="searchResults container" aria-label="Search results">
            <div className="searchResults__head">
              <h2 className="searchResults__title">
                Search results for <span className="searchResults__query">“{searchQuery.trim()}”</span>
              </h2>
              <div className="searchResults__count">{filteredMovies.length} titles</div>
            </div>

            {isSearchLoading ? (
              <div className="searchResults__grid searchResults__grid--skeleton" role="status" aria-live="polite">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="searchResults__skeleton" />
                ))}
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="searchResults__empty">No results found</div>
            ) : (
              <div className="searchResults__grid" role="list">
                {filteredMovies.map((movie, idx) => (
                  <div
                    key={movie.id}
                    className={`searchResults__item ${activeResultIndex === idx ? 'isActive' : ''}`}
                    role="listitem"
                    ref={activeResultIndex === idx ? activeResultRef : null}
                  >
                    <MovieCard movie={movie} />
                    <p className="searchResults__movieTitle">{renderHighlightedTitle(movie.title)}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <Banner movie={heroMovie} />

            <section className="home__rows">
              {rows.map((r) => (
                <Row key={r.id} title={r.title} movies={getMoviesByIds(r.movieIds)} />
              ))}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

