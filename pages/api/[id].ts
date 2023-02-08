import { ObjectId } from "mongodb"
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
      const title = req.query.id

      const movies = await db
        .collection("movies")
        .find({ title: title })
        .toArray()
      res.status(200).json(movies)
    } catch (e) {
      console.error(e)
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.query.id
      console.log(id)
      const deletedMovie = await db
        .collection("movies")
        .deleteOne({ _id: new ObjectId(id?.toString()) })
      res.status(200).json(deletedMovie)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method === "PUT") {
    const id = req.query.id
    console.log(id)
    const updatedMovie = await db
      .collection("movies")
      .updateOne(
        { _id: new ObjectId(id?.toString()) },
        { $set: { title: "UpdatedTitle" } }
      )
    res.status(200).json(updatedMovie)
  }
}
