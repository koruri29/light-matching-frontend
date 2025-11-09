import { ContactMethod } from "@/constants/constants"
import { Tag } from "@/types/post"


export type JobsByDate = Record<string, number> // YYYY-MM-DD, 件数

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
