'use client'

import React from 'react'
import GenericToast from '@/components/GenericToast'
import { PasswordInput } from '@/components/PasswordInput'
import { useLogin } from '@/features/auth/login/hooks'
import { useToast } from '@/hooks/useToast'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import { AuthProvider } from '@/features/auth/auth/context'
import { useRouter } from 'next/navigation'


interface LoginForm {
  email: string
  password: string
}


export const Login = () => {
  const {
    control,
    handleSubmit,
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const router = useRouter();
  const { handleLogin } = useLogin()
  const {
    open,
    setOpen,
    message,
    showToast,
  } = useToast()


  const handleLoginSubmit = async (formData: LoginForm) => {
    const result = await handleLogin(formData.email, formData.password)
    if (result?.success) {
      router.push("/jobs")
    } else {
      showToast(result?.message || 'ログインに失敗しました')
    }
  }


  return (
    <AuthProvider>
      <RedirectIfAuthenticated>
        <Card
          className='w-72 mx-auto'
        >
          <CardContent>

            <Typography>
              会員ログイン
            </Typography>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="メールアドレス"
                  fullWidth
                  multiline
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

            <Button
              variant='contained'
              onClick={handleSubmit(handleLoginSubmit)}
              sx={{
                display: 'block',
                marginX: 'auto',
              }}
            >
              ログイン
            </Button>

            <Link href="#">
              パスワードを忘れた方はこちら
            </Link>

            <Button
              variant='contained'
              sx={{
                display: 'block',
                marginX: 'auto',
              }}
            >
              新規会員登録はこちら
            </Button>

          </CardContent>

          <GenericToast open={open} setOpen={setOpen} message={message} />
        </Card>
      </RedirectIfAuthenticated>
    </AuthProvider>
  )
}
