import { useEffect, useState } from "react"
import { User } from "./types"

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUser(user)
    }
  }, [])

  return { user, setUser }
}
