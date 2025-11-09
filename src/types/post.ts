import { ContactMethod, TagBooleanMap, TAGS } from "@/constants/constants"


export interface JobPost {
  client_id: string
  event_name: string
  prefecture: string
  location: string
  description: string
  payment?: string
  contact_method: keyof typeof ContactMethod
  is_public: boolean
  is_closed: boolean
  deadline: string
  number_of_position: number
}

export type TagNameUnion = typeof TAGS[keyof typeof TAGS];

export interface JobPostDate {
  work_date: string
  start_time?: string
  end_time?: string
}

export interface NextCreateJobPostItems {
  job_post: JobPost
  tags: TagBooleanMap
  dates: JobPostDate[]
}
