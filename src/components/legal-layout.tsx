import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-bold focus:text-sm focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono font-bold text-lg tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
            aria-label="Waste Tracker home"
          >
            WASTE_TRACKER
          </Link>
          <Link
            href="/"
            aria-label="Return to home page"
            className="flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 border-2 border-border rounded-md bg-background hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            HOME
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-6 py-12 outline-none">
        <article>
          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="font-mono font-bold text-3xl sm:text-4xl mb-2">{title}</h1>
            <p className="text-muted-foreground text-sm font-mono">Last updated: {lastUpdated}</p>
          </header>

          <div className="prose-content space-y-8 text-foreground leading-relaxed">
            {children}
          </div>
        </article>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <nav aria-label="Legal pages" className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-4">
            <Link
              href="/cookie-policy"
              className="font-mono text-xs text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
            >
              Cookie Policy
            </Link>
            <Link
              href="/privacy-policy"
              className="font-mono text-xs text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
          <p className="font-mono text-xs text-muted-foreground text-center">
            WASTE_TRACKER &mdash; a student project by Josh Morden
          </p>
        </div>
      </footer>
    </div>
  );
}
