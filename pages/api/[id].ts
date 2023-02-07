import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise
      const db = client.db("sample_mflix")
      const id = req.query.id
      console.log(id)

      const movies = await db
        .collection("movies")
        .find({ title: id })
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray()

      res.status(200).json(movies)
    } catch (e) {
      console.error(e)
    }
  }
}
