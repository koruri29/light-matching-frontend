import { ContactMethod, TagBooleanMap, TAGS } from "@/constants/constants"


export interface JobPost {
  event_name: string
  prefecture: string
  location: string
  description: string
  payment?: string
  contact_method: keyof typeof ContactMethod
  is_public: boolean
  is_closed: boolean
  deadline: string
}

export type Tag = typeof TAGS[keyof typeof TAGS];

export interface JobPostDate {
  work_date: string
  number_of_position: number
  start_time?: string
  end_time?: string
}

export interface NextCreateJobPostItems {
  job_post: JobPost
  tags: TagBooleanMap
  dates: JobPostDate[]
}
