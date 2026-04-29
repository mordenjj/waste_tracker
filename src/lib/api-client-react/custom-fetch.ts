export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

export type ErrorType<T = unknown> = ApiError<T>;
export type BodyType<T> = T;
export type AuthTokenGetter = () => Promise<string | null> | string | null;

const NO_BODY_STATUS = new Set([204, 205, 304]);
const DEFAULT_JSON_ACCEPT = "application/json, application/problem+json";

let _baseUrl: string | null = null;
let _authTokenGetter: AuthTokenGetter | null = null;

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : null;
}

export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  _authTokenGetter = getter;
}

function isRequest(input: RequestInfo | URL): input is Request {
  return typeof Request !== "undefined" && input instanceof Request;
}

function resolveMethod(input: RequestInfo | URL, explicitMethod?: string): string {
  if (explicitMethod) return explicitMethod.toUpperCase();
  if (isRequest(input)) return input.method.toUpperCase();
  return "GET";
}

function resolveUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function applyBaseUrl(input: string): string {
  if (!_baseUrl || input.startsWith("http")) return input;
  const base = _baseUrl.replace(/\/+$/, "");
  const path = input.startsWith("/") ? input : `/${input}`;
  return `${base}${path}`;
}

function mergeHeaders(...sources: Array<HeadersInit | undefined>): Headers {
  const headers = new Headers();
  for (const source of sources) {
    if (!source) continue;
    new Headers(source).forEach((value, key) => headers.set(key, value));
  }
  return headers;
}

function looksLikeJson(text: string): boolean {
  const trimmed = text.trimStart();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
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

async function parseErrorBody(response: Response, method: string): Promise<unknown> {
  try {
    const text = await response.text();
    return looksLikeJson(text) ? JSON.parse(text) : text;
  } catch { return null; }
}

async function parseSuccessBody(response: Response, responseType: string, requestInfo: { method: string }): Promise<unknown> {
  if (response.status === 204) return null;
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  let resolvedUrl = resolveUrl(input);
  const { responseType = "auto", headers: headersInit, ...init } = options;
  const method = resolveMethod(input, init.method);

  // 1. Interceptor: Fix the 404 by routing to the stable view name
  if (resolvedUrl.includes("/waste-events/summary")) {
    resolvedUrl = resolvedUrl.replace("/waste-events/summary", "/waste_events_summary");
  }

  // 2. Supabase Filter Formatting: Fix the 400 errors
  if (method === "GET" && resolvedUrl.includes("?")) {
    const [path, query] = resolvedUrl.split("?");
    const params = new URLSearchParams(query);
    
    params.forEach((val, key) => {
      const value = String(val);
      if (value.includes(".")) return;

      if (key === 'from') {
        params.set('recordedAt', `gte.${value}`);
        params.delete('from');
      } else if (key === 'to') {
        params.append('recordedAt', `lte.${value}`);
        params.delete('to');
      } else {
        params.set(key, `eq.${value}`);
      }
    });
    resolvedUrl = `${path}?${params.toString()}`;
  }

  // 3. Final URL Construction
  const finalUrl = applyBaseUrl(resolvedUrl);
  const headers = mergeHeaders(isRequest(input) ? input.headers : headersInit);

  // 4. Auth: Supabase requires BOTH headers
  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(finalUrl, { ...init, method, headers });

  if (!response.ok) {
    const errorData = await parseErrorBody(response, method);
    throw new ApiError(response, errorData, { method, url: resolvedUrl });
  }

  return (await parseSuccessBody(response, responseType, { method })) as T;
}