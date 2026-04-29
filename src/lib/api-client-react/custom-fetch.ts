export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

export type ErrorType<T = unknown> = ApiError<T>;
export type BodyType<T> = T;
export type AuthTokenGetter = () => Promise<string | null> | string | null;

let _baseUrl: string | null = null;
let _authTokenGetter: AuthTokenGetter | null = null;

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : null;
}

export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  _authTokenGetter = getter;
}

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
  // 1. Get the raw URL string
  let url = typeof input === "string" ? input : (input instanceof URL ? input.toString() : input.url);
  const { responseType: _rt, headers: headersInit, ...init } = options;
  const method = init.method?.toUpperCase() || "GET";

  // 2. TRANSFORM: Redirect and Parameter Mapping
  // This MUST happen before we join the Base URL
  if (url.includes("/waste-events/summary")) {
    url = url.replace("/waste-events/summary", "/waste_events_summary");
  }

  if (method === "GET" && url.includes("?")) {
    const [path, query] = url.split("?");
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
    url = `${path}?${newParams.toString()}`;
  }

  // 3. Construct Final Absolute URL
  const base = (_baseUrl || "").replace(/\/+$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  const finalUrl = url.startsWith("http") ? url : `${base}${cleanPath}`;

  // 4. Headers & Auth
  const headers = new Headers(headersInit);
  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // 5. Execute
  const response = await fetch(finalUrl, { ...init, method, headers });

  // 6. Parse and Return
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(response, data, url);
  }

  return data as T;
}