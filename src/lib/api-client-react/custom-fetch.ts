// Explicitly export types required by your generated api.ts
export type ErrorType<T = unknown> = ApiError<T>;
export type BodyType<T> = T;
export type AuthTokenGetter = () => Promise<string | null> | string | null;

export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

let _baseUrl: string | null = null;
let _authTokenGetter: AuthTokenGetter | null = null;

export function setBaseUrl(url: string | null): void { _baseUrl = url; }
export function setAuthTokenGetter(getter: AuthTokenGetter | null): void { _authTokenGetter = getter; }

export class ApiError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | null;
  constructor(response: Response, data: T | null, url: string) {
    super(`HTTP ${response.status} at ${url}`);
    this.status = response.status;
    this.data = data;
  }
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  let urlStr = typeof input === "string" ? input : (input instanceof URL ? input.toString() : input.url);
  const { headers: headersInit, ...init } = options;
  const method = init.method?.toUpperCase() || "GET";

  // 1. Path Redirection
  const isSummary = urlStr.includes("/waste-events/summary");
  if (isSummary) {
    urlStr = urlStr.replace("/waste-events/summary", "/waste_events_summary");
  }

  // 2. Translate Filters (Fixes 400 Errors)
  if (method === "GET" && urlStr.includes("?")) {
    const [path, query] = urlStr.split("?");
    const oldParams = new URLSearchParams(query);
    const newParams = new URLSearchParams();

    oldParams.forEach((value, key) => {
      // Map 'from' and 'to' to 'recordedAt' with Supabase operators
      if (key === 'from') {
        newParams.append('recordedAt', `gte.${value}`);
      } else if (key === 'to') {
        newParams.append('recordedAt', `lte.${value}`);
      } else if (!value.includes(".")) {
        newParams.append(key, `eq.${value}`);
      } else {
        newParams.append(key, value);
      }
    });
    urlStr = `${path}?${newParams.toString()}`;
  }

  // 3. Build Final URL
  const base = (_baseUrl || "").replace(/\/+$/, "");
  const finalUrl = urlStr.startsWith("http") ? urlStr : `${base}/${urlStr.replace(/^\/+/, "")}`;

  // 4. Auth & Headers
  const headers = new Headers(headersInit);
  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Force single object for summary
  if (isSummary) {
    headers.set("Accept", "application/vnd.pgrst.object+json");
  }

  const response = await fetch(finalUrl, { ...init, method, headers });
  
  // Handle empty responses
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!response.ok) throw new ApiError(response, data, finalUrl);
  return data as T;
}