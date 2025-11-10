import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    background: {
      default: '#fff',  // 画面背景色
      paper: '#fafaf5',
    },
    text: {
      primary: '#2e2e2e', // 通常の文字色
      secondary: '#888'
    },
    primary: {
      main: '#C4A947', // ソフトゴールド（アクセント主）
      dark: '#B08D32', // ミディアムゴールド（アクセント強調）
      contrastText: '#2E2E2E', // ボタン文字色など
    },
    secondary: {
      main: '#E9DBC4', // サンドベージュ（リンクやボタン系）
    },
    info: {               // リンク用カラー
      main: '#007BFF',    // 青（標準リンク色）
      contrastText: '#fff',
    },
    divider: '#D6D6D6', // クールグレー（ボーダー、区切り）
    error: {
      main: '#B35C50', // ダスティレッド（エラー）
    },
    grey: {
      900: '#2E2E2E', // 文字メイン
      600: '#888888', // 文字サブ
      500: '#9a9a9a',
      400: '#B0B0B0',
      300: '#D6D6D6', // 補助カラー
      200: '#e5e5e5'
    },
  },
  typography: {
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(','),
    body1: {
      fontSize: '0.825rem',
    }
  },

});

export default theme;
