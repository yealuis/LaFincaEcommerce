import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminServerGuard({ children }) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/login')
  }

  if (!session.user?.esadmin) {
    redirect('/')
  }

  return <>{children}</>
}
