import { Router, type IRouter } from "express";
import { db, wasteEventsTable } from "@workspace/db";
import { gte, lte, eq, and, sql, desc } from "drizzle-orm";
import {
  CreateWasteEventBody,
  ListWasteEventsQueryParams,
  GetWasteEventsSummaryQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/waste-events", async (req, res): Promise<void> => {
  const parsed = ListWasteEventsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { from, to, station } = parsed.data;

  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  if (fromDate && isNaN(fromDate.getTime())) {
    res.status(400).json({ error: "Invalid 'from' date" });
    return;
  }
  if (toDate && isNaN(toDate.getTime())) {
    res.status(400).json({ error: "Invalid 'to' date" });
    return;
  }

  const conditions = [];
  if (fromDate) {
    conditions.push(gte(wasteEventsTable.recordedAt, fromDate));
  }
  if (toDate) {
    conditions.push(lte(wasteEventsTable.recordedAt, toDate));
  }
  if (station) {
    conditions.push(eq(wasteEventsTable.station, station));
  }

  const events = await db
    .select()
    .from(wasteEventsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(wasteEventsTable.recordedAt));

  res.json(
    events.map((e) => ({
      id: e.id,
      station: e.station,
      wasteReason: e.wasteReason,
      notes: e.notes,
      recordedAt: e.recordedAt.toISOString(),
    }))
  );
});

router.post("/waste-events", async (req, res): Promise<void> => {
  const parsed = CreateWasteEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [event] = await db
    .insert(wasteEventsTable)
    .values({
      station: parsed.data.station,
      wasteReason: parsed.data.wasteReason,
      notes: parsed.data.notes ?? null,
    })
    .returning();

  res.status(201).json({
    id: event.id,
    station: event.station,
    wasteReason: event.wasteReason,
    notes: event.notes,
    recordedAt: event.recordedAt.toISOString(),
  });
});

router.get("/waste-events/summary", async (req, res): Promise<void> => {
  const parsed = GetWasteEventsSummaryQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { from, to } = parsed.data;

  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  if (fromDate && isNaN(fromDate.getTime())) {
    res.status(400).json({ error: "Invalid 'from' date" });
    return;
  }
  if (toDate && isNaN(toDate.getTime())) {
    res.status(400).json({ error: "Invalid 'to' date" });
    return;
  }

  const conditions = [];
  if (fromDate) {
    conditions.push(gte(wasteEventsTable.recordedAt, fromDate));
  }
  if (toDate) {
    conditions.push(lte(wasteEventsTable.recordedAt, toDate));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [totalResult, byStationResult, byReasonResult, byDayResult] =
    await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(wasteEventsTable)
        .where(whereClause),

      db
        .select({
          station: wasteEventsTable.station,
          count: sql<number>`count(*)::int`,
        })
        .from(wasteEventsTable)
        .where(whereClause)
        .groupBy(wasteEventsTable.station)
        .orderBy(sql`count(*) desc`),

      db
        .select({
          wasteReason: wasteEventsTable.wasteReason,
          count: sql<number>`count(*)::int`,
        })
        .from(wasteEventsTable)
        .where(whereClause)
        .groupBy(wasteEventsTable.wasteReason)
        .orderBy(sql`count(*) desc`),

      db
        .select({
          date: sql<string>`date_trunc('day', recorded_at AT TIME ZONE 'UTC')::date::text`,
          count: sql<number>`count(*)::int`,
        })
        .from(wasteEventsTable)
        .where(whereClause)
        .groupBy(sql`date_trunc('day', recorded_at AT TIME ZONE 'UTC')::date`)
        .orderBy(sql`date_trunc('day', recorded_at AT TIME ZONE 'UTC')::date`),
    ]);

  res.json({
    totalCount: totalResult[0]?.count ?? 0,
    byStation: byStationResult,
    byReason: byReasonResult,
    byDay: byDayResult,
  });
});

export default router;
