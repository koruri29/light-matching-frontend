import dayjs from "dayjs";

export function formatDateToJapanese(input: string): string {
  const parsed = dayjs(input);
  return parsed.isValid()
    ? parsed.format('YYYY年M月D日')
    : "-年-月-日";
}
