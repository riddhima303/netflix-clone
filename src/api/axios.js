import { TMDB_BASE_URL } from './tmdb'

const tmdbAxios = {
  async get(path) {
    const response = await fetch(`${TMDB_BASE_URL}${path}`)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return { data }
  },
}

export default tmdbAxios
