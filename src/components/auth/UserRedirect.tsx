'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/hooks/useUser';
import { LOGIN } from '@/constants/paths';

export default function UserRedirect({ redirectTo = LOGIN }: { redirectTo?: string }) {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    // user が null なら未ログイン扱いでリダイレクト
    if (user === null) {
      router.replace(redirectTo)
    }
    // user が undefined の場合はまだ読み込み中なので何もしない
  }, [user, redirectTo, router])

  return null
}
