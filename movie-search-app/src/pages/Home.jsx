import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=bd18341c' 

function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchMovies = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      if (res.data.Response === 'True') {
        setResults(res.data.Search)
      } else {
        setError(res.data.Error)
        setResults([])
      }
    } catch (err) {
      setError('Failed to fetch movies.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Movie Search App 🎬</h2>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
