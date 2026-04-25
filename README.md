# Netflix Clone

A responsive Netflix-inspired UI built with React, powered by the TMDB API.

**Live:** https://netflix-clone-six-kohl-10.vercel.app/

---

## About

This project recreates the look and feel of Netflix's homepage. It fetches real movie and TV show data from the TMDB API and displays them in a Netflix-style layout with a hero banner and scrollable rows by category.

## How It Works

1. **Login Page** — Users land on a Netflix-styled login screen to enter the app.
2. **Home Page** — Once in, the app fetches live data from the TMDB API (trending, top rated, by genre, etc.) and renders them as horizontally scrollable rows.
3. **Hero Banner** — A random featured movie/show is picked from the fetched data and displayed as a full-width banner at the top.
4. **Movie Cards** — Each card shows a poster thumbnail. On hover, it scales up to highlight the title.
5. **API Requests** — All data is fetched on page load using `fetch` or `axios`, hitting TMDB's REST endpoints with your API key stored in a `.env` file.

## Built With

- React + Vite
- CSS
- React Router
- TMDB API
- Vercel (hosting)

## Setup

```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
npm install
```

Create a `.env` file in the root:

```
VITE_TMDB_API_KEY=your_api_key_here
```

Then run:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## License

For educational use only. Netflix is a trademark of Netflix, Inc.
