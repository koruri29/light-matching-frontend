import { createJob } from "@/services/postApi";
import { NextCreateJobPostItems, SuccessWithMessage } from "@/types";
import axios from "axios";
import { useState } from "react";

export const useCreateJobPost = ()=> {
  const [loading, setLoading] = useState(false);

  const handleCreateJobPost = async (
    items: NextCreateJobPostItems,
  ): Promise<SuccessWithMessage> => {
    if (loading) return {
      success: false,
      message: '登録中です。連続送信できません'
    }

    setLoading(true);

    try {
      const data = await createJob(items);
      console.log('response: ', data)

      return {
        success: !!data?.success,
        message: data?.message ?? '依頼の投稿に失敗しました。',
      };
    } catch (e: unknown) {
      console.error('依頼の投稿エラー: ', e);
      let error = ''
      if (axios.isAxiosError(e)) {
        error = '依頼の投稿に失敗しました。';
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
  }

  return { handleCreateJobPost }
}
