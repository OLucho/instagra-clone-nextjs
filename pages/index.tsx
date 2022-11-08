import { LoginView } from '@/components/LoginView'
import { useEffect, useState } from 'react'

interface User { }

export default function IndexPage () {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(user)
    }
  }, [])

  return user ? <p>Home Page if user is logged</p> : <LoginView />
}
