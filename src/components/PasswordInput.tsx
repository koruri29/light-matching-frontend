'use client'

import React from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput, SxProps, Theme } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


interface PasswordInputProps {
  id: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  name: string
  label?: string
  inputRef?: React.Ref<HTMLInputElement>
  className?: string
  sx?: SxProps<Theme>
}

export const PasswordInput = ({
  id,
  value,
  onChange,
  onBlur,
  name,
  label = 'パスワード',
  inputRef,
  className,
  sx,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <FormControl sx={{ marginX: 'auto', width: '100%' }} variant="outlined" className='w-full'>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        inputRef={inputRef}
        className={className}
        sx={sx}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'パスワードを隠す' : 'パスワードを表示'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="パスワード"
      />
    </FormControl>
  )
}
