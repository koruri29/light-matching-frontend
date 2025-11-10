import { apiClient } from "@/lib/apiClient";
import { JobsByDate, PaginatedJobPosts } from "@/types";
import { handleAxiosError } from "@/utils/axiosErrorHandler";


export async function fetchAllJobs(): Promise<PaginatedJobPosts | null> {
  try {
    const res = await apiClient.get<PaginatedJobPosts>('/jobs');

    if ('errors' in res.data && res.data.errors) {
      console.error(`fetchAllJobs API returned errors: ${JSON.stringify(res.data.errors)}`);
      throw new Error('API returned errors');
    }

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, fetchAllJobs.name)
    return null
  }
}

export async function fetchJobPostCountByDate(): Promise<JobsByDate> {
  try {
    const res = await apiClient.get<JobsByDate>('/job-counts');

    if ('errors' in res.data && res.data.errors) {
      console.error(`fetchJobPostCountByDate API returned errors: ${JSON.stringify(res.data.errors)}`);
      throw new Error('API returned errors');
    }

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, fetchJobPostCountByDate.name)
    return {} as JobsByDate;
  }
}
