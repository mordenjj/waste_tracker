import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { CreateWasteEventBody, GetWasteEventsSummaryParams, HealthStatus, ListWasteEventsParams, WasteEvent, WasteEventsSummary } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns waste events, optionally filtered by date range
 * @summary List waste events
 */
export declare const getListWasteEventsUrl: (params?: ListWasteEventsParams) => string;
export declare const listWasteEvents: (params?: ListWasteEventsParams, options?: RequestInit) => Promise<WasteEvent[]>;
export declare const getListWasteEventsQueryKey: (params?: ListWasteEventsParams) => readonly ["/api/waste-events", ...ListWasteEventsParams[]];
export declare const getListWasteEventsQueryOptions: <TData = Awaited<ReturnType<typeof listWasteEvents>>, TError = ErrorType<unknown>>(params?: ListWasteEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWasteEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listWasteEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListWasteEventsQueryResult = NonNullable<Awaited<ReturnType<typeof listWasteEvents>>>;
export type ListWasteEventsQueryError = ErrorType<unknown>;
/**
 * @summary List waste events
 */
export declare function useListWasteEvents<TData = Awaited<ReturnType<typeof listWasteEvents>>, TError = ErrorType<unknown>>(params?: ListWasteEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWasteEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Log a new food waste event
 * @summary Create a waste event
 */
export declare const getCreateWasteEventUrl: () => string;
export declare const createWasteEvent: (createWasteEventBody: CreateWasteEventBody, options?: RequestInit) => Promise<WasteEvent>;
export declare const getCreateWasteEventMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWasteEvent>>, TError, {
        data: BodyType<CreateWasteEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createWasteEvent>>, TError, {
    data: BodyType<CreateWasteEventBody>;
}, TContext>;
export type CreateWasteEventMutationResult = NonNullable<Awaited<ReturnType<typeof createWasteEvent>>>;
export type CreateWasteEventMutationBody = BodyType<CreateWasteEventBody>;
export type CreateWasteEventMutationError = ErrorType<void>;
/**
 * @summary Create a waste event
 */
export declare const useCreateWasteEvent: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWasteEvent>>, TError, {
        data: BodyType<CreateWasteEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createWasteEvent>>, TError, {
    data: BodyType<CreateWasteEventBody>;
}, TContext>;
/**
 * Returns aggregated waste data for analytics
 * @summary Get waste analytics summary
 */
export declare const getGetWasteEventsSummaryUrl: (params?: GetWasteEventsSummaryParams) => string;
export declare const getWasteEventsSummary: (params?: GetWasteEventsSummaryParams, options?: RequestInit) => Promise<WasteEventsSummary>;
export declare const getGetWasteEventsSummaryQueryKey: (params?: GetWasteEventsSummaryParams) => readonly ["/api/waste-events/summary", ...GetWasteEventsSummaryParams[]];
export declare const getGetWasteEventsSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getWasteEventsSummary>>, TError = ErrorType<unknown>>(params?: GetWasteEventsSummaryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWasteEventsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWasteEventsSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWasteEventsSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getWasteEventsSummary>>>;
export type GetWasteEventsSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get waste analytics summary
 */
export declare function useGetWasteEventsSummary<TData = Awaited<ReturnType<typeof getWasteEventsSummary>>, TError = ErrorType<unknown>>(params?: GetWasteEventsSummaryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWasteEventsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map