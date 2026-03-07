import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  Check,
  Clock,
  Crown,
  Gift,
  Home,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";
import { getDeviceId } from "../utils/deviceId";

function getLocalSubscriptionExpiry(): {
  daysRemaining: number;
  hoursRemainingGrace: number;
  expiresAt: number;
  plan: string;
} | null {
  try {
    const raw = localStorage.getItem("aiapget_subscription");
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (
      (s.status === "approved" || !s.status) &&
      typeof s.expiresAt === "number"
    ) {
      const now = Date.now();
      const gracePeriodMs = 24 * 60 * 60 * 1000;
      const msLeft = s.expiresAt - now;
      const daysRemaining = Math.max(
        0,
        Math.ceil(msLeft / (1000 * 60 * 60 * 24)),
      );
      const hoursRemainingGrace =
        msLeft < 0
          ? Math.max(
              0,
              Math.ceil((s.expiresAt + gracePeriodMs - now) / (1000 * 60 * 60)),
            )
          : 0;
      return {
        daysRemaining,
        hoursRemainingGrace,
        expiresAt: s.expiresAt,
        plan: s.plan ?? "monthly",
      };
    }
    return null;
  } catch {
    return null;
  }
}

interface SubscriptionPlansScreenProps {
  onNavigate: (screen: Screen) => void;
  subscriptionStatus?:
    | "active"
    | "grace"
    | "pending"
    | "rejected"
    | "none"
    | "device_blocked";
}

function getSubscriptionPrices() {
  try {
    const raw = localStorage.getItem("aiapget_subscription_prices");
    if (raw) {
      const p = JSON.parse(raw);
      return {
        monthly: typeof p.monthly === "number" ? p.monthly : 100,
        yearly: typeof p.yearly === "number" ? p.yearly : 800,
        trialDays: typeof p.trialDays === "number" ? p.trialDays : 7,
      };
    }
  } catch {}
  return { monthly: 100, yearly: 800, trialDays: 7 };
}

function hasUsedTrial() {
  return localStorage.getItem("aiapget_trial_used") === "true";
}

export default function SubscriptionPlansScreen({
  onNavigate,
  subscriptionStatus = "none",
}: SubscriptionPlansScreenProps) {
  const prices = getSubscriptionPrices();
  const trialUsed = hasUsedTrial();
  const expiryInfo = getLocalSubscriptionExpiry();

  // Get user name from session for personalisation
  const [userName] = useState(() => {
    try {
      const raw = localStorage.getItem("aiapget_user_session");
      if (raw) return JSON.parse(raw).name as string;
    } catch {}
    return "";
  });

  const handleTrialStart = () => {
    const expiresAt = Date.now() + prices.trialDays * 24 * 60 * 60 * 1000;
    const boundDeviceId = getDeviceId();
    localStorage.setItem(
      "aiapget_subscription",
      JSON.stringify({
        plan: "trial",
        status: "approved",
        expiresAt,
        boundDeviceId,
      }),
    );
    localStorage.setItem("aiapget_trial_used", "true");
    onNavigate({ name: "home" });
  };

  const handleSubscribe = (cycle: "monthly" | "yearly") => {
    const planName = cycle === "monthly" ? "Monthly Plan" : "Yearly Plan";
    const planPrice =
      cycle === "monthly" ? `₹${prices.monthly}` : `₹${prices.yearly}`;
    onNavigate({
      name: "payment",
      planName,
      planPrice,
      planCycle: cycle,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        {/* Home button */}
        <button
          type="button"
          data-ocid="subscription.home.link"
          onClick={() => onNavigate({ name: "home" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        {/* Pending verification notice */}
        {subscriptionStatus === "pending" && (
          <div
            data-ocid="subscription.pending_state"
            className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3"
          >
            <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-600 font-body">
                Verification in Progress
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Your payment is being verified by the admin. You'll get access
                once it's approved. Please check back shortly.
              </p>
            </div>
          </div>
        )}

        {/* Rejected payment notice */}
        {subscriptionStatus === "rejected" && (
          <div
            data-ocid="subscription.rejected_state"
            className="bg-destructive/10 border border-destructive/40 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-destructive font-body">
                Payment Not Verified
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Your previous payment could not be verified. Please subscribe
                again with the correct UTR / Transaction ID.
              </p>
            </div>
          </div>
        )}

        {/* Grace period notice */}
        {subscriptionStatus === "grace" && expiryInfo && (
          <div
            data-ocid="subscription.grace_state"
            className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-600 font-body">
                Subscription Expired — Grace Period
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Your subscription has expired. You have{" "}
                <strong className="text-amber-600">
                  {expiryInfo.hoursRemainingGrace} hours
                </strong>{" "}
                of grace period left before access is removed. Renew now to keep
                uninterrupted access.
              </p>
            </div>
          </div>
        )}

        {/* Active subscription info */}
        {(subscriptionStatus === "active" || subscriptionStatus === "grace") &&
          expiryInfo &&
          subscriptionStatus !== "grace" && (
            <div
              data-ocid="subscription.active_state"
              className="bg-success/8 border border-success/30 rounded-2xl p-4 flex items-start gap-3"
            >
              <CalendarDays className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-success font-body">
                  Subscription Active
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  <strong className="text-foreground">
                    {expiryInfo.daysRemaining} days remaining
                  </strong>
                  {" · "}
                  Expires{" "}
                  {new Date(expiryInfo.expiresAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Crown className="w-6 h-6 text-gold" />
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Choose Your Plan
            </h2>
          </div>
          {userName ? (
            <p className="text-sm text-muted-foreground font-body">
              Hi <strong className="text-foreground">{userName}</strong> —
              unlock full access to all AIAPGET Unani PYQ materials
            </p>
          ) : (
            <p className="text-sm text-muted-foreground font-body">
              Unlock full access to all AIAPGET Unani PYQ practice materials
            </p>
          )}
        </div>

        {/* Plan 1 — Free Trial */}
        <div
          data-ocid="subscription.trial.card"
          className={`relative bg-card border-2 rounded-2xl p-5 transition-all duration-200 ${
            trialUsed
              ? "border-border opacity-60"
              : "border-success shadow-lg shadow-success/10"
          }`}
        >
          {!trialUsed && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-success text-white text-[11px] font-body font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Gift className="w-3 h-3 fill-white" />
                Start Free
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-foreground">
                  {prices.trialDays}-Day Free Trial
                </h3>
                {trialUsed && (
                  <Badge variant="secondary" className="text-[10px]">
                    Used
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Full access, no credit card needed
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-success">
                Free
              </p>
              <p className="text-xs text-muted-foreground font-body">
                {prices.trialDays} days
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5 mb-4">
            {[
              "All topic & year-wise MCQs",
              "Detailed answer explanations",
              "Score history & analytics",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-xs font-body text-foreground"
              >
                <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-ocid="subscription.trial.button"
            disabled={trialUsed}
            onClick={handleTrialStart}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all font-body ${
              trialUsed
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900 active:scale-[0.98]"
            }`}
          >
            {trialUsed
              ? "Trial Already Used"
              : `Start ${prices.trialDays}-Day Free Trial`}
          </button>
        </div>

        {/* Plan 2 — Monthly */}
        <div
          data-ocid="subscription.monthly.card"
          className="relative bg-card border-2 border-border rounded-2xl p-5 hover:border-primary/50 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground">
                Monthly Plan
              </h3>
              <p className="text-xs text-muted-foreground font-body">
                Billed every month
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-foreground">
                ₹{prices.monthly}
              </p>
              <p className="text-xs text-muted-foreground font-body">/month</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5 mb-4">
            {[
              "Unlimited practice quizzes",
              "All AIAPGET PYQs",
              "Topic-wise & year-wise filters",
              "Detailed answer explanations",
              "Score history & analytics",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-xs font-body text-foreground"
              >
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-ocid="subscription.monthly.button"
            onClick={() => handleSubscribe("monthly")}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all font-body"
          >
            Subscribe — ₹{prices.monthly}/month
          </button>
        </div>

        {/* Plan 3 — Yearly (Best Value) */}
        <div
          data-ocid="subscription.yearly.card"
          className="relative bg-card border-2 border-gold shadow-lg shadow-gold/10 rounded-2xl p-5 transition-all duration-200"
        >
          {/* Best Value badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-gold text-white text-[11px] font-body font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Best Value
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground">
                Yearly Plan
              </h3>
              <p className="text-xs text-gold font-body font-semibold">
                Just ₹{Math.round(prices.yearly / 12)}/mo — best deal!
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-foreground">
                ₹{prices.yearly}
              </p>
              <p className="text-xs text-muted-foreground font-body">/year</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5 mb-4">
            {[
              "Everything in Monthly",
              "365 days of full access",
              "Unlimited practice quizzes",
              "All AIAPGET PYQs",
              "Topic-wise & year-wise filters",
              "Detailed answer explanations",
              "Score history & analytics",
              "Early access to new questions",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-xs font-body text-foreground"
              >
                <Check className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-ocid="subscription.yearly.button"
            onClick={() => handleSubscribe("yearly")}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-black text-white hover:bg-gray-900 active:scale-[0.98] transition-all font-body"
          >
            Subscribe — ₹{prices.yearly}/year
          </button>
        </div>

        {/* Trust badges */}
        <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground font-body">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-success" /> Cancel anytime
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-success" /> Secure payment
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-success" /> Instant access
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-success" /> UPI supported
          </span>
        </div>
      </main>
    </div>
  );
}
