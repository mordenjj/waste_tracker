<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLNXL6X0GX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLNXL6X0GX');
</script>







import { useState, useMemo } from "react";
import { useListWasteEvents, getListWasteEventsQueryKey, ListWasteEventsStation } from "../lib/api-client-react";
import { Layout } from "@/components/layout";
import { format, startOfDay, subDays } from "date-fns";
import { cn } from "@/lib/utils";

const STATIONS = Object.values(ListWasteEventsStation) as ListWasteEventsStation[];

type DatePreset = "today" | "7days" | "30days" | "all";

const DATE_PRESETS: { label: string; value: DatePreset }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "All time", value: "all" },
];

function getDateRange(preset: DatePreset): { from?: string; to?: string } {
  const now = new Date();
  if (preset === "today") {
    return { from: startOfDay(now).toISOString(), to: now.toISOString() };
  }
  if (preset === "7days") {
    return { from: subDays(now, 7).toISOString(), to: now.toISOString() };
  }
  if (preset === "30days") {
    return { from: subDays(now, 30).toISOString(), to: now.toISOString() };
  }
  return {};
}

export default function HistoryScreen() {
  const [stationFilter, setStationFilter] = useState<ListWasteEventsStation | undefined>(undefined);
  const [datePreset, setDatePreset] = useState<DatePreset>("all");

  const dateRange = useMemo(() => getDateRange(datePreset), [datePreset]);

  const params = useMemo(() => ({
    ...(stationFilter ? { station: stationFilter } : {}),
    ...dateRange,
  }), [stationFilter, dateRange]);

  const { data: events, isLoading, isError } = useListWasteEvents(params, {
    query: { enabled: true, queryKey: getListWasteEventsQueryKey(params) },
  });

  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="font-mono font-bold text-xl">ACTIVITY LOG</h2>

        <div className="space-y-2">
          <div
            className="flex overflow-x-auto pb-1 gap-2 hide-scrollbar"
            role="group"
            aria-label="Filter by date range"
          >
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                data-testid={`date-preset-${preset.value}`}
                onClick={() => setDatePreset(preset.value)}
                aria-pressed={datePreset === preset.value}
                className={cn(
                  "snap-start whitespace-nowrap px-3 py-1.5 font-mono text-xs font-bold border-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  datePreset === preset.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div
            className="flex overflow-x-auto pb-1 gap-2 hide-scrollbar"
            role="group"
            aria-label="Filter by station"
          >
            <button
              type="button"
              data-testid="station-filter-all"
              onClick={() => setStationFilter(undefined)}
              aria-pressed={!stationFilter}
              className={cn(
                "snap-start whitespace-nowrap px-3 py-1.5 font-mono text-xs font-bold border-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                !stationFilter
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border hover:border-foreground/50"
              )}
            >
              ALL STATIONS
            </button>
            {STATIONS.map((s) => (
              <button
                key={s}
                type="button"
                data-testid={`station-filter-${s}`}
                onClick={() => setStationFilter(s)}
                aria-pressed={stationFilter === s}
                className={cn(
                  "snap-start whitespace-nowrap px-3 py-1.5 font-mono text-xs font-bold border-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  stationFilter === s
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border hover:border-foreground/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3" aria-busy="true" aria-label="Loading events">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse bg-muted rounded-md h-20 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div role="alert" className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md font-mono">
            Error loading history.
          </div>
        ) : events?.length === 0 ? (
          <div className="p-8 text-center bg-card border border-border rounded-md border-dashed">
            <p className="font-mono text-muted-foreground font-bold">NO RECORDS FOUND</p>
          </div>
        ) : (
          <ul className="space-y-3 list-none" data-testid="events-list" aria-label="Waste events">
            {events?.map((event) => (
              <li
                key={event.id}
                data-testid={`event-card-${event.id}`}
                className="flex items-stretch bg-card border-2 border-border rounded-md overflow-hidden"
              >
                <div className="w-4 bg-destructive flex-none" aria-hidden="true" />
                <div className="flex-1 p-4 flex justify-between items-center gap-4">
                  <div>
                    <div className="font-bold text-lg">{event.wasteReason}</div>
                    <div className="font-mono text-sm text-muted-foreground">{event.station}</div>
                    {event.notes && (
                      <div className="text-sm text-muted-foreground mt-0.5 italic">{event.notes}</div>
                    )}
                  </div>
                  <time
                    dateTime={event.recordedAt}
                    className="text-right text-sm font-mono whitespace-nowrap"
                  >
                    <div>{format(new Date(event.recordedAt), "HH:mm")}</div>
                    <div className="text-muted-foreground">{format(new Date(event.recordedAt), "MMM dd")}</div>
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
