/**
 * useSubscriptionQueries — hooks for management data
 * All data fetched from backend actor — NEVER from localStorage.
 * Polling every 10 s via setInterval (cleared on unmount).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentRecord, UserSubscription } from "../backend";
import { useActor } from "./useActor";

const POLL_MS = 10_000;

// ── Shared types ──────────────────────────────────────────────────────────────

export interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Helper: compute subscription expiry date based on plan type
export function calcExpiryDate(planType: string, fromDate: string): string {
  const base = new Date(fromDate);
  const lp = planType.toLowerCase();
  if (lp.includes("year")) {
    base.setFullYear(base.getFullYear() + 1);
  } else if (
    lp.includes("6month") ||
    lp.includes("six") ||
    lp.includes("half")
  ) {
    base.setMonth(base.getMonth() + 6);
  } else {
    // default: monthly
    base.setMonth(base.getMonth() + 1);
  }
  return base.toISOString();
}

// ── usePollingQuery ───────────────────────────────────────────────────────────
// Generic hook: fetches immediately on mount, then polls every POLL_MS.
// Clears interval on unmount. Re-fetches when actor becomes ready.

function usePollingQuery<T>(
  fetcher: () => Promise<T>,
  enabled: boolean,
): QueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const doFetch = useCallback(async () => {
    if (!mountedRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      if (mountedRef.current) setData(result);
    } catch (e) {
      if (mountedRef.current)
        setError(
          e instanceof Error
            ? e.message
            : "Unable to connect to server. Retrying...",
        );
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (!enabled) return;
    // Fetch immediately
    doFetch();
    // Poll every 10 s
    const id = setInterval(doFetch, POLL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, [enabled, doFetch]);

  return { data, isLoading, error, refetch: doFetch };
}

// ── usePaymentRecords ─────────────────────────────────────────────────────────

export function usePaymentRecords(): QueryState<PaymentRecord[]> {
  const { actor, isReady } = useActor();

  const fetcher = useCallback(async () => {
    if (!actor) throw new Error("Unable to connect to server. Retrying...");
    return actor.getPaymentRecords();
  }, [actor]);

  return usePollingQuery(fetcher, !!actor && !!isReady);
}

// ── useAllSubscriptions ───────────────────────────────────────────────────────

export function useAllSubscriptions(): QueryState<UserSubscription[]> {
  const { actor, isReady } = useActor();

  const fetcher = useCallback(async () => {
    if (!actor) throw new Error("Unable to connect to server. Retrying...");
    return actor.getAllSubscriptions();
  }, [actor]);

  return usePollingQuery(fetcher, !!actor && !!isReady);
}

// ── approvePayment ────────────────────────────────────────────────────────────

export async function approvePayment(
  actor: { approvePayment: (id: string, at: string) => Promise<boolean> },
  paymentId: string,
): Promise<void> {
  await actor.approvePayment(paymentId, new Date().toISOString());
}

// ── rejectPayment ─────────────────────────────────────────────────────────────

export async function rejectPayment(
  actor: { rejectPayment: (id: string, at: string) => Promise<boolean> },
  paymentId: string,
): Promise<void> {
  await actor.rejectPayment(paymentId, new Date().toISOString());
}

// ── approveSubscription ───────────────────────────────────────────────────────

export async function approveSubscription(
  actor: {
    approveSubscription: (
      userId: string,
      approvedAt: string,
      expiryDate: string,
    ) => Promise<boolean>;
  },
  userId: string,
  planType: string,
): Promise<void> {
  const approvedAt = new Date().toISOString();
  const expiryDate = calcExpiryDate(planType, approvedAt);
  await actor.approveSubscription(userId, approvedAt, expiryDate);
}

// ── rejectSubscription ────────────────────────────────────────────────────────

export async function rejectSubscription(
  actor: {
    rejectSubscription: (
      userId: string,
      rejectedAt: string,
    ) => Promise<boolean>;
  },
  userId: string,
): Promise<void> {
  await actor.rejectSubscription(userId, new Date().toISOString());
}
