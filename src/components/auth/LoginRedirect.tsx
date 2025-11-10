'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/hooks/useUser';
import { JOB_VIEW } from '@/constants/paths';

export default function LoginRedirect({ redirectTo = JOB_VIEW }: { redirectTo?: string }) {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    // user がオブジェクトならログイン済み扱いでリダイレクト
    if (user) {
      router.replace(redirectTo)
    }
    // user が null または undefined の場合は未ログイン or ロード中なので何もしない
  }, [user, redirectTo, router])

  return null
}
