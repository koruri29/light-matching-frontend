import { ContactMethod } from "@/constants/constants"
import { Tag } from "@/types/post"
import { ApiResponse } from "./response"



export type JobCountsByDate = Record<string, number>

export interface JobView {
  id: string // job_posts.id
  client_id: string
  client_name: string
  work_date: string
  event_name: string
  prefecture: string
  location: string
  description: string
  payment?: string
  contact_method: keyof typeof ContactMethod
  is_closed: boolean
  number_of_position: number
  deadline: string
  tags: Tag[]
}

export interface JobSummary {
  job_counts_by_date : JobCountsByDate,
  jobs: JobView[]
}

export interface JobSummaryResponse extends ApiResponse {
  data: JobSummary
}
