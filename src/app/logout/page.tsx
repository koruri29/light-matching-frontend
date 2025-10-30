'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/services/authApi'

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        await logout()
      } catch (error) {
        console.error('Logout failed:', error)
      } finally {
        router.push('/login') // ログアウト後にログインページへリダイレクト
      }
    })()
  }, [router])

  return <p>Logging out...</p>
}

export default LogoutPage
