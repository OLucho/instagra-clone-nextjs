import { useTitle, useUser } from '@/common/hooks'
import { LoginView } from '@/components/LoginView'

export default function IndexPage () {
  const { user, setUser } = useUser()

  useTitle(user ? `Welcome ${user.name}` : 'Instagram')

  return user ? <p>Hello {user.name}</p> : <LoginView setUser={setUser}/>
}
