import React from 'react'
import { JobView } from '@/types/index'
import { formatDateToJapanese } from '@/utils/format'
import { Card, CardContent, SxProps, Theme, Typography } from '@mui/material'
import { JobTags } from '@/app/jobs/JobTags'
import theme from '@theme'
import MuiThemeProvider from '@/components/lib/MuiThemeProvider'
import { CONTENT_WIDTH } from '@/constants/styles'


interface PostsProps {
  posts: JobView[],
}
interface JoPostFieldProps {
  label: string
  content: string
  textVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
  sx?: SxProps<Theme>
  className?: string
  isDescription?: true
}

const JobPostField = ({
  label,
  content,
  textVariant,
  sx,
  className,
  isDescription,
}: JoPostFieldProps) => {

  return (
    <MuiThemeProvider>
      <div
       className={`block ${className}`}
      >
        <Typography
          variant='overline'
          sx={{
            display: 'inline-block',
            width: '4rem',
            mr: '4px',
            py: '2px',
            textAlign: 'center',
            lineHeight: '1rem',
            color: theme.palette.background.paper,
            border: 1,
            borderColor: theme.palette.grey[500],
            borderRadius: '999999px',
            backgroundColor: theme.palette.grey[500],
            ...sx,
          }}
        >
          {label}
        </Typography>

        {isDescription
          ? content
          : <Typography
            variant={textVariant}
            sx={{
              display: 'inline-block'
            }}
          >
            {content}
          </Typography>
        }

      </div>
    </MuiThemeProvider>
  )
}

export const Posts = ({
  posts
}: PostsProps) => {
  return (
    <>
      {posts.map(post =>(
      <Card
        key={post.id}
        sx={{
          width: CONTENT_WIDTH,
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.paper
          }}
        >

          <Typography
            variant='h3'
            sx={{
              fontSize: '1.25rem',
            }}
          >
            {posts[0].event_name}
          </Typography>

          <JobTags
            tags={post.tags}
          />

          <JobPostField
            label='就業日時'
            content={formatDateToJapanese(post.work_date)}
            textVariant='body1'
            className='my-1'
          />

          <JobPostField
            label='場所'
            content={post.location}
            textVariant='body1'
            className='my-1'
          />

          <JobPostField
            label='支払情報'
            content={post.payment || 'なし'}
            textVariant='body1'
            className='my-1'
          />

          <JobPostField
            label='詳細'
            content={post.description}
            textVariant='body1'
            isDescription
            className='my-1'
          />

        </CardContent>
      </Card>
      ))}
    </>
  )
}
