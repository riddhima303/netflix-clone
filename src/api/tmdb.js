const TMDB_BASE_URL = import.meta.env.DEV ? '/tmdb' : 'https://api.themoviedb.org/3'
const rawApiKey = (import.meta.env.VITE_TMDB_API_KEY || '').trim()
const TMDB_API_KEY = rawApiKey && rawApiKey !== 'your_tmdb_api_key_here'
  ? rawApiKey
  : 'd3e663410e8dc57f650d6b54e82ed5bc'

export { TMDB_BASE_URL, TMDB_API_KEY }
