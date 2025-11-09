'use client'

import React, { useState } from "react"
import DatePickerWithProvider from "@/components/provider/DatePickerProvider"
import { JobPostForm, JobPostFormPath, WorkDate } from "@/types"
import { Theme } from "@emotion/react"
import {
  Button,
  List,
  ListItem,
  Paper,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material"
import {
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { Dayjs } from "dayjs"
import { generateDateRange } from "@/features/post"


interface DateRangeRecruitFormProps {
  sx?: SxProps<Theme> | undefined
}

export const DateRangeRecruitForm = ({
  sx,
}: DateRangeRecruitFormProps) => {
  const {
    control,
    getValues,
    setValue,
    formState: {errors}
  } = useFormContext<JobPostForm>()

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "work_dates",
  })


  const [calenderOpen, setCalenderOpen] = useState(false);
  const [workDates, setWorkDates] = useState<WorkDate[]>([])


  // DatePicker
  const handleStartDateChange = (
    newValue: Dayjs | null,
    onChange: (date: Dayjs | null, keyboardInputValue?: string) => void,
  ) => {
    onChange(newValue)
    if (getValues('end_date') === null) {
      setValue('end_date', newValue)
      setCalenderOpen(true)
    }
  }


  // 募集人数
  const handlePositionNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: JobPostFormPath,
  ) => {
    const val = event.target.value;
    const newValue = val === '' ? '0' : val // 数値に変換

    setValue(fieldName, newValue)
  }

  const handlePositionNumberBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: JobPostFormPath,
  ) => {
    const value = event.target.value;
    const trimmed = value.replace(/^0+(?!$)/, '');
    const newValue = trimmed === '' ? '0' : trimmed // 数値に変換

    setValue(fieldName, newValue)
  }


  const handleSetDate = () => {
    const start = getValues('start_date')
    const end = getValues('end_date')
    const dates = generateDateRange(start, end)

    // 古い募集人数の入力があれば、引き継ぐ
    remove()
    const newWorkDates = dates.map(date => {
      const prev = workDates.find(wd => wd.work_date === date)
      const number_of_position = prev ? prev.number_of_position : ""
      const newWorkDate: WorkDate =  {
        work_date: date,
        number_of_position,
      }
      append(newWorkDate)
      return newWorkDate
    })
    setWorkDates(newWorkDates)
  }


  return (
    <div>
      <Stack direction="row">
        <Controller
          name="start_date"
          control={control}
          render={({ field }) => (
            <DatePickerWithProvider
            label="稼働日（開始）"
            value={field.value}
            onChange={(newValue) => handleStartDateChange(newValue, field.onChange)}
          />
          )}
        />

        <p>
          -
        </p>

        <Controller
          name="end_date"
          control={control}
          render={({ field }) => (
            <DatePickerWithProvider
            label="稼働日（終了）"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            open={calenderOpen}
            onOpen={() => setCalenderOpen(true)}
            onClose={() => setCalenderOpen(false)}
          />
          )}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={handleSetDate}
        sx={{
          display: "block",
          ml: 'auto',
        }}
      >
        確定
      </Button>

      <Paper
        variant="outlined"
        sx={{
          width: 'full',
          minHeight: "1rem",
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
          borderColor: "rgba(0, 0, 0, 0.2)",
          ...sx,
        }}
      >

        <Typography
          variant="h3"
          sx={{
            mt: "1rem",
            ml: "1rem",
            fontSize: "1rem",
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          募集人数
        </Typography>

        <List>
          {fields.map((date, idx) => (
            <ListItem
              key={date.work_date}
            >
              <Controller
                name={`work_dates.${idx}.number_of_position`}
                control={control}
                rules={{
                  required: '必須項目です',
                  pattern: {
                    value: /^[1-9][0-9]?$/,
                    message: '数字で入力してください',
                  },
                  min: {value: 1, message: '1以上を指定してください'},
                  max: {value: 99, message: '99以下を指定してください'},
                  validate: (value) => parseInt(value) % 1 === 0 || '整数で入力してください。',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={date.work_date}
                    type='number'
                    onChange={event =>
                      handlePositionNumberChange(event, field.name)}
                    onBlur={event =>
                      handlePositionNumberBlur(event, field.name)}
                    slotProps={{
                      htmlInput: {
                        step: 1,
                        min: 0,
                      },
                    }}
                    error={!!errors?.work_dates?.[idx]?.number_of_position}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}
