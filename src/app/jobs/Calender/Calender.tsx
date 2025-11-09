'use client'

import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import { CONTENT_WIDTH } from "@/constants/styles";
import { JobsByDate } from "@/types";
import { renderDay } from "@/app/jobs/Calender/DayRenderer";
import { StyledDateCalendar } from "@/app/jobs/Calender/CalenderStyle";
import { fetchJobPostCountByDate } from "@/services/jobsApi";
import { LocalizationProvider } from "@mui/x-date-pickers";


export const Calendar = () => {
  const [jobCounts, setJobCounts] = useState<JobsByDate>({})
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const fetchJobsByDate = async () => {
      try {
        const res = await fetchJobPostCountByDate()
        setJobCounts(res)
      } catch (error) {
        console.error(`fetchJobsByDate error: ${error}`)
      }
    }
    fetchJobsByDate()
  }, [])


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
