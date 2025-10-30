import { apiClient } from '@/lib/apiClient';
import { UserRegisterForm } from '@/types';

export const registerUser = async (formData: UserRegisterForm) => {
  // CSRF cookie を先に取得
  await apiClient.get('/sanctum/csrf-cookie');

  // 登録リクエスト送信
  const res = await apiClient.post('/api/register', formData, {
    headers: { 'Accept': 'application/json' }
  });
  return res.data;
};
