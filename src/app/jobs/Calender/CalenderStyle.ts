import { CONTENT_WIDTH } from "@/constants/styles";
import { styled } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import theme from "@theme";

// Whole Calender style
export const StyledDateCalendar = styled(DateCalendar)(() => ({
  width: CONTENT_WIDTH,
  height: 'auto',
  maxHeight: '100%',
  backgroundColor: theme.palette.background.paper,
  '.MuiDayCalendar-weekContainer': {
    width: CONTENT_WIDTH,
  },
  '.MuiDayCalendar-root .MuiDayCalendar-header .MuiDayCalendar-weekDayLabel': {
    width: '4rem',
    height: 'auto',
  },
  '.MuiDayCalendar-root   .MuiPickersSlideTransition-root': {
    height: '22rem',
  },
  '.MuiDayCalendar-monthContainer .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
  },
}));


// Date parts style
export const StyledPickersDay = styled(PickersDay)(() => ({
  width: '4rem',
  height: '4rem',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-selected:focus': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-selected.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-selected.MuiPickersDay-dayWithMargin span': {
    color: theme.palette.background.paper,
  },
  '& span': {
    fontSize: '0.75rem',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    marginTop: '0.25rem',
  },
  '.MuiPickersDay-root.Mui-selected span': {
    fontSize: '0.75rem',
    textDecoration: 'none',
    color: theme.palette.background.paper,
    marginTop: '0.25rem',
  },
  '& .job-number': {
    color: theme.palette.text.primary,
    textDecoration: 'underline',
  },

  display: 'flex',
  flexDirection: 'column'
}));
