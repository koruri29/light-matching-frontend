import { useState } from 'react';
import { login } from '@/services/authApi';
import axios from 'axios';


export interface UseLoginReturn {
  success: boolean
  message: string
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<UseLoginReturn | void>  => {
    if (loading) return {
      success: false,
      message: '処理中です。連続送信できません'
    }

    setLoading(true);
    try {
      const data = await login(email, password);

      if (data.status === 200) {
        return { success: true, message: 'ログイン成功' };
      }

      console.error(data.message)

      return {
        success: false,
        message: "ログインに失敗しました",
      };
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        // バリデーション or 認証エラー
        if (status && [401, 403, 419, 422].includes(status)) {
          return {
            success: false,
            message: 'メールアドレスまたはパスワードが正しくありません。'
          };
        }

        // サーバーエラー（500系）
        if (status && status >= 500) {
          return {
            success: false,
            message: 'サーバーエラーが発生しました。時間をおいて再試行してください。'
          };
        }
      }

      // それ以外（ネットワークエラーなど）
      return {
        success: false,
        message: '通信に失敗しました。ネットワークを確認してください。'
      };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};
