// this is based on https://github.com/orval-labs/orval/blob/master/samples/react-query/custom-fetch/src/custom-fetch.ts

import type { ProblemDetails } from "@/shared/api/model/ProblemDetails";

import type { ApiError, NetworkError } from "../model/types/error.type";

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (
    contentType &&
    (contentType.includes("application/json") ||
      contentType.includes("application/problem+json"))
  ) {
    return c.json();
  }

  if (contentType && contentType.includes("application/pdf")) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getBaseUrl = (): string => {
  const envBaseUrl: string | undefined = import.meta.env.VITE_API_BASE_URL;
  if (envBaseUrl && envBaseUrl.length > 0) {
    // 末尾スラッシュを削る（//api/... を避けるため）
    return envBaseUrl.replace(/\/+$/, "");
  }

  // Vite + SPA 前提: 未設定なら自オリジンにフォールバック
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  // SSR など window がない環境では空文字にして相対 URL のまま
  return "";
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl, getBaseUrl());
  console.log("request URL:", url);

  return url.toString();
};

// NOTE: Add headers
const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    // Authorization: "token",
    "Content-Type": "application/json",
    ...headers,
  };
};

export const customFetch = async <TBody, ApiError>(
  url: string,
  options: RequestInit
): Promise<TBody> => {
  console.debug("customFetch url, options:", url, options);

  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const request = new Request(requestUrl, requestInit);
  console.debug("Requesting:", request);
  const response = await tryFetch(request);

  if (!response.ok) {
    const error = await getBody<ProblemDetails>(response);
    throw error;
  }

  const body = [204, 205, 304].includes(response.status)
    ? null
    : await getBody<TBody>(response);

  return { status: response.status, data: body } as TBody;
};

const tryFetch = async (request: Request): Promise<Response> => {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const fetchError = error as Error;
    const networkError: NetworkError = {
      type: "about:blank",
      status: 0,
      isNetworkError: true,
      errors: [
        {
          detail: `${fetchError.name}: ${fetchError.message}`,
        },
      ],
    };

    throw networkError;
  }
};
