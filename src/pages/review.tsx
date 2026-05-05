<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLNXL6X0GX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLNXL6X0GX');
</script>





import { useState, useMemo } from "react";
import { useGetWasteEventsSummary, getGetWasteEventsSummaryQueryKey } from "../lib/api-client-react";
import { Layout } from "@/components/layout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";

type DatePreset = "7days" | "30days" | "90days" | "all";

const DATE_PRESETS: { label: string; value: DatePreset }[] = [
  { label: "7 days", value: "7days" },
  { label: "30 days", value: "30days" },
  { label: "90 days", value: "90days" },
  { label: "All time", value: "all" },
];

function getDateRange(preset: DatePreset): { from?: string; to?: string } {
  const now = new Date();
  if (preset === "7days") {
    return { from: startOfDay(subDays(now, 7)).toISOString(), to: now.toISOString() };
  }
  if (preset === "30days") {
    return { from: startOfDay(subDays(now, 30)).toISOString(), to: now.toISOString() };
  }
  if (preset === "90days") {
    return { from: startOfDay(subDays(now, 90)).toISOString(), to: now.toISOString() };
  }
  return {};
}

export default function ReviewScreen() {
  const [datePreset, setDatePreset] = useState<DatePreset>("30days");

  const dateRange = useMemo(() => getDateRange(datePreset), [datePreset]);
  const hasRange = Object.keys(dateRange).length > 0;

  const summaryParams = useMemo(() => hasRange ? dateRange : undefined, [hasRange, dateRange]);

  const { data: summary, isLoading, isError } = useGetWasteEventsSummary(
    summaryParams,
    { query: { enabled: true, queryKey: getGetWasteEventsSummaryQueryKey(summaryParams) } }
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono font-bold text-xl">WASTE ANALYTICS</h2>
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar"
          role="group"
          aria-label="Filter by date range"
        >
          {DATE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              data-testid={`range-preset-${preset.value}`}
              onClick={() => setDatePreset(preset.value)}
              aria-pressed={datePreset === preset.value}
              className={cn(
                "whitespace-nowrap px-3 py-1.5 font-mono text-xs font-bold border-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                datePreset === preset.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4" aria-busy="true" aria-label="Loading analytics">
            <div className="animate-pulse bg-muted rounded-md h-32 w-full" />
            <div className="animate-pulse bg-muted rounded-md h-64 w-full" />
          </div>
        ) : isError || !summary ? (
          <div role="alert" className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md font-mono">
            Error loading analytics.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div
                data-testid="total-events"
                className="bg-card border-2 border-border rounded-md p-4 flex flex-col items-center justify-center"
              >
                <span className="font-mono text-xs text-muted-foreground mb-1">TOTAL EVENTS</span>
                <span className="font-mono text-4xl font-bold">{summary.totalCount}</span>
              </div>
              <div
                data-testid="top-station"
                className="bg-card border-2 border-border rounded-md p-4 flex flex-col items-center justify-center"
              >
                <span className="font-mono text-xs text-muted-foreground mb-1">TOP STATION</span>
                <span className="font-mono text-xl font-bold text-center">
                  {summary.byStation.length > 0
                    ? [...summary.byStation].sort((a, b) => b.count - a.count)[0].station
                    : "N/A"}
                </span>
              </div>
            </div>

            <section aria-label="Events by station chart" className="bg-card border-2 border-border rounded-md p-4">
              <h3 className="font-mono font-bold text-sm mb-4">EVENTS BY STATION</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary.byStation}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis
                      dataKey="station"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontFamily: "Space Mono", fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontFamily: "Space Mono", fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--color-muted)" }}
                      contentStyle={{
                        fontFamily: "Space Mono",
                        borderRadius: "4px",
                        border: "2px solid var(--color-border)",
                      }}
                    />
                    <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section aria-label="Daily trend chart" className="bg-card border-2 border-border rounded-md p-4">
              <h3 className="font-mono font-bold text-sm mb-4">DAILY TREND</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={summary.byDay}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => format(new Date(val + "T00:00:00"), "MMM dd")}
                      tick={{ fontFamily: "Space Mono", fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontFamily: "Space Mono", fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      labelFormatter={(val) => format(new Date(val + "T00:00:00"), "MMM dd, yyyy")}
                      contentStyle={{
                        fontFamily: "Space Mono",
                        borderRadius: "4px",
                        border: "2px solid var(--color-border)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-destructive)"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section aria-label="Waste reason ranking" className="bg-card border-2 border-border rounded-md p-4">
              <h3 className="font-mono font-bold text-sm mb-4">REASON RANKING</h3>
              <ol className="space-y-3" data-testid="reason-ranking" aria-label="Waste reasons ranked by count">
                {[...summary.byReason]
                  .sort((a, b) => b.count - a.count)
                  .map((reason, idx) => (
                    <li
                      key={reason.wasteReason}
                      data-testid={`reason-rank-${idx}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-muted-foreground w-4" aria-hidden="true">{idx + 1}.</span>
                        <span className="font-bold">{reason.wasteReason}</span>
                      </div>
                      <span className="font-mono bg-secondary px-2 py-1 rounded-md text-sm">
                        <span className="sr-only">count: </span>{reason.count}
                      </span>
                    </li>
                  ))}
                {summary.byReason.length === 0 && (
                  <li className="text-center text-muted-foreground font-mono py-4">NO DATA</li>
                )}
              </ol>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
