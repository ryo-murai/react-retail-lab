import type { ErrorDetail, ProblemDetails } from "@/shared/api/model/ProblemDetails";

type ApiErrorResponse = ProblemDetails;

export type NetworkError = {
  type: "about:blank";
  title?: string;
  status: 0;
  detail?: string;
  instance?: string;
  isNetworkError: true;
  errors?: ErrorDetail[];
}

export type ApiError = ApiErrorResponse | NetworkError;
