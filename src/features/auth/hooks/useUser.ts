'use client'

import { useState, useEffect, useCallback } from 'react'
import { User } from '@/types'
import { apiClient } from '@/lib/apiClient'

export const useUser = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined) // undefined: ローディング中

  const fetchUser = useCallback(async () => {
    try {
      const res = await apiClient.get<User>('/api/user', { withCredentials: true })
      setUser(res.data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setUser(null) // 401/419など失敗時は未ログイン扱い
      // フロントでセッションエラー（401/419）を検出したら
      // サーバー側で強制的にクッキーを削除してもらう
      try {
        const forceLogoutUrl = `/api/force-logout`
        await apiClient.post(forceLogoutUrl, {})
      } catch (forceErr) {
        console.warn('Force logout failed:', forceErr)
      }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      // CSRF cookie取得
      await apiClient.get('/sanctum/csrf-cookie')
      await apiClient.post('/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Logout failed:', error)
      try {
        const forceLogoutUrl = `/api/force-logout`
        await apiClient.post(forceLogoutUrl, {})
      } catch (forceErr) {
        console.warn('Force logout failed:', forceErr)
      }
    } finally {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { user, fetchUser, logout }
}
