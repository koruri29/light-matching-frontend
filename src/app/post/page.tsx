import React from 'react'
import { Form } from '@/app/post/Form'
import UserRedirect from '@/components/auth/UserRedirect'

const PostPage = () => {
  return (
    <>
      <UserRedirect />
      <Form />
    </>
  )
}

export default PostPage
