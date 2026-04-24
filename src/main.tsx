//import { createRoot } from "react-dom/client";
//import { setBaseUrl } from "./lib/api-client-react";
//import App from "./App";
//import "./index.css";

// Replace the old setBaseUrl line with this one:
//setBaseUrl(import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_URL || "");
// Temporarily replace the setBaseUrl line with your actual Supabase URL
//setBaseUrl("https://xrtlypmydsttczyysdfm.supabase.co/rest/v1");
//createRoot(document.getElementById("root")!).render(<App />);

//import { setBaseUrl, setAuthTokenGetter } from "./lib/api-client-react"; // Make sure setAuthTokenGetter is imported

// 1. Fix the URL (Removing the version here might fix the double-path)
//setBaseUrl(import.meta.env.VITE_API_BASE_URL || ""); 

// 2. Pass the API Key
//setAuthTokenGetter(() => import.meta.env.VITE_SUPABASE_ANON_KEY || null);

import { createRoot } from "react-dom/client";
import { setBaseUrl, setAuthTokenGetter } from "./lib/api-client-react";
import App from "./App";
import "./index.css";

// 1. Set the Base URL
// We are using the environment variable from Azure, or falling back to the hardcoded one if Azure fails.
const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://xrtlypmydsttczyysdfm.supabase.co/rest/v1";
setBaseUrl(baseUrl);

// 2. Pass the API Key (The ID Badge)
// This tells the app to use the Anon Key for every request to stop the 401 errors.
//setAuthTokenGetter(() => import.meta.env.VITE_SUPABASE_ANON_KEY || null);

// 3. Render the App
createRoot(document.getElementById("root")!).render(<App />);

// Add this to your main.tsx where you set the token
setAuthTokenGetter(() => {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  // This is a bit of a hack, but if the library allows it, 
  // it might help attach the necessary credentials.
  return key; 
});