import {
  ContactMethod,
  TagBooleanMap,
  YES_NO_OPTIONS
} from "@/constants/constants"
import { PrefectureLabel } from "@/constants/prefectures"
import { Dayjs } from "dayjs"
import { FieldPath } from "react-hook-form"

export interface WorkDate {
  work_date: string
  number_of_position: string
}

export interface JobPostForm {
  is_public: (typeof YES_NO_OPTIONS)[keyof typeof YES_NO_OPTIONS]
  event_name: string
  start_date: Dayjs | null
  end_date: Dayjs | null
  work_dates: WorkDate[]
  prefecture: PrefectureLabel
  location: string
  payment: string
  contact_method: (typeof ContactMethod)[keyof typeof ContactMethod]
  deadline: Dayjs | null
  tags: TagBooleanMap[],
  description: string
}

export type JobPostFormPath = FieldPath<JobPostForm>
