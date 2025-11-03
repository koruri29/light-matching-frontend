'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/hooks/useUser';
import { LOGIN } from '@/constants/paths';

export default function UserRedirect({ redirectTo = LOGIN }: { redirectTo?: string }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      // 未ログインなら即リダイレクト
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]);

  return null;
}
