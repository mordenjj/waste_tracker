import { createRoot } from "react-dom/client";
import { setBaseUrl, setAuthTokenGetter } from "./lib/api-client-react";
import App from "./App";
import "./index.css";

// We set the base URL to just the root. 
// If the generated code adds "/api/waste-events", 
// this will result in: ...supabase.co/api/waste-events
const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://xrtlypmydsttczyysdfm.supabase.co";
setBaseUrl(baseUrl);

// This ensures the token is passed for both Authorization and 'apikey' headers
// (provided you added the 'apikey' line in custom-fetch.ts earlier)
setAuthTokenGetter(() => {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || null;
});

createRoot(document.getElementById("root")!).render(<App />);