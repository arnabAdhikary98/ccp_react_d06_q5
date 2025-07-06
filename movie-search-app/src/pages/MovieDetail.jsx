import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=bd18341c'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
        if (res.data.Response === 'True') {
          setMovie(res.data)
        } else {
          setError(res.data.Error)
        }
      } catch (err) {
        setError('Failed to fetch movie details.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">⬅️ Back to Search</Link>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} style={{ width: '200px' }} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  )
}

export default MovieDetail
