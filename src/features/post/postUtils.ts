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
    client_id: '1', // TODO: 認証できたら修正
    event_name: formData.event_name,
    prefecture: formData.prefecture,
    location: formData.location,
    description: formData.description,
    contact_method: formData.contact_method,
    is_public: formData.is_public === YES_NO_OPTIONS.YES,
    is_closed: false,
    number_of_position: formData.number_of_position
      ? parseInt(formData.number_of_position)
      : 0,
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
  const workDates = generateDateRange(formData.start_date, formData.end_date)
  for (const workDate of workDates) {
    const date: JobPostDate = {
      work_date: workDate,
    }
    dates.push(date)
  }

  return {
    job_post: jobPost,
    tags,
    dates,
  }
}

function generateDateRange(startDate: Dayjs | null, endDate: Dayjs | null): string[] {
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
