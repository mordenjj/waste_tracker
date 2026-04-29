export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  let urlStr = typeof input === "string" ? input : (input instanceof URL ? input.toString() : input.url);
  const { headers: headersInit, ...init } = options;
  const method = init.method?.toUpperCase() || "GET";

  // 1. Redirect Path
  const isSummary = urlStr.includes("/waste-events/summary");
  if (isSummary) {
    urlStr = urlStr.replace("/waste-events/summary", "/waste_events_summary");
  }

  // 2. Translate Dates (This is what should be stripping 'from' and 'to')
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

  const base = (_baseUrl || "").replace(/\/+$/, "");
  const finalUrl = urlStr.startsWith("http") ? urlStr : `${base}/${urlStr.replace(/^\/+/, "")}`;
  const headers = new Headers(headersInit);

  if (_authTokenGetter) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("apikey", token);
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  if (isSummary) {
    headers.set("Accept", "application/vnd.pgrst.object+json");
  }

  const response = await fetch(finalUrl, { ...init, method, headers });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) throw new ApiError(response, data, finalUrl);
  return data as T;
}