export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  let resolvedUrl = resolveUrl(input);
  const { responseType = "auto", headers: headersInit, ...init } = options;
  const method = resolveMethod(input, init.method);

  // SIMPLE SYNC LOGIC: Convert ?key=value to ?key=eq.value for Supabase
  if (method === "GET" && resolvedUrl.includes("?")) {
    const parts = resolvedUrl.split("?");
    const path = parts[0];
    const query = parts[1];
    const params = new URLSearchParams(query);
    
    params.forEach((value, key) => {
      // If the value already has a dot (like gte. or eq.), do nothing
      if (value && typeof value === 'string' && value.includes(".")) {
        return;
      }
      
      // Handle the Summary view specifically
      if (path.endsWith("/summary")) {
        if (key === "from") {
          params.set(key, `gte.${value}`);
        } else if (key === "to") {
          params.set(key, `lte.${value}`);
        } else {
          params.set(key, `eq.${value}`);
        }
      } else {
        // Standard table behavior
        params.set(key, `eq.${value}`);
      }
    });
    resolvedUrl = `${path}?${params.toString()}`;
  }

  const finalInput = applyBaseUrl(resolvedUrl);

  if (init.body != null && (method === "GET" || method === "HEAD")) {
    throw new TypeError("customFetch: GET/HEAD requests cannot have a body.");
  }

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
  const response = await fetch(finalInput, { ...init, method, headers });

  if (!response.ok) {
    const errorData = await parseErrorBody(response, method);
    throw new ApiError(response, errorData, requestInfo);
  }

  return (await parseSuccessBody(response, responseType, requestInfo)) as T;
}