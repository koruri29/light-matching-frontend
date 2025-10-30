'use client';

import { useAuth } from '@/features/auth/auth/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/jobs');
    } else if (!user && !loading) {
      setShouldRender(true);
    }
  }, [user, loading, router]);

  if (loading) return <p>確認中...</p>;

  return <>{shouldRender ? children : null}</>;
}
