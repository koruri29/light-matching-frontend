import { apiClient } from '@/lib/apiClient';
import { NextCreateJobPostItems } from '@/types';
import axios from 'axios';

export const createJob = async (items: NextCreateJobPostItems) => {
  try {
    // CSRF cookie を先に取得
    // await apiClient.get('/sanctum/csrf-cookie');

    // 登録リクエスト送信
    const res = await apiClient.post('/post', items, {
      headers: { 'Accept': 'application/json' }
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error は AxiosError 型
      console.error('Axios error:', error.response?.data);
    } else {
      // Axios 以外の予期しないエラー
      console.error('Unexpected error:', error);
    }
  }
};
