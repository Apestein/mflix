import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise
  const db = client.db("sample_mflix")
  if (req.method === "GET") {
    try {
      const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray()

      res.status(200).json(movies)
    } catch (e) {
      console.error(e)
    }
  } else if (req.method === "POST") {
    const title: string = req.body.title
    console.log(title)
    const createdMovie = await db
      .collection("movies")
      .insertOne({ title: "test" })
    res.status(200).json(createdMovie)
  }
}
