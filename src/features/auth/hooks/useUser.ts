import { User } from "@/types";
import { useEffect, useState } from "react";

// src/lib/useUser.ts
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          credentials: "include", // Cookie 送信
        });
        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
