export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  // 1. Resolve the URL and Method
  let resolvedUrl = resolveUrl(input);
  const { responseType = "auto", headers: headersInit, ...init } = options;
  const method = resolveMethod(input, init.method);

  // 2. Supabase Filter Logic
  if (method === "GET" && resolvedUrl.includes("?")) {
    const [path, query] = resolvedUrl.split("?");
    const params = new URLSearchParams(query);
    
    params.forEach((value, key) => {
      // If the value already has a dot (like gte. or eq.), skip it
      if (value.includes(".")) return;

      // Handle the date filters for the Summary view
      if (path.includes("/summary")) {
        if (key === 'from') {
          params.set(key, `gte.${value}`);
        } else if (key === 'to') {
          params.set(key, `lte.${value}`);
        } else {
          params.set(key, `eq.${value}`);
        }
      } else {
        // Standard table filtering
        params.set(key, `eq.${value}`);
      }
    });
    resolvedUrl = `${path}?${params.toString()}`;
  }

  // 3. Apply Base URL
  const finalInput = applyBaseUrl(resolvedUrl);

  if (init.body != null && (method === "GET" || method === "HEAD")) {
    throw new TypeError(`customFetch: ${method} requests cannot have a body.`);
  }

  // 4. Headers and Auth
  const headers = mergeHeaders(isRequest(input) ? input.headers : undefined, headersInit);

  if (typeof init.body === "string" && !headers.has("content-type") && looksLikeJson(init.body)) {
    headers.set("content-type", "application/json");
  }

  if (responseType === "json" && !headers.has("accept")) {
    headers.set("accept", DEFAULT_JSON_ACCEPT);
  }

  if (_authTokenGetter && !headers.has("authorization")) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("apikey", token);
    }
  }

  const requestInfo = { method, url: resolvedUrl };

  // 5. Execute Fetch
  const response = await fetch(finalInput, { ...init, method, headers });

  if (!response.ok) {
    const errorData = await parseErrorBody(response, method);
    throw new ApiError(response, errorData, requestInfo);
  }

  return (await parseSuccessBody(response, responseType, requestInfo)) as T;
}