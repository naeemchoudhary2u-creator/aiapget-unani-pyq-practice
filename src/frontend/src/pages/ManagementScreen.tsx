/**
 * ManagementScreen — Password-gated admin dashboard
 * Tabs: Payments | Subscriptions
 * Password: Naeem@#9472
 * IMPORTANT: No data is read from or written to localStorage.
 * All subscription/payment status is fetched from the backend canister.
 */

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ClipboardList,
  CreditCard,
  Loader2,
  Lock,
  RefreshCw,
  UserCheck,
  XCircle,
} from "lucide-react";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentRecord, UserSubscription } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  approvePayment,
  approveSubscription,
  rejectPayment,
  rejectSubscription,
  useAllSubscriptions,
  usePaymentRecords,
} from "../hooks/useSubscriptionQueries";

const POLL_INTERVAL_MS = 10_000;

const MANAGEMENT_PASSWORD = "Naeem@#9472";

// ── Shared UI helpers ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cfg =
    s === "active" || s === "approved"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
      : s === "pending"
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
        : s === "rejected" || s === "failed"
          ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
          : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cfg}`}
    >
      {status}
    </span>
  );
}

function TabBadge({ count }: { count: number }) {
  return (
    <span className="ml-1.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold">
      {count}
    </span>
  );
}

function LoadingRows({ cols }: { cols: number }) {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <tr key={i}>
          {Array.from({ length: cols }).map((_, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
            <td key={j} className="px-4 py-3">
              <div className="h-4 rounded bg-muted animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div
      data-ocid="management.empty_state"
      className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground"
    >
      <Icon className="w-10 h-10 opacity-40" />
      <p className="text-sm font-body">{message}</p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      data-ocid="management.error_state"
      className="flex flex-col items-center justify-center py-16 gap-3"
    >
      <AlertCircle className="w-10 h-10 text-destructive opacity-60" />
      <p className="text-sm text-destructive font-body max-w-sm text-center">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

// ── TableWrapper ──────────────────────────────────────────────────────────────

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

function THead({ headers }: { headers: string[] }) {
  return (
    <thead>
      <tr className="bg-muted/60">
        {headers.map((h) => (
          <th
            key={h}
            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// ── Password Gate ─────────────────────────────────────────────────────────────

interface PasswordGateProps {
  onUnlock: () => void;
  onBack: () => void;
}

function PasswordGate({ onUnlock, onBack }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MANAGEMENT_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground font-heading">
              Management
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              AIAPGET Unani PYQ Practice
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="mgmt-password"
              className="text-sm font-semibold text-foreground font-body"
            >
              Management Password
            </label>
            <input
              id="mgmt-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              data-ocid="management.password.input"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-input focus:ring-primary/30 focus:border-primary"
              }`}
            />
            {error && (
              <p
                data-ocid="management.password.field_error"
                className="text-xs text-destructive font-body flex items-center gap-1 mt-1"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            data-ocid="management.password.submit_button"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Unlock Management
          </button>
        </form>

        <button
          type="button"
          data-ocid="management.back_button"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}

// ── PaymentsTab ───────────────────────────────────────────────────────────────

type PaymentFilter = "all" | "pending" | "approved" | "rejected";

function PaymentsTab() {
  const { actor, isReady } = useActor();
  const { data: payments, isLoading, error, refetch } = usePaymentRecords();
  const [actionState, setActionState] = useState<
    Record<string, "approve" | "reject" | null>
  >({});
  const [filter, setFilter] = useState<PaymentFilter>("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      refetch();
      setLastUpdated(new Date());
    }, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refetch]);

  const handleApprove = useCallback(
    async (record: PaymentRecord) => {
      if (!actor || !isReady) return;
      setActionState((s) => ({ ...s, [record.id]: "approve" }));
      try {
        await approvePayment(actor, record.id);
        refetch();
        setLastUpdated(new Date());
      } finally {
        setActionState((s) => ({ ...s, [record.id]: null }));
      }
    },
    [actor, isReady, refetch],
  );

  const handleReject = useCallback(
    async (record: PaymentRecord) => {
      if (!actor || !isReady) return;
      setActionState((s) => ({ ...s, [record.id]: "reject" }));
      try {
        await rejectPayment(actor, record.id);
        refetch();
        setLastUpdated(new Date());
      } finally {
        setActionState((s) => ({ ...s, [record.id]: null }));
      }
    },
    [actor, isReady, refetch],
  );

  const filtered = payments
    ? payments.filter(
        (r) => filter === "all" || r.status.toLowerCase() === filter,
      )
    : null;

  const filterLabels: { key: PaymentFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  const headers = [
    "#",
    "Name",
    "UTR / ID",
    "Amount",
    "Date",
    "Status",
    "Actions",
  ];

  return (
    <div data-ocid="management.payments.panel" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {filterLabels.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              data-ocid={`management.payments.filter.${key}`}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                filter === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {payments && (
                <span className="ml-1 opacity-70">
                  (
                  {key === "all"
                    ? payments.length
                    : payments.filter((r) => r.status.toLowerCase() === key)
                        .length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString("en-IN")}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              refetch();
              setLastUpdated(new Date());
            }}
            aria-label="Refresh payments"
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <TableWrapper>
          <THead headers={headers} />
          <tbody className="divide-y divide-border">
            {isLoading && !payments ? (
              <LoadingRows cols={headers.length} />
            ) : !filtered || filtered.length === 0 ? (
              <tr>
                <td colSpan={headers.length}>
                  <EmptyState
                    icon={CreditCard}
                    message="No payment records found"
                  />
                </td>
              </tr>
            ) : (
              filtered.map((rec, idx) => {
                const acting = actionState[rec.id];
                const isPending = rec.status.toLowerCase() === "pending";
                const isApproved = rec.status.toLowerCase() === "approved";
                const isRejected = rec.status.toLowerCase() === "rejected";
                return (
                  <React.Fragment key={rec.id}>
                    <tr
                      data-ocid={`management.payments.item.${idx + 1}`}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        <div>{rec.userName || "—"}</div>
                        <div className="text-xs text-muted-foreground">
                          {rec.userId?.slice(0, 16) ?? ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground">
                        {rec.utrId || `${rec.id.slice(0, 12)}…`}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {rec.amount ? `₹${rec.amount}` : "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground text-xs">
                        {rec.date
                          ? new Date(rec.date).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={rec.status} />
                      </td>
                      <td className="px-4 py-3">
                        {isPending ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-ocid={`management.payments.approve_button.${idx + 1}`}
                              onClick={() => handleApprove(rec)}
                              disabled={!!acting}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                            >
                              {acting === "approve" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              Approve
                            </button>
                            <button
                              type="button"
                              data-ocid={`management.payments.reject_button.${idx + 1}`}
                              onClick={() => handleReject(rec)}
                              disabled={!!acting}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              {acting === "reject" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                    {(isApproved || isRejected) && (
                      <tr className="bg-muted/20">
                        <td
                          colSpan={headers.length}
                          className="px-4 py-1.5 text-xs text-muted-foreground italic"
                        >
                          {isApproved
                            ? `✓ Approved by admin${rec.approvedAt ? ` at ${new Date(rec.approvedAt).toLocaleString("en-IN")}` : ""}`
                            : `✗ Rejected by admin${rec.rejectedAt ? ` at ${new Date(rec.rejectedAt).toLocaleString("en-IN")}` : ""}`}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}

// ── SubscriptionsTab ──────────────────────────────────────────────────────────

type SubFilter = "all" | "pending" | "active" | "rejected" | "expired";

function SubscriptionsTab() {
  const { actor, isReady } = useActor();
  const { data: subs, isLoading, error, refetch } = useAllSubscriptions();
  const [actionState, setActionState] = useState<
    Record<string, "approve" | "reject" | "cancel" | null>
  >({});
  const [filter, setFilter] = useState<SubFilter>("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      refetch();
      setLastUpdated(new Date());
    }, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refetch]);

  const handleApprove = useCallback(
    async (sub: UserSubscription) => {
      if (!actor || !isReady) return;
      setActionState((s) => ({ ...s, [sub.userId]: "approve" }));
      try {
        await approveSubscription(actor, sub.userId, sub.planType);
        refetch();
        setLastUpdated(new Date());
      } finally {
        setActionState((s) => ({ ...s, [sub.userId]: null }));
      }
    },
    [actor, isReady, refetch],
  );

  const handleReject = useCallback(
    async (sub: UserSubscription) => {
      if (!actor || !isReady) return;
      setActionState((s) => ({ ...s, [sub.userId]: "reject" }));
      try {
        await rejectSubscription(actor, sub.userId);
        refetch();
        setLastUpdated(new Date());
      } finally {
        setActionState((s) => ({ ...s, [sub.userId]: null }));
      }
    },
    [actor, isReady, refetch],
  );

  const handleCancel = useCallback(
    async (sub: UserSubscription) => {
      if (!actor || !isReady) return;
      setActionState((s) => ({ ...s, [sub.userId]: "cancel" }));
      try {
        await rejectSubscription(actor, sub.userId);
        refetch();
        setLastUpdated(new Date());
      } finally {
        setActionState((s) => ({ ...s, [sub.userId]: null }));
      }
    },
    [actor, isReady, refetch],
  );

  const filtered = subs
    ? subs.filter((s) => filter === "all" || s.status.toLowerCase() === filter)
    : null;

  const filterLabels: { key: SubFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "active", label: "Active" },
    { key: "rejected", label: "Rejected" },
    { key: "expired", label: "Expired" },
  ];

  const headers = [
    "#",
    "User Name",
    "Device / Email",
    "Plan",
    "Status",
    "Start Date",
    "Expiry Date",
    "Actions",
  ];

  return (
    <div data-ocid="management.subscriptions.panel" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {filterLabels.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              data-ocid={`management.subscriptions.filter.${key}`}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                filter === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {subs && (
                <span className="ml-1 opacity-70">
                  (
                  {key === "all"
                    ? subs.length
                    : subs.filter((s) => s.status.toLowerCase() === key).length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString("en-IN")}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              refetch();
              setLastUpdated(new Date());
            }}
            aria-label="Refresh subscriptions"
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <TableWrapper>
          <THead headers={headers} />
          <tbody className="divide-y divide-border">
            {isLoading && !subs ? (
              <LoadingRows cols={headers.length} />
            ) : !filtered || filtered.length === 0 ? (
              <tr>
                <td colSpan={headers.length}>
                  <EmptyState
                    icon={UserCheck}
                    message="No subscription records found"
                  />
                </td>
              </tr>
            ) : (
              filtered.map((sub, idx) => {
                const acting = actionState[sub.userId];
                const st = sub.status.toLowerCase();
                const isPending = st === "pending";
                const isActive = st === "active";
                const isRejected = st === "rejected" || st === "cancelled";
                return (
                  <React.Fragment key={sub.userId}>
                    <tr
                      data-ocid={`management.subscriptions.item.${idx + 1}`}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        <div>
                          {sub.userName || `${sub.userId.slice(0, 12)}…`}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {sub.userId?.slice(0, 16)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[140px]">
                        {sub.deviceId || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">
                        {sub.planType || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {sub.startDate
                          ? new Date(sub.startDate).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {sub.expiryDate
                          ? new Date(sub.expiryDate).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {isPending ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-ocid={`management.subscriptions.approve_button.${idx + 1}`}
                              onClick={() => handleApprove(sub)}
                              disabled={!!acting}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                            >
                              {acting === "approve" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              Approve
                            </button>
                            <button
                              type="button"
                              data-ocid={`management.subscriptions.reject_button.${idx + 1}`}
                              onClick={() => handleReject(sub)}
                              disabled={!!acting}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              {acting === "reject" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              Reject
                            </button>
                          </div>
                        ) : isActive ? (
                          <button
                            type="button"
                            data-ocid={`management.subscriptions.cancel_button.${idx + 1}`}
                            onClick={() => handleCancel(sub)}
                            disabled={!!acting}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors"
                          >
                            {acting === "cancel" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            Cancel
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                    {(isActive || isRejected) && (
                      <tr className="bg-muted/20">
                        <td
                          colSpan={headers.length}
                          className="px-4 py-1.5 text-xs text-muted-foreground italic"
                        >
                          {isActive
                            ? `✓ Active — expires ${sub.expiryDate ? new Date(sub.expiryDate).toLocaleDateString("en-IN") : "N/A"}`
                            : "✗ Rejected / cancelled"}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}

// ── ManagementDashboard ───────────────────────────────────────────────────────

type TabId = "payments" | "subscriptions";

function ManagementDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("payments");
  const { data: payments } = usePaymentRecords();
  const { data: subs } = useAllSubscriptions();

  // Count pending items for badge
  const pendingPayments =
    payments?.filter((p) => p.status.toLowerCase() === "pending").length ?? 0;
  const pendingSubs =
    subs?.filter((s) => s.status.toLowerCase() === "pending").length ?? 0;

  const tabs: {
    id: TabId;
    label: string;
    icon: React.ElementType;
    count: number;
    pending: number;
  }[] = [
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      count: payments?.length ?? 0,
      pending: pendingPayments,
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: ClipboardList,
      count: subs?.length ?? 0,
      pending: pendingSubs,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky header */}
      <div className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            data-ocid="management.back_button"
            onClick={onBack}
            aria-label="Back to Home"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-foreground font-heading truncate">
              Management
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              AIAPGET Unani PYQ · Admin Dashboard
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-none pb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-ocid={`management.${tab.id}.tab`}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <TabBadge count={tab.count} />
                {tab.pending > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center min-w-[1.1rem] h-4 px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                    {tab.pending}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {activeTab === "payments" && <PaymentsTab />}
        {activeTab === "subscriptions" && <SubscriptionsTab />}
      </div>
    </div>
  );
}

// ── ManagementScreen (exported) ───────────────────────────────────────────────

interface ManagementScreenProps {
  onBack: () => void;
}

export default function ManagementScreen({ onBack }: ManagementScreenProps) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} onBack={onBack} />;
  }

  return <ManagementDashboard onBack={onBack} />;
}
