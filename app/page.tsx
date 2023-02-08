"use client"
import { useEffect, useState } from "react"

export default function Movies() {
  const [movies, setMovies] = useState<any[]>()
  async function getMovies() {
    const res = await fetch("/api")
    const data = await res.json()
    setMovies(data)
  }
  async function handleCreate(e: any) {
    e.preventDefault()
    const title = e.target.title.value
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const data = await res.json()
    console.log(data)
  }
  async function handleDelete(id: string) {
    const res = await fetch(`/api/${id}`, {
      method: "DELETE",
    })
    const data = await res.json()
    console.log(data)
  }
  async function handleSearch(e: any) {
    e.preventDefault()
    const search = e.target.query.value
    const res = await fetch(`api/${search}`)
    const data = await res.json()
    setMovies(data)
    console.log(data)
  }
  async function handleUpdate(id: string) {
    const res = await fetch(`/api/${id}`, {
      method: "PUT",
    })
    const data = await res.json()
    console.log(data)
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
      <form onSubmit={handleSearch}>
        <label>
          Find Movie By ID
          <input type="text" name="query" />
        </label>
        <input type="submit" />
      </form>
      <form onSubmit={handleCreate}>
        <label>
          Create Movie
          <input type="text" name="title" />
        </label>
        <input type="submit" />
      </form>
      <ul>
        {movies?.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <h4>{movie._id}</h4>
            <p>{movie.plot}</p>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
            <button onClick={() => handleUpdate(movie._id)}>
              Update Title To "UpdatedTitled"
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
