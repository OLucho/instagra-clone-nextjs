import { db } from "common/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(300).json({ error: "Method not allowed" })
    }
    const user = req.body

    const userExists = await db.user.findFirst({
      where: {
        OR: [
          {
            username: user.username,
          },
          {
            email: user.email,
          },
        ],
      },
    })

    if (userExists) {
      return res.status(201).json({ error: "User already exists" })
    }

    const savedUser = await db.user.create({ data: user })

    return res.status(200).json({ user: savedUser })
  } catch (error) {
    return res.status(402).json({ error: true, message: error })
  }
}
