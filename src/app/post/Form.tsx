'use client'

import React, { ChangeEvent, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  Controller,
  useForm
} from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { ContactMethod, YES_NO_OPTIONS } from '@/constants/constants';
import { PrefectureLabel, PREFECTURES } from '@/constants/prefectures';
import DatePickerWithProvider from '@/components/provider/DatePickerProvider';
import {
  JobPostForm,
} from '@/types/index';
import GenericToast from '@/components/toast/GenericToast';
import { formatFormData } from '@/features/post/postUtils';
import { useCreateJobPost } from '@/features/post/hooks/useCreateJobPost';
import { useToast } from '@/components/toast/useToast';


dayjs.extend(isSameOrBefore);


// 当道府県選択の初期値
const defaultPrefecture = PREFECTURES.find(p => p.value === 'tokyo')?.label ?? '東京都'

export const Form = () => {
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setValue,
    formState: {errors}
  } = useForm<JobPostForm>({
    defaultValues: {
      is_public: YES_NO_OPTIONS.NO,
      event_name: "",
      start_date: null,
      end_date: null,
      prefecture: defaultPrefecture,
      location: "",
      number_of_position: '1',
      payment: "",
      contact_method: ContactMethod.email,
      deadline: null,
      tags: [
        {
          pin:       false,
          truss:     false,
          pre_stay:  false,
          post_stay: false,
        }
      ],
      description: "",
    }
  })

  const [calenderOpen, setCalenderOpen] = useState(false);
  const [deadlineCalenderOpen, setDeadlineCalenderOpen] = useState(false);
  const [prefecture, setPrefecture] = useState<PrefectureLabel>(defaultPrefecture)
  const [positionNumber, setPositionNumber] = useState<string>('1')
  // GenericToast用
  const {
    open,
    setOpen,
    message,
    showToast,
  } = useToast()

  const { handleCreateJobPost } = useCreateJobPost()

  const handlePrefectureChange = (
    event: SelectChangeEvent<PrefectureLabel>,
    onChange: (...event: PrefectureLabel[]) => void,
  ): void => {
    console.log('event: ', event)
    onChange(event.target.value as PrefectureLabel)
    setPrefecture(event.target.value as PrefectureLabel)
  }

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

  const handlePositionNumberChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = event.target.value;
    const newValue = val === '' ? '0' : val // 数値に変換
    setPositionNumber(newValue);
    setValue('number_of_position', newValue)
  }

  const handlePositionNumberBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const trimmed = value.replace(/^0+(?!$)/, '');
    const newValue = trimmed === '' ? '0' : trimmed // 数値に変換
    setPositionNumber(newValue);
    setValue('number_of_position', newValue)
  }


  const onSubmit = async (formData: JobPostForm) => {
    console.log('formData: ', formData);
    const formattedFormData = formatFormData(formData)
    console.log('data to be posted: ', formattedFormData)
    try {
      const result = await handleCreateJobPost(formattedFormData)
      console.log('create result: ', result)
      if (result.success) {
        showToast('依頼の投稿が完了しました。')
        reset()
      } else {
        showToast(result.message || '依頼の投稿に失敗しました。')
      }

    } catch (error) {
      console.error('依頼の投稿に失敗しました: ', error)
    }
  }


  const tagOptions = [
    { name: 'pin', label: 'ピン作業あり' },
    { name: 'truss', label: 'トラスあり' },
    { name: 'pre_stay', label: '前泊の可能性あり' },
    { name: 'post_stay', label: '後泊の可能性あり' },
  ] as const


  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        求人作成
      </Typography>

      <FormControl component="fieldset">
        <Controller
          name="is_public"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="公開" />
              <FormControlLabel value="0" control={<Radio />} label="非公開" />
            </RadioGroup>
          )}
        />
      </FormControl>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="event_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="イベント名"
              fullWidth
              margin="normal"
            />
          )}
        />

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

        <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DatePickerWithProvider
              label="募集締切"
              value={field.value}
              onChange={(newValue) => field.onChange(newValue)}
              open={deadlineCalenderOpen}
              onOpen={() => setDeadlineCalenderOpen(true)}
              onClose={() => setDeadlineCalenderOpen(false)}
            />
            )}
          />

        <FormControl fullWidth>
          <InputLabel id="select-label">都道府県</InputLabel>
          <Controller
            name="prefecture"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="prefecture-label"
                label="都道府県を選択"
                value={prefecture || ''}
                onChange={event => handlePrefectureChange(event, field.onChange)}
              >
                {PREFECTURES.map((pref) => (
                  <MenuItem key={pref.value} value={pref.label}>
                    {pref.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="場所詳細"
              fullWidth
              multiline
              margin="normal"
            />
          )}
        />

        <Controller
          name="number_of_position"
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
              label="募集人数"
              type='number'
              value={positionNumber}
              onChange={handlePositionNumberChange}
              onBlur={handlePositionNumberBlur}
              slotProps={{
                htmlInput: {
                  step: 1,
                  min: 0,
                },
              }}
              error={!!errors.number_of_position}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="payment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="支払情報"
              fullWidth
              multiline
              margin="normal"
            />
          )}
        />

      <FormControl component="fieldset">
        <FormLabel component="legend">応募後の連絡手段</FormLabel>
        <Controller
          name="contact_method"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value={ContactMethod.email} control={<Radio />} label="メール" />
              <FormControlLabel value={ContactMethod.line} control={<Radio />} label="LINE" />
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormLabel component="legend">オプション</FormLabel>
      <Stack direction='row'>
        {tagOptions.map((tag) => (
          <Controller
            key={tag.name}
            name={`tags.0.${tag.name}`} // 例: tags.pin
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value} // undefined 対策
                  />
                }
                label={tag.label}
              />
            )}
          />
        ))}
      </Stack>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="詳細情報"
              multiline
              fullWidth
              margin="normal"
              sx={{height: '16rem'}}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          送信
        </Button>
      </form>
    </Box>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      onClick={() => console.log(getValues())}
    >
      VIEW FORM VALUES
    </Button>

    <GenericToast
      open={open}
      setOpen={setOpen}
      message={message}
    />
  </Container>
  )
}
