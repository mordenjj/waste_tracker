import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const STATIONS = ["Sauté", "Salad", "Prep", "Fry", "Flat"] as const;
export const WASTE_REASONS = ["Burnt food", "Dropped", "Prep mistake", "Expired"] as const;

export type Station = (typeof STATIONS)[number];
export type WasteReason = (typeof WASTE_REASONS)[number];

export const stationEnum = pgEnum("station_enum", STATIONS);
export const wasteReasonEnum = pgEnum("waste_reason_enum", WASTE_REASONS);

export const wasteEventsTable = pgTable("waste_events", {
  id: serial("id").primaryKey(),
  station: stationEnum("station").notNull(),
  wasteReason: wasteReasonEnum("waste_reason").notNull(),
  notes: text("notes"),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWasteEventSchema = createInsertSchema(wasteEventsTable).omit({
  id: true,
  recordedAt: true,
});

export type InsertWasteEvent = z.infer<typeof insertWasteEventSchema>;
export type WasteEvent = typeof wasteEventsTable.$inferSelect;
