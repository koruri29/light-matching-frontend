import { apiClient } from '@/lib/apiClient';
import { LoginResponse, User } from '@/types';
import axios, { AxiosResponse } from 'axios';

export const getUser = async (): Promise<User | null> => {
  try {
    // await apiClient.get('/sanctum/csrf-cookie');
    const res = await apiClient.get('/api/user');  // APIエンドポイントを確認
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 未ログイン → null を返して正常処理とする
      return null;
    }
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<LoginResponse>> => {
  await apiClient.get('/sanctum/csrf-cookie');

  return apiClient.post('/login', { email, password });
};

export const logout = async () => {
  // CSRF cookie を先に取得
  // await apiClient.get('/sanctum/csrf-cookie');

  return apiClient.post('/logout');
};
