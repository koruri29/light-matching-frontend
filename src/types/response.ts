export interface ApiResponse<T = unknown, E = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: E;
}
