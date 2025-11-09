import React from 'react'
import { Typography } from '@mui/material'
import theme from '@theme'
import { TAGS } from '@/constants/constants'
import { JobTag } from '@/types'


interface TagItemProps {
  label: string
  selected: boolean
  className?: string
}

const TagItem = ({
  label,
  selected,
  className
}: TagItemProps) => {
  const sx = {
    display: 'inline-block',
    mx: '0.25rem',
    px: '0.25rem',
    py: '2px',
    textAlign: 'center',
    lineHeight: '1rem',
    color: theme.palette.background.paper,
    border: 1,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '999999px',
  }
  return (
    <Typography
      variant='overline'
      sx={{
        ...sx,
        color:
          selected
          ? theme.palette.background.paper
          : theme.palette.grey[400],
        backgroundColor:
          selected
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        borderColor:
          selected
          ? theme.palette.primary.main
          : theme.palette.grey[400],
      }}
      className={className}
    >
      {label}
    </Typography>
  )
}

interface JobTagsProps {
  tags: JobTag[]
}

export const JobTags = ({
  tags,
}: JobTagsProps) => {

  const pinSelected = tags.some(t => t.name === TAGS.PIN)
  const trussSelected = tags.some(t => t.name === TAGS.TRUSS)
  const preStaySelected = tags.some(t => t.name === TAGS.PRE_STAY)
  const postStaySelected = tags.some(t => t.name === TAGS.POST_STAY)

  return (
    <div
      className='my-2'
    >
      <div
        className='my-1'
      >
        <TagItem
          label='ピン作業あり'
          selected={pinSelected}

        />
        <TagItem
          label='トラス作業あり'
          selected={trussSelected}

        />
      </div>

      <div
        className='my-1'
        >
      <TagItem
        label='前泊の可能性あり'
        selected={preStaySelected}
        />
      <TagItem
        label='後泊の可能性あり'
        selected={postStaySelected}
        />
      </div>

    </div>
  )
}
