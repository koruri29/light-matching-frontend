import { UserRegisterForm } from "@/types";
import { useState } from "react";
import { registerUser } from "../../../services/userApi";
import axios from "axios";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: UserRegisterForm) => {
    if (loading) return {
      success: false,
      message: '登録中です。連続送信できません'
    }

    setLoading(true);

    try {
      const data = await registerUser(formData);

      return {
        success: data.success,
        message: `${data.success || 'ユーザー登録に失敗しました。'}${data.message}`,
      };
    } catch (e: unknown) {
      console.error('ユーザー登録エラー: ', e);
      let error = ''
      if (axios.isAxiosError(e)) {
        error = '登録に失敗しました';
      } else {
        error = '予期しないエラーが発生しました';
      }

      return {
        success: false,
        message: error
      };
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister };
}
