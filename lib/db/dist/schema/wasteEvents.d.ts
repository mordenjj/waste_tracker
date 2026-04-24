import { z } from "zod/v4";
export declare const STATIONS: readonly ["Sauté", "Salad", "Prep", "Fry", "Flat"];
export declare const WASTE_REASONS: readonly ["Burnt food", "Dropped", "Prep mistake", "Expired"];
export type Station = (typeof STATIONS)[number];
export type WasteReason = (typeof WASTE_REASONS)[number];
export declare const stationEnum: import("drizzle-orm/pg-core").PgEnum<["Sauté", "Salad", "Prep", "Fry", "Flat"]>;
export declare const wasteReasonEnum: import("drizzle-orm/pg-core").PgEnum<["Burnt food", "Dropped", "Prep mistake", "Expired"]>;
export declare const wasteEventsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "waste_events";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "waste_events";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        station: import("drizzle-orm/pg-core").PgColumn<{
            name: "station";
            tableName: "waste_events";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "Sauté" | "Salad" | "Prep" | "Fry" | "Flat";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["Sauté", "Salad", "Prep", "Fry", "Flat"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        wasteReason: import("drizzle-orm/pg-core").PgColumn<{
            name: "waste_reason";
            tableName: "waste_events";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "Burnt food" | "Dropped" | "Prep mistake" | "Expired";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["Burnt food", "Dropped", "Prep mistake", "Expired"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "waste_events";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recordedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "recorded_at";
            tableName: "waste_events";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertWasteEventSchema: z.ZodObject<{
    station: z.ZodEnum<{
        Sauté: "Sauté";
        Salad: "Salad";
        Prep: "Prep";
        Fry: "Fry";
        Flat: "Flat";
    }>;
    wasteReason: z.ZodEnum<{
        "Burnt food": "Burnt food";
        Dropped: "Dropped";
        "Prep mistake": "Prep mistake";
        Expired: "Expired";
    }>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, {
    out: {};
    in: {};
}>;
export type InsertWasteEvent = z.infer<typeof insertWasteEventSchema>;
export type WasteEvent = typeof wasteEventsTable.$inferSelect;
//# sourceMappingURL=wasteEvents.d.ts.map