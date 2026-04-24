import MovieCard from './MovieCard.jsx'
import './Row.css'

export default function Row({ title, movies }) {
  return (
    <section className="row">
      <div className="row__head container">
        <h2 className="row__title">{title}</h2>
      </div>

      <div className="row__scrollerWrap">
        <div className="row__scroller hide-scrollbar" role="list">
          {movies.map((movie) => (
            <div className="row__item" role="listitem" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

