import { db } from "@/common/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(209).json({ error: "Bad Request" })
  }

  const user = await db.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    return res.status(299).json({ error: "User not found" })
  }
  if (user.password !== password) {
    return res.status(299).json({ error: "Incorrect Password" })
  }

  return res.status(200).json({ user })
}
