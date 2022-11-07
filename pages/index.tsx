import styles from '@/pages/index.module.css'
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

  const renderPage = () => {
    if (user) {
      return <div className={styles.container}>Home page if logged</div>
    } else {
      return <LoginView />
    }
  }
  return renderPage()
}
