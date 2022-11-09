import { useEffect, useState } from 'react'
import { useTitle } from '@/common/hooks'
import { User } from '@/common/types'
import { LoginView } from '@/components/LoginView'

export default function IndexPage () {
  const [user, setUser] = useState<User | null>(null)

  useTitle(user ? `Welcome ${user.name}` : 'Instagram')

  useEffect(() => {
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUser(user)
    }
  }, [])

  return user ? <p>Home Page if user is logged</p> : <LoginView />
}
