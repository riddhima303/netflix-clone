import { useEffect, useState } from 'react'
import tmdbAxios from '../api/axios'
import MovieCard from './MovieCard.jsx'
import './Row.css'

export default function Row({ title, movies = [], fetchUrl = '' }) {
  const [rowMovies, setRowMovies] = useState(movies)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      if (!fetchUrl) return

      try {
        setIsLoading(true)
        setError('')
        const response = await tmdbAxios.get(fetchUrl)
        setRowMovies(response.data.results || [])
      } catch {
        setError('Could not load movies.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [fetchUrl])

  return (
    <section className="row">
      <div className="row__head container">
        <h2 className="row__title">{title}</h2>
      </div>

      <div className="row__scrollerWrap">
        {isLoading && <p className="row__status">Loading movies...</p>}
        {error && <p className="row__status">{error}</p>}
        <div className="row__scroller hide-scrollbar" role="list">
          {rowMovies.map((movie) => (
            <div className="row__item" role="listitem" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

