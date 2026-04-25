import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import tmdbAxios from '../api/axios'
import requests, { searchMoviesRequest } from '../api/requests'
import { TMDB_API_KEY } from '../api/tmdb'
import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import Row from '../components/Row.jsx'
import Footer from '../components/Footer.jsx'
import { getMoviesByIds, movies, rows } from '../data/movies.js'
import MovieCard from '../components/MovieCard.jsx'
import './Home.css'

export default function Home() {
  const location = useLocation()
  const featuredMovies = movies.slice(0, 5)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeResultIndex, setActiveResultIndex] = useState(0)
  const [searchResults, setSearchResults] = useState([])
  const [isSearchFetching, setIsSearchFetching] = useState(false)
  const [playerMovie, setPlayerMovie] = useState(null)
  const [playerTrailerKey, setPlayerTrailerKey] = useState('')
  const [playerFallbackQuery, setPlayerFallbackQuery] = useState('')
  const [playerError, setPlayerError] = useState('')
  const [isPlayerLoading, setIsPlayerLoading] = useState(false)
  const activeResultRef = useRef(null)
  const rowRequestMap = {
    trending: requests.fetchTrending,
    top10: requests.fetchTopRated,
    action: requests.fetchActionMovies,
    drama: requests.fetchDocumentaries,
  }
  useEffect(() => {
    setSearchQuery('')
  }, [location.pathname])

  useEffect(() => {
    if (!playerMovie) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [playerMovie])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 250)

    return () => window.clearTimeout(handle)
  }, [searchQuery])
  const isSearching = searchQuery.trim().length > 0
  const isSearchLoading = isSearching && (searchQuery !== debouncedQuery || isSearchFetching)
  const highlightQuery = debouncedQuery.trim()

  useEffect(() => {
    setActiveResultIndex(0)
  }, [debouncedQuery])

  useEffect(() => {
    if (!isSearching || isSearchLoading || searchResults.length === 0) return

    const onKeyDown = (e) => {
      const tag = e.target?.tagName
      const isTypingTarget = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable
      const isSearchInput = e.target?.classList?.contains('navSearch__input')
      if (isTypingTarget && !isSearchInput) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveResultIndex((prev) => (prev + 1) % searchResults.length)
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveResultIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length)
      }

      if (e.key === 'Enter' && searchResults[activeResultIndex]) {
        e.preventDefault()
        openPlayer(searchResults[activeResultIndex])
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeResultIndex, isSearchLoading, isSearching, searchResults])

  useEffect(() => {
    if (!isSearching || isSearchLoading || searchResults.length === 0) return
    activeResultRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    })
  }, [activeResultIndex, isSearchLoading, isSearching, searchResults.length])

  const getDisplayTitle = (movie) => movie?.title || movie?.name || 'Untitled'

  const renderHighlightedTitle = (title) => {
    if (!title) return 'Untitled'
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

  const getMediaType = (movie) => {
    if (movie.media_type === 'tv' || movie.first_air_date) return 'tv'
    return 'movie'
  }

  const getTrailerKey = (videos) => {
    const results = videos || []
    const youtubeOnly = results.filter((v) => v.site === 'YouTube' && v.key)
    const preferred = youtubeOnly.find((v) => v.type === 'Trailer' && v.official) ||
      youtubeOnly.find((v) => v.type === 'Trailer') ||
      youtubeOnly.find((v) => v.type === 'Teaser') ||
      youtubeOnly[0]
    return preferred?.key || ''
  }

  const openPlayer = async (movie) => {
    if (!movie?.id) return

    setPlayerMovie(movie)
    setPlayerTrailerKey('')
    setPlayerFallbackQuery('')
    setPlayerError('')
    setIsPlayerLoading(true)

    const mediaType = getMediaType(movie)
    try {
      const primaryResponse = await tmdbAxios.get(
        `/${mediaType}/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      )
      let trailerKey = getTrailerKey(primaryResponse.data?.results)

      // Fallback for titles where default videos endpoint is empty
      if (!trailerKey) {
        const fallbackResponse = await tmdbAxios.get(
          `/${mediaType}/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        )
        trailerKey = getTrailerKey(fallbackResponse.data?.results)
      }

      if (!trailerKey) {
        const fallbackQuery = `${getDisplayTitle(movie)} trailer`
        setPlayerFallbackQuery(fallbackQuery)
        setPlayerError('Direct trailer not available. Playing closest match.')
      } else {
        setPlayerTrailerKey(trailerKey)
      }
    } catch {
      const fallbackQuery = `${getDisplayTitle(movie)} trailer`
      setPlayerFallbackQuery(fallbackQuery)
      setPlayerError('TMDB trailer lookup failed. Playing closest match.')
    } finally {
      setIsPlayerLoading(false)
    }
  }

  const closePlayer = () => {
    setPlayerMovie(null)
    setPlayerTrailerKey('')
    setPlayerFallbackQuery('')
    setPlayerError('')
    setIsPlayerLoading(false)
  }

  useEffect(() => {
    async function fetchSearchResults() {
      const trimmedQuery = debouncedQuery.trim()
      if (!trimmedQuery) {
        setSearchResults([])
        setIsSearchFetching(false)
        return
      }

      setIsSearchFetching(true)
      try {
        const response = await tmdbAxios.get(searchMoviesRequest(trimmedQuery))
        setSearchResults(response.data.results || [])
      } catch {
        // Fallback so search remains usable if remote API fails.
        const localResults = movies.filter((movie) =>
          getDisplayTitle(movie).toLowerCase().includes(trimmedQuery.toLowerCase())
        )
        setSearchResults(localResults)
      } finally {
        setIsSearchFetching(false)
      }
    }

    fetchSearchResults()
  }, [debouncedQuery])

  return (
    <div className="home">
      <Navbar showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        {isSearching ? (
          <section className="searchResults container" aria-label="Search results">
            <div className="searchResults__head">
              <h2 className="searchResults__title">
                Search results for <span className="searchResults__query">"{searchQuery.trim()}"</span>
              </h2>
              <div className="searchResults__count">{searchResults.length} titles</div>
            </div>

            {isSearchLoading ? (
              <div className="searchResults__grid searchResults__grid--skeleton" role="status" aria-live="polite">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="searchResults__skeleton" />
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="searchResults__empty">No results found</div>
            ) : (
              <div className="searchResults__grid" role="list">
                {searchResults.map((movie, idx) => (
                  <div
                    key={movie.id}
                    className={`searchResults__item ${activeResultIndex === idx ? 'isActive' : ''}`}
                    role="listitem"
                    ref={activeResultIndex === idx ? activeResultRef : null}
                  >
                    <MovieCard movie={movie} onPlay={openPlayer} />
                    <p className="searchResults__movieTitle">{renderHighlightedTitle(getDisplayTitle(movie))}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <Banner movies={featuredMovies} onPlay={openPlayer} />

            <section className="home__rows">
              {rows.map((r) => (
                <Row
                  key={r.id}
                  title={r.title}
                  movies={getMoviesByIds(r.movieIds)}
                  fetchUrl={rowRequestMap[r.id]}
                  onMovieSelect={openPlayer}
                />
              ))}
            </section>
          </>
        )}
      </main>
      {playerMovie ? (
        <section className="playerModal" aria-label="Trailer player" role="dialog" aria-modal="true">
          <div className="playerModal__backdrop" onClick={closePlayer} />
          <div className="playerModal__content">
            <div className="playerModal__head">
              <h3 className="playerModal__title">{getDisplayTitle(playerMovie)}</h3>
              <button type="button" className="playerModal__close" onClick={closePlayer} aria-label="Close player">
                ✕
              </button>
            </div>
            <div className="playerModal__body">
              {isPlayerLoading ? (
                <div className="playerModal__message">Loading trailer...</div>
              ) : playerTrailerKey ? (
                <iframe
                  className="playerModal__iframe"
                  src={`https://www.youtube.com/embed/${playerTrailerKey}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Trailer for ${getDisplayTitle(playerMovie)}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : playerFallbackQuery ? (
                <iframe
                  className="playerModal__iframe"
                  src={`https://www.youtube.com/embed?autoplay=1&listType=search&list=${encodeURIComponent(playerFallbackQuery)}`}
                  title={`Trailer search for ${getDisplayTitle(playerMovie)}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="playerModal__message">{playerError}</div>
              )}
            </div>
          </div>
        </section>
      ) : null}
      <Footer />
    </div>
  )
}
