import { Link } from "wouter";
import { ClipboardList, Clock, BarChart3, Zap, Shield, Smartphone } from "lucide-react";

const STATIONS = ["Sauté", "Salad", "Prep", "Fry", "Flat"];
const REASONS = ["Burnt food", "Dropped", "Prep mistake", "Expired"];

const FEATURES = [
  {
    icon: Zap,
    title: "Log in under 10 seconds",
    description:
      "Large touch targets for station and waste reason — designed for speed during live service, even with wet or gloved hands.",
  },
  {
    icon: Smartphone,
    title: "Built for tablets and phones",
    description:
      "Optimised layout for the devices already in your kitchen. No app installation needed — just open a browser.",
  },
  {
    icon: Clock,
    title: "Full shift history",
    description:
      "Browse every waste event with date and station filters. Drill into today, the last 7 days, or all time.",
  },
  {
    icon: BarChart3,
    title: "Analytics at a glance",
    description:
      "See totals by station, a daily trend chart, and a ranked list of waste reasons to spot where to focus improvement.",
  },
  {
    icon: Shield,
    title: "No login required",
    description:
      "Kitchen staff pick up any device and log without usernames or passwords getting in the way.",
  },
  {
    icon: ClipboardList,
    title: "Structured data, not free text",
    description:
      "Fixed station and reason options keep your data clean and consistent — ready for reporting and Azure migration.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-tight">WASTE_TRACKER</span>
          <Link
            href="/app"
            className="font-mono font-bold text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md border border-border active:scale-95 transition-transform inline-block"
          >
            OPEN APP
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section aria-labelledby="hero-heading" className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block font-mono text-xs font-bold px-3 py-1 bg-secondary border border-border rounded-full mb-6 tracking-wider">
            FOR RESTAURANT KITCHEN STAFF
          </div>
          <h1 id="hero-heading" className="font-mono font-bold text-4xl sm:text-5xl leading-tight mb-6">
            Log food waste<br />in under 10 seconds
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            A fast, no-login tool for kitchen teams to record waste events during service — and review trends to cut costs over time.
          </p>
          <Link
            href="/app"
            className="font-mono font-bold text-xl px-10 py-5 bg-primary text-primary-foreground rounded-md border border-border hover:opacity-90 active:scale-95 transition-all shadow-lg inline-block"
          >
            LAUNCH APP
          </Link>
          <p className="text-muted-foreground text-sm mt-4 font-mono">
            No account needed. Works on any browser.
          </p>
        </section>

        <section aria-label="Stations and waste reasons" className="border-y border-border bg-card py-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-mono text-xs text-muted-foreground text-center mb-6 tracking-wider">
              STATIONS
            </h2>
            <div className="flex flex-wrap justify-center gap-3" role="list">
              {STATIONS.map((s) => (
                <span
                  key={s}
                  role="listitem"
                  className="font-bold px-5 py-3 border-2 border-border rounded-md bg-background text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
            <h2 className="font-mono text-xs text-muted-foreground text-center mt-8 mb-6 tracking-wider">
              WASTE REASONS
            </h2>
            <div className="flex flex-wrap justify-center gap-3" role="list">
              {REASONS.map((r) => (
                <span
                  key={r}
                  role="listitem"
                  className="font-bold px-5 py-3 border-2 border-destructive/40 rounded-md bg-destructive/5 text-sm"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="max-w-4xl mx-auto px-6 py-20">
          <h2 id="features-heading" className="font-mono font-bold text-2xl text-center mb-12">
            EVERYTHING YOUR KITCHEN NEEDS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 border-2 border-border rounded-md bg-card flex flex-col gap-3"
              >
                <feature.icon className="h-6 w-6 text-primary flex-none" aria-hidden="true" />
                <h3 className="font-bold text-base leading-snug">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cta-heading" className="border-t border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2 id="cta-heading" className="font-mono font-bold text-2xl mb-4">
              READY TO REDUCE WASTE?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Put a tablet at each station and start logging today. No setup, no accounts, no friction.
            </p>
            <Link
              href="/app"
              className="font-mono font-bold text-lg px-8 py-4 bg-primary text-primary-foreground rounded-md border border-border hover:opacity-90 active:scale-95 transition-all shadow-md inline-block"
            >
              LAUNCH APP
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">WASTE_TRACKER</span>
          <span className="font-mono text-xs text-muted-foreground">
            Backed by PostgreSQL · Portable to Azure
          </span>
        </div>
      </footer>
    </div>
  );
}
