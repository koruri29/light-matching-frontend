import axios from 'axios';

export function handleAxiosError(error: unknown, functionName?: string) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // サーバーがレスポンスを返した場合
      console.error(
        `[${functionName ?? 'unknown'}] API request failed: status=${error.response.status}, data=${JSON.stringify(error.response.data)}`
      );
      return {
        type: 'response',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // リクエストは送ったがレスポンスがない場合
      console.error(`[${functionName ?? 'unknown'}] API request failed: no response received`, error.request);
      return { type: 'no-response', request: error.request };
    } else {
      // リクエスト設定段階でのエラー
      console.error(`[${functionName ?? 'unknown'}] API request setup error:`, error.message);
      return { type: 'setup-error', message: error.message };
    }
  } else {
    // Axios 以外のエラー
    console.error(`[${functionName ?? 'unknown'}] Unexpected error:`, error);
    return { type: 'unknown', error };
  }
}
