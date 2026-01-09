export type ApiErrorKind = ApiError["kind"];

// network error (including DNS failure, network unreachable, CORS misconfiguration, etc.)
export type NetworkError = {
  kind: "network";
  url: string;
  /** original error thrown by fetch (TypeError, DOMException, etc.) */
  cause: unknown;
};

// server error (4xx/5xx HTTP status)
export type HttpError<E> = {
  kind: "http";
  url: string;
  status: number;
  statusText: string;
  headers: Headers;
  /** server error response */
  body: E;
};

export type ApiError<E = unknown> = NetworkError | HttpError<E>;
