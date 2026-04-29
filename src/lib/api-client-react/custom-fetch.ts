export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

export type ErrorType<T = unknown> = ApiError<T>;
export type BodyType<T> = T;
export type AuthTokenGetter = () => Promise<string | null> | string | null;

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

  // 1. Path & Parameter Transformation
  const isSummary = urlStr.includes("/waste-events/summary");
  if (isSummary) {
    urlStr = urlStr.replace("/waste-events/summary", "/waste_events_summary");
  }

  if (method === "GET" && urlStr.includes("?")) {
    const [path, query] = urlStr.split("?");
    const oldParams = new URLSearchParams(query);
    const newParams = new URLSearchParams();

    oldParams.forEach((value, key) => {
      if (value.includes(".")) {
        newParams.append(key, value);
      } else if (key === 'from') {
        newParams.append('recordedAt', `gte.${value}`);
      } else if (key === 'to') {
        newParams.append('recordedAt', `lte.${value}`);
      } else {
        newParams.append(key, `eq.${value}`);
      }
    });
    urlStr = `${path}?${newParams.toString()}`;
  }

  // 2. Build Final Absolute URL
  const base = (_baseUrl || "").replace(/\/+$/, "");
  const cleanPath = urlStr.startsWith("/") ? urlStr : `/${urlStr}`;
  const finalUrl = urlStr.startsWith("http") ? urlStr : `${base}${cleanPath}`;

  // 3. Set Headers
  const headers = new Headers(headersInit);
  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Mandatory header for single-row View returns
  if (isSummary) {
    headers.set("Accept", "application/vnd.pgrst.object+json");
  }

  const response = await fetch(finalUrl, { ...init, method, headers });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) throw new ApiError(response, data, finalUrl);
  return data as T;
}