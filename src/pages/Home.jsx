import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import Row from '../components/Row.jsx'
import Footer from '../components/Footer.jsx'
import { getMoviesByIds, movies, rows } from '../data/movies.js'
import MovieCard from '../components/MovieCard.jsx'
import { useEffect, useMemo, useState } from 'react'
import './Home.css'

export default function Home() {
  const heroMovie = movies[0]
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

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

            {filteredMovies.length === 0 ? (
              <div className="searchResults__empty">No results found</div>
            ) : (
              <div className="searchResults__grid" role="list">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="searchResults__item" role="listitem">
                    <MovieCard movie={movie} />
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

