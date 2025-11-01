'use client';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import { jaJP } from '@mui/x-date-pickers/locales';
import { Dayjs } from 'dayjs';

interface DatePickerWithProviderProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  open?: boolean
  onOpen?: (() => void) | undefined
  onClose?: (() => void) | undefined
}

export default function DatePickerWithProvider({
  label,
  value,
  onChange,
  open,
  onOpen,
  onClose,
}: DatePickerWithProviderProps) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ja"
      localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText}
      dateFormats={{ year: 'YYYY年' }}
    >
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="YYYY/MM/DD"
        slotProps={{ textField: { fullWidth: true }, calendarHeader: { format: 'YYYY年MM月' } }}
        open={open}
        onOpen={() =>{
          if (onOpen) onOpen()
        }}
        onClose={() =>{
          if (onClose) onClose()
        }}
      />
    </LocalizationProvider>
  );
}
