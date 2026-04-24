import { useEffect, useState } from 'react'
import tmdbAxios from '../api/axios'
import MovieCard from './MovieCard.jsx'
import './Row.css'

export default function Row({ title, movies = [], fetchUrl, onMovieSelect }) {
  const [rowMovies, setRowMovies] = useState(movies)

  useEffect(() => {
    setRowMovies(movies)
  }, [movies])

  useEffect(() => {
    if (!fetchUrl) return

    let ignore = false

    async function fetchRowMovies() {
      try {
        const response = await tmdbAxios.get(fetchUrl)
        if (!ignore) {
          setRowMovies(response.data?.results || [])
        }
      } catch {
        if (!ignore) {
          setRowMovies(movies)
        }
      }
    }

    fetchRowMovies()
    return () => {
      ignore = true
    }
  }, [fetchUrl, movies])

  return (
    <section className="row">
      <div className="row__head container">
        <h2 className="row__title">{title}</h2>
      </div>

      <div className="row__scrollerWrap">
        <div className="row__scroller hide-scrollbar" role="list">
          {rowMovies.map((movie) => (
            <div className="row__item" role="listitem" key={movie.id}>
              <MovieCard movie={movie} onPlay={onMovieSelect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

