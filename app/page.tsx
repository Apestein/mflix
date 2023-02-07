"use client"
import { useEffect, useState } from "react"

export default function Movies() {
  const [movies, setMovies] = useState<any[]>()
  const [query, setQuery] = useState("")
  async function getMovies() {
    const res = await fetch("/api")
    const data = await res.json()
    setMovies(data)
  }
  useEffect(() => {
    getMovies()
  }, [])
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <form action={`/api/${query}`} method="GET">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" />
      </form>
      <ul>
        {movies?.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
