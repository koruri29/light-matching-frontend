import dayjs from "dayjs";
import ja from 'dayjs/locale/ja';

dayjs.locale(ja)

export function formatDateToJapanese(input: string): string {
  const parsed = dayjs(input);
  return parsed.isValid()
    ? parsed.format('YYYY年M月D日(ddd)')
    : "-年-月-日";
}
