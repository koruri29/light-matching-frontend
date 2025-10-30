export const YES_NO_OPTIONS = {
  YES: '1',
  NO: '0',
} as const;

export const ContactMethod = {
  email: 'email',
  line: 'line',
} as const


export const TAGS = {
  PIN: 'pin',
  TRUSS: 'truss',
  PRE_STAY: 'pre_stay',
  POST_STAY: 'post_stay',
} as const;

// タグ名のユニオン型を取得
export type TagKey = keyof typeof TAGS;         // 'PIN' | 'TRUSS' | ...
export type TagValue = (typeof TAGS)[TagKey];   // 'pin' | 'truss' | ...

// フォームで扱うタグ構造
export type TagBooleanMap = Record<TagValue, boolean>;
