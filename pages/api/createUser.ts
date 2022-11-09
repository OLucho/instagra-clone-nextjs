import { db } from "common/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(300).json({ error: "Method not allowed" })
    }
    const user = req.body
    const userAlreadyExists = await db.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: user.email
            },
            username: {
              equals: user.username
            }
          }
        ]
      }
    })

    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" })
    }

    const savedUser = await db.user.create({ data: user })

    return res.status(200).json(savedUser)
  } catch (error) {
    console.log(error)
    return res.status(402).json({ error: true, message: error })
  }
}
