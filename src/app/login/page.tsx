import React from 'react'
import { Login } from '@/app/login/Login'
import LoginRedirect from '@/components/auth/LoginRedirect'

const LoginPage = () => {
  return (
    <>
      <LoginRedirect />
      <Login />
    </>
  )
}

export default LoginPage
