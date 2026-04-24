import { useState } from "react";
import { useCreateWasteEvent, getListWasteEventsQueryKey, getGetWasteEventsSummaryQueryKey, CreateWasteEventBodyStation, CreateWasteEventBodyWasteReason } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout";

export default function LogScreen() {
  const [station, setStation] = useState<CreateWasteEventBodyStation | null>(null);
  const [reason, setReason] = useState<CreateWasteEventBodyWasteReason | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createEvent = useCreateWasteEvent();

  const stations = Object.values(CreateWasteEventBodyStation);
  const reasons = Object.values(CreateWasteEventBodyWasteReason);

  const handleSubmit = () => {
    if (!station || !reason) return;
    
    setIsSubmitting(true);
    createEvent.mutate(
      { data: { station, wasteReason: reason, ...(notes.trim() ? { notes: notes.trim() } : {}) } },
      {
        onSuccess: () => {
          setStation(null);
          setReason(null);
          setNotes("");
          toast({
            title: "EVENT LOGGED",
            description: `${reason} at ${station}`,
            variant: "default",
          });
          queryClient.invalidateQueries({ queryKey: getListWasteEventsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetWasteEventsSummaryQueryKey() });
          setIsSubmitting(false);
        },
        onError: () => {
          toast({
            title: "ERROR",
            description: "Failed to log event. Try again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
        }
      }
    );
  };

  const isReady = station && reason;

  return (
    <Layout>
      <div className="space-y-8 flex flex-col h-full">
        
        <section aria-labelledby="station-label">
          <div className="flex items-baseline justify-between mb-3">
            <h2 id="station-label" className="font-mono font-bold text-lg">1. STATION</h2>
            <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">Select one</span>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            role="group"
            aria-labelledby="station-label"
          >
            {stations.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setStation(s)}
                aria-pressed={station === s}
                className={cn(
                  "p-4 rounded-md border-2 text-left font-bold transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  station === s 
                    ? "border-primary bg-primary text-primary-foreground shadow-md" 
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="reason-label">
          <div className="flex items-baseline justify-between mb-3">
            <h2 id="reason-label" className="font-mono font-bold text-lg">2. REASON</h2>
            <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">Select one</span>
          </div>
          <div
            className="grid grid-cols-2 gap-3"
            role="group"
            aria-labelledby="reason-label"
          >
            {reasons.map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                aria-pressed={reason === r}
                className={cn(
                  "p-4 rounded-md border-2 text-left font-bold transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  reason === r 
                    ? "border-primary bg-primary text-primary-foreground shadow-md" 
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-mono font-bold text-lg">3. NOTES</h2>
            <span className="font-mono text-xs text-muted-foreground">Optional</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. fish overcooked, ticket was late"
            maxLength={280}
            rows={2}
            className="w-full px-4 py-3 rounded-md border-2 border-border bg-card font-mono text-sm resize-none focus:outline-none focus:border-primary placeholder:text-muted-foreground"
          />
        </section>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReady || isSubmitting}
            aria-disabled={!isReady || isSubmitting}
            className={cn(
              "w-full p-6 rounded-md font-mono font-bold text-2xl uppercase tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              isReady 
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 shadow-xl" 
                : "bg-muted text-muted-foreground border-2 border-border cursor-not-allowed",
              isSubmitting && "opacity-50 cursor-wait"
            )}
          >
            {isSubmitting ? "LOGGING..." : "LOG WASTE"}
          </button>
        </div>

      </div>
    </Layout>
  );
}
