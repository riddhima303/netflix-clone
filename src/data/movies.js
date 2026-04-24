const IMG = {
  poster: 'https://image.tmdb.org/t/p/w500',
  backdrop: 'https://image.tmdb.org/t/p/original',
}

/**
 * Mock data (UI-only). IDs and image paths are TMDB-style for realistic sizing.
 * You can swap these with any other images later without changing the UI.
 */
export const movies = [
  {
    id: '299536',
    title: 'Avengers: Infinity War',
    year: '2018',
    maturityRating: 'U/A 13+',
    duration: '2h 29m',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    overview:
      "As the Avengers and their allies continue to protect the world, a new danger emerges from the cosmic shadows: Thanos. To save reality, they’ll have to risk everything.",
    posterUrl: `${IMG.poster}/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg`,
    backdropUrl: `${IMG.backdrop}/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg`,
  },
  {
    id: '634649',
    title: 'Spider-Man: No Way Home',
    year: '2021',
    maturityRating: 'U/A 13+',
    duration: '2h 28m',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    overview:
      "Peter’s identity is revealed and his world turns upside down. He turns to Doctor Strange for help, but the spell opens the door to dangerous multiverse visitors.",
    posterUrl: `${IMG.poster}/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg`,
    backdropUrl: `${IMG.backdrop}/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg`,
  },
  {
    id: '603',
    title: 'The Matrix',
    year: '1999',
    maturityRating: 'A',
    duration: '2h 16m',
    genres: ['Sci-Fi', 'Action'],
    overview:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: `${IMG.poster}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
    backdropUrl: `${IMG.backdrop}/icmmSD4vTTDKOq2vvdulafOGw93.jpg`,
  },
  {
    id: '157336',
    title: 'Interstellar',
    year: '2014',
    maturityRating: 'U/A 13+',
    duration: '2h 49m',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival as Earth becomes uninhabitable.",
    posterUrl: `${IMG.poster}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdropUrl: `${IMG.backdrop}/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg`,
  },
  {
    id: '497',
    title: 'The Green Mile',
    year: '1999',
    maturityRating: 'A',
    duration: '3h 9m',
    genres: ['Drama', 'Fantasy'],
    overview:
      'A death row corrections officer witnesses extraordinary events brought on by an inmate with a mysterious gift.',
    posterUrl: `${IMG.poster}/velWPhVMQeQKcxggNEU8YmIo52R.jpg`,
    backdropUrl: `${IMG.backdrop}/zb6fM1CX41D9rF9hdgclu0peUmy.jpg`,
  },
  {
    id: '27205',
    title: 'Inception',
    year: '2010',
    maturityRating: 'U/A 13+',
    duration: '2h 28m',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    overview:
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    posterUrl: `${IMG.poster}/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg`,
    backdropUrl: `${IMG.backdrop}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
  },
  {
    id: '155',
    title: 'The Dark Knight',
    year: '2008',
    maturityRating: 'U/A 13+',
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama'],
    overview:
      'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, he sets out to dismantle remaining criminal organizations.',
    posterUrl: `${IMG.poster}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,
    backdropUrl: `${IMG.backdrop}/hqkIcbrOHL86UncnHIsHVcVmzue.jpg`,
  },
  {
    id: '680',
    title: 'Pulp Fiction',
    year: '1994',
    maturityRating: 'A',
    duration: '2h 34m',
    genres: ['Crime', 'Drama'],
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in a tale of violence and redemption.',
    posterUrl: `${IMG.poster}/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg`,
    backdropUrl: `${IMG.backdrop}/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg`,
  },
  {
    id: '238',
    title: 'The Godfather',
    year: '1972',
    maturityRating: 'A',
    duration: '2h 55m',
    genres: ['Crime', 'Drama'],
    overview:
      'Spanning the years 1945 to 1955, a chronicle of the Corleone crime family under patriarch Vito Corleone.',
    posterUrl: `${IMG.poster}/3bhkrj58Vtu7enYsRolD1fZdja1.jpg`,
    backdropUrl: `${IMG.backdrop}/kGzFbGhp99zva6oZODW5atUtnqi.jpg`,
  },
  {
    id: '550',
    title: 'Fight Club',
    year: '1999',
    maturityRating: 'A',
    duration: '2h 19m',
    genres: ['Drama'],
    overview:
      'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.',
    posterUrl: `${IMG.poster}/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg`,
    backdropUrl: `${IMG.backdrop}/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg`,
  },
]

export const rows = [
  {
    id: 'trending',
    title: 'Trending Now',
    movieIds: ['634649', '299536', '155', '27205', '157336', '603', '550', '680'],
  },
  {
    id: 'top10',
    title: 'Top Picks for You',
    movieIds: ['155', '27205', '157336', '238', '603', '497', '680', '550'],
  },
  {
    id: 'action',
    title: 'Action Thrillers',
    movieIds: ['299536', '155', '27205', '634649', '603'],
  },
  {
    id: 'drama',
    title: 'Critically Acclaimed',
    movieIds: ['497', '238', '680', '550', '157336'],
  },
]

export function getMovieById(movieId) {
  return movies.find((m) => String(m.id) === String(movieId)) || null
}

export function getMoviesByIds(ids) {
  const map = new Map(movies.map((m) => [String(m.id), m]))
  return ids.map((id) => map.get(String(id))).filter(Boolean)
}

