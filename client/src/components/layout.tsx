import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { FileText, Clock, BarChart3, ArrowLeft } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/app", label: "LOG", icon: FileText },
    { href: "/app/history", label: "HISTORY", icon: Clock },
    { href: "/app/review", label: "REVIEW", icon: BarChart3 },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground max-w-3xl mx-auto border-x border-border shadow-xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>

      <header className="flex-none p-4 border-b border-border bg-card flex items-center justify-between">
        <span className="font-mono font-bold text-xl tracking-tight uppercase">
          WASTE_TRACKER
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="sr-only">API connected</span>
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          </div>
          <Link
            href="/"
            aria-label="Return to landing page"
            className="flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 border-2 border-border rounded-md bg-background hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            HOME
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 overflow-auto p-4 sm:p-6 bg-secondary/30">
        {children}
      </main>

      <nav aria-label="App navigation" className="flex-none grid grid-cols-3 border-t border-border bg-card">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center p-4 select-none transition-colors border-r border-border last:border-r-0 hover:bg-secondary/50 active:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary active:bg-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" aria-hidden="true" />
              <span className="font-mono text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
