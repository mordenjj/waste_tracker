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
  let url = typeof input === "string" ? input : (input instanceof URL ? input.toString() : input.url);
  const { headers: headersInit, ...init } = options;
  const method = init.method?.toUpperCase() || "GET";

  // 1. Path Redirection for Analytics
  const isSummary = url.includes("/waste-events/summary");
  if (isSummary) {
    url = url.replace("/waste-events/summary", "/waste_events_summary");
  }

  // 2. Translate filters from frontend (from/to) to Supabase (recordedAt + operators)
  if (method === "GET" && url.includes("?")) {
    const [path, query] = url.split("?");
    const params = new URLSearchParams(query);
    const translated = new URLSearchParams();

    params.forEach((val, key) => {
      const value = String(val);
      if (value.includes(".")) { translated.append(key, value); return; }
      
      if (key === 'from') translated.append('recordedAt', `gte.${value}`);
      else if (key === 'to') translated.append('recordedAt', `lte.${value}`);
      else translated.append(key, `eq.${value}`);
    });
    url = `${path}?${translated.toString()}`;
  }

  const finalUrl = url.startsWith("http") ? url : `${(_baseUrl || "").replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
  const headers = new Headers(headersInit);

  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Tell Supabase to return an object instead of an array for summary requests
  if (isSummary) {
    headers.set("Accept", "application/vnd.pgrst.object+json");
  }

  const response = await fetch(finalUrl, { ...init, method, headers });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) throw new ApiError(response, data, finalUrl);
  return data as T;
}