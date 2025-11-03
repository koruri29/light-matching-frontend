'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/hooks/useUser';
import { JOB_VIEW } from '@/constants/paths';

export default function LoginRedirect({ redirectTo = JOB_VIEW }: { redirectTo?: string }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null) {
      // すでにログイン済みなら /jobs にリダイレクト
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]);

  return null;
}
