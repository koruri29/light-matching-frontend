import { TagBooleanMap, YES_NO_OPTIONS } from "@/constants/constants"
import {
  JobPost,
  JobPostDate,
  JobPostForm,
  NextCreateJobPostItems
} from "@/types"
import { Dayjs } from "dayjs"

export const formatFormData = (formData: JobPostForm): NextCreateJobPostItems => {
  // 依頼の成形
  const jobPost: JobPost = {
    event_name: formData.event_name,
    prefecture: formData.prefecture,
    location: formData.location,
    description: formData.description,
    contact_method: formData.contact_method,
    is_public: formData.is_public === YES_NO_OPTIONS.YES,
    is_closed: false,
    deadline: formData.deadline ? formData.deadline.format('YYYY-MM-DD') : '',
  }
  if (formData.payment) jobPost.payment = formData.payment

  // タグ
  const tagValues = formData.tags[0]
  const tags: TagBooleanMap = {
    pin: !!tagValues.pin,
    truss: !!tagValues.truss,
    pre_stay: !!tagValues.pre_stay,
    post_stay: !!tagValues.post_stay,
  }

  // 日付
  const dates: JobPostDate[] = []
  for (const workDate of formData.work_dates) {
    const number_of_position = Number(workDate.number_of_position)
    const date: JobPostDate = {
      work_date: workDate.work_date,
      number_of_position:
        isNaN(number_of_position) ? 0 : number_of_position,
    }
    dates.push(date)
  }

  return {
    job_post: jobPost,
    tags,
    dates,
  }
}

export function generateDateRange(startDate: Dayjs | null, endDate: Dayjs | null): string[] {
  if (!startDate || !endDate) return []

  const dates: string[] = [];

  let current = startDate.startOf('day');
  const final = endDate.startOf('day');

  while (current.isSameOrBefore(final)) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return dates;
}
