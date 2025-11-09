import { ContactMethod } from "@/constants/constants"


export type JobsByDate = Record<string, number> // YYYY-MM-DD, 件数

export interface JobPostDates {
  id: number
  job_post_id: number
  work_date: string
  number_of_position: number
}

export type JobTag = {
  id: number
  name: string
  kana_name: string
  sort_order: number
  pivot?: {
    job_post_id: number
    job_tag_id: number
  }
}

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
  deadline: string
  job_post_dates: JobPostDates[]
  job_tags: JobTag[]
}

export interface PaginatedJobPosts {
  current_page: number;
  data: JobView[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
