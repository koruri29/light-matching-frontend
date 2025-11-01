'use client';

import { useAuth } from '@/features/auth/context/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (user) {
      setShouldRender(true);
    }
  }, [user, loading, router]);

  if (loading || !shouldRender) return <p>読み込み中...</p>;

  return <>{children}</>;
}
