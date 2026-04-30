import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "waste_tracker_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing restrictions, etc.)
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // localStorage unavailable — still dismiss the banner visually
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-border bg-card shadow-lg"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-foreground leading-relaxed">
          This site stores a consent preference in your browser&rsquo;s local storage to remember
          your choice on this banner. No tracking cookies or personal data are collected.{" "}
          <Link
            href="/cookie-policy"
            className="underline underline-offset-4 font-semibold hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            Cookie Policy
          </Link>
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="flex-none font-mono font-bold text-sm px-5 py-2 bg-primary text-primary-foreground rounded-md border border-border hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
