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

function resolveUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function applyBaseUrl(input: string): string {
  if (!_baseUrl || input.startsWith("http")) return input;
  return `${_baseUrl.replace(/\/+$/, "")}/${input.replace(/^\/+/, "")}`;
}

export class ApiError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | null;
  constructor(response: Response, data: T | null, requestInfo: { method: string; url: string }) {
    super(`HTTP ${response.status}: ${requestInfo.method} ${requestInfo.url}`);
    this.status = response.status;
    this.data = data;
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  let resolvedUrl = resolveUrl(input);
  const { responseType: _rt, headers: headersInit, ...init } = options;
  const method = init.method?.toUpperCase() || "GET";

  // 1. Path Interceptor: Route /waste-events/summary to /waste_events_summary
  if (resolvedUrl.includes("/waste-events/summary")) {
    resolvedUrl = resolvedUrl.replace("/waste-events/summary", "/waste_events_summary");
  }

  // 2. Param Translator: Convert ?from=X&to=Y to ?recordedAt=gte.X&recordedAt=lte.Y
  if (method === "GET" && resolvedUrl.includes("?")) {
    const [path, query] = resolvedUrl.split("?");
    const params = new URLSearchParams(query);
    const newParams = new URLSearchParams();

    params.forEach((value, key) => {
      if (value.includes(".")) {
        newParams.append(key, value);
        return;
      }
      if (key === 'from') newParams.append('recordedAt', `gte.${value}`);
      else if (key === 'to') newParams.append('recordedAt', `lte.${value}`);
      else if (key === 'station' || key === 'wasteReason') newParams.append(key, `eq.${value}`);
      else newParams.append(key, `eq.${value}`);
    });
    resolvedUrl = `${path}?${newParams.toString()}`;
  }

  const finalUrl = applyBaseUrl(resolvedUrl);
  const headers = new Headers(headersInit);

  // 3. Supabase Headers
  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(finalUrl, { ...init, method, headers });

  if (!response.ok) {
    const errorData = await parseBody(response);
    throw new ApiError(response, errorData as T, { method, url: resolvedUrl });
  }

  return (await parseBody(response)) as T;
}