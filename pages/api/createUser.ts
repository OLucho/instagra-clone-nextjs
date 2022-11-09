import { db } from "common/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }
    const user = req.body
    const savedUser = db.user.create({ data: user })

    return res.json({ savedUser })
  } catch (error) {
    return res.status(402).json({ error: true, message: error })
  }
}
