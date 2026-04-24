import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import Row from '../components/Row.jsx'
import Footer from '../components/Footer.jsx'
import requests from '../api/requests'
import { getMoviesByIds, movies, rows } from '../data/movies.js'
import './Home.css'

export default function Home() {
  const heroMovie = movies[0]
  const rowRequestMap = {
    trending: requests.fetchTrending,
    top10: requests.fetchTopRated,
    action: requests.fetchActionMovies,
    drama: requests.fetchDocumentaries,
  }

  return (
    <div className="home">
      <Navbar />
      <main>
        <Banner movie={heroMovie} />

        <section className="home__rows">
          {rows.map((r) => (
            <Row
              key={r.id}
              title={r.title}
              movies={getMoviesByIds(r.movieIds)}
              fetchUrl={rowRequestMap[r.id]}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

