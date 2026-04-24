import { createRoot } from "react-dom/client";
import { setBaseUrl } from "./lib/api-client-react";
import App from "./App";
import "./index.css";

// Replace the old setBaseUrl line with this one:
//setBaseUrl(import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_URL || "");
// Temporarily replace the setBaseUrl line with your actual Supabase URL
setBaseUrl("https://xrtlypmydsttczyysdfm.supabase.co/rest/v1");
createRoot(document.getElementById("root")!).render(<App />);

import { setBaseUrl, setAuthTokenGetter } from "./lib/api-client-react"; // Make sure setAuthTokenGetter is imported

// 1. Fix the URL (Removing the version here might fix the double-path)
setBaseUrl(import.meta.env.VITE_API_BASE_URL || ""); 

// 2. Pass the API Key
setAuthTokenGetter(() => import.meta.env.VITE_SUPABASE_ANON_KEY || null);