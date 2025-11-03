'use client'

import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import { CONTENT_WIDTH } from "@/constants/styles";
import { JobCountsByDate } from "@/types";
import { renderDay } from "@/app/jobs/Calender/DayRenderer";
import { StyledDateCalendar } from "@/app/jobs/Calender/CalenderStyle";


interface CalenderProps {
  jobCounts: JobCountsByDate
}

export const Calendar = ({
  jobCounts,
}: CalenderProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ja"
    >
      <StyledDateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slots={{
          day: (props) => renderDay(props, jobCounts),
        }}
        slotProps={{
          calendarHeader: {
            sx: {
              width: CONTENT_WIDTH,
            }
          }
        }}
      />
    </LocalizationProvider>
  );
}
