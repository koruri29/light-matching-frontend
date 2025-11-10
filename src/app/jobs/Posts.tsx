'use client'

import React, { useEffect, useState } from 'react'
import { JobView } from '@/types/index'
import { formatDateToJapanese } from '@/utils/format'
import { Card, CardContent, SxProps, Theme, Typography } from '@mui/material'
import { JobTags } from '@/app/jobs/JobTags'
import theme from '@theme'
import MuiThemeProvider from '@/components/provider/MuiThemeProvider'
import { CONTENT_WIDTH } from '@/constants/styles'
import { fetchAllJobs } from '@/services/jobsApi'


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

export const Posts = () => {
  const [jobs, setJobs] = useState<JobView[]>([])

  useEffect(() => {
    const fetchJobsByDate = async () => {
      try {
        const res = await fetchAllJobs()
        console.log('jobs: ', res?.data)
        if (res !== null) setJobs(res.data)
      } catch (error) {
        console.error(`fetchJobsByDate error: ${error}`)
      }
    }
    fetchJobsByDate()
  }, [])


  return (
    <>
      {jobs.map(job =>{
        const dates = job.job_post_dates
        const startDate = formatDateToJapanese(dates[0].work_date)
        const endDate = formatDateToJapanese(dates[dates.length - 1].work_date)
        const workDate =  `${startDate}～${endDate}`

        return (
          <Card
            key={job.id}
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
                {jobs[0].event_name}
              </Typography>

              <JobTags
                tags={job.job_tags}
              />

              <JobPostField
                label='就業日時'
                content={ workDate }
                textVariant='body1'
                className='my-1'
              />

              <JobPostField
                label='場所'
                content={job.location}
                textVariant='body1'
                className='my-1'
              />

              <JobPostField
                label='支払情報'
                content={job.payment || 'なし'}
                textVariant='body1'
                className='my-1'
              />

              <JobPostField
                label='詳細'
                content={job.description}
                textVariant='body1'
                isDescription
                className='my-1'
              />

            </CardContent>
          </Card>
      )})}
    </>
  )
}
