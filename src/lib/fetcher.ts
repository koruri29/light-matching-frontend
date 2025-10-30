import { ApiResponse } from "@/types";

type FetchOptions = RequestInit & {
  next?: NextFetchRequestConfig;
};

export async function fetcher<T extends ApiResponse>(
  url: string,
  options: FetchOptions = {}
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      next: options.next,
    });

    console.log('★fetcher response: ', res)
    if (!res.ok) {
      console.warn(`fetcher: ${res.status} ${res.statusText}`);
      return null; // throwしない
    }

    return res.json() as Promise<T>;
  } catch (e) {
    console.error('fetcher error:', e);
    return null;
  }
}
