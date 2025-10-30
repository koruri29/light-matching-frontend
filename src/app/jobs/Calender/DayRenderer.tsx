import { JobCountsByDate } from "@/types";
import { PickersDayProps } from "@mui/x-date-pickers";
import { StyledPickersDay } from "@/app/jobs/Calender/CalenderStyle";


export const renderDay = (props: PickersDayProps, jobCounts: JobCountsByDate) => {
  const { day, outsideCurrentMonth, ...other } = props;
  const dateStr = day.format("YYYY-MM-DD");
  const jobNumber = jobCounts[dateStr];

  return (
    <StyledPickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
    >
      <span>{day.date()}</span>  {/* 日付を表示 */}
      {jobNumber && <span className="job-number">{jobNumber}件</span>}
    </StyledPickersDay>
  );
};
