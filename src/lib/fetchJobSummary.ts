import { ApiResponse, JobSummary } from "@/types";
import { fetcher } from "@/lib/fetcher";

export async function fetchJobSummary(): Promise<ApiResponse<JobSummary>> {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/jobs`
  try {
    const result = await fetcher<ApiResponse<JobSummary>>(endpoint, {
      credentials: 'include',
    })
    if (result === null) {
      return {
        success: false,
        data: {
          job_counts_by_date: {},
          jobs: [],
        },
        errors: 'res not ok'
      }
    }
    return result
  } catch (error) {
    console.error('failed to fetch jobSummary: ', error)
    return {
      success: false,
      data: {
        job_counts_by_date: {},
        jobs: [],
      },
      errors: error
    }
  }
}
