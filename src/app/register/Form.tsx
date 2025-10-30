'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { PasswordInput } from '@/components/PasswordInput'
import { UserRegisterForm } from '@/types'
import { useRegisterUser } from '@/features/users/hooks'
import GenericToast from '@/components/GenericToast'
import { useToast } from '@/hooks/useToast'
import { AuthProvider } from '@/features/auth/auth/context'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'




export const Form = () => {
  const {
    control,
    handleSubmit
  } = useForm<UserRegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      line: '',
      password: '',
      password_confirmation: '',
    }
  })
  const { handleRegister } = useRegisterUser();
  const {
    open,
    setOpen,
    message,
    showToast,
  } = useToast()


  const onSubmit = async (formData: UserRegisterForm) => {
    console.log('formData: ', formData)

    const result = await handleRegister(formData)
    showToast(result?.message || (
      result.success
        ? 'ユーザー登録に成功しました'
        : 'ユーザー登録に失敗しました'
    ))
  };

  return (
    <AuthProvider>
      <RedirectIfAuthenticated>
        <Container maxWidth="sm">
          <Box sx={{ mt: 5 }}>

            <Typography variant="h4" gutterBottom>
              会員登録
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="氏名（本名）"
                    fullWidth
                    margin="normal"
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="メールアドレス"
                    fullWidth
                    margin="normal"
                  />
                )}
              />

              <Controller
                name="line"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="LINE ID"
                    fullWidth
                    margin="normal"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    {...field}
                    inputRef={field.ref}
                    sx={{width: '100%'}}
                  />
                )}
              />

              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="password_confirmation"
                    label='パスワード（確認）'
                    {...field}
                    inputRef={field.ref}
                    sx={{width: '100%'}}
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

          <GenericToast open={open} setOpen={setOpen} message={message} />
        </Container>
      </RedirectIfAuthenticated>
    </AuthProvider>
  )
}
