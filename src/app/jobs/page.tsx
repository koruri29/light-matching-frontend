import React from 'react'
import { Calendar } from '@/app/jobs/Calender/Calender'
import { Search } from '@/app/jobs/Search'
import { Posts } from '@/app/jobs/Posts'
// import { JobPostView } from '@/types/index'
// import { ContactMethod, TAGS } from '@/constants/constants'
import { Container } from '@mui/material'
import { CONTENT_WIDTH } from '@/constants/styles'
import { fetchJobSummary } from '@/lib/fetchJobSummary'


// const tmpJobPostInfo: JobPostView = {
//   id: 'jp-1',
//   client_id: '1',
//   client_name: '第一照明株式会社',
//   work_date: '2025-06-05',
//   event_name: 'サザンオールスターズ2025年全国ツアー',
//   prefecture: '東京都',
//   location: '東京都文京区春日1-16-21',
//   description: '昔々、子どものいなかったおじいさんとおばあさんが、川から流れてきた大きな桃を拾うと、中から男の子が生まれ「桃太郎」と名付けられました。成長した桃太郎は鬼退治を決意し、きびだんごで犬・猿・キジを仲間にして鬼ヶ島へ出発。力を合わせて鬼を退治し、奪われた宝を村に持ち帰り、みんなと幸せに暮らしました。',
//   contact_method: ContactMethod.email,
//   is_closed: false,
//   number_of_position: 3,
//   deadline: '2025-05-05',
//   tags: [TAGS.PIN, TAGS.POST_STAY],
// }

// const tmpJobsCountByDate = {
//   '2025-07-15': 1,
//   '2025-07-16': 2,
//   '2025-07-17': 3,
// }

const JobsPage = async () => {
  const jobSummary = await fetchJobSummary()

  return (
    <Container
      sx={{
        width: CONTENT_WIDTH,
      }}
    >
      <Calendar
        jobCounts={jobSummary.data.job_counts_by_date}
      />

      <Search />

      <Posts
        posts={jobSummary.data.jobs}
      />
    </Container>
  )
}

export default JobsPage
