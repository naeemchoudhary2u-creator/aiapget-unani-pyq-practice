import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Home,
} from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";
import { getDeviceId } from "../utils/deviceId";

interface PaymentMethodSelectorScreenProps {
  planName: string;
  planPrice: string;
  planCycle: "monthly" | "yearly";
  onNavigate: (screen: Screen) => void;
}

const RAZORPAY_BASE = "https://razorpay.me/@aiapgetunani";

// razorpay.me payment handle pages do not support query parameters.
// Always open the base URL directly to avoid Razorpay error pages.
function getRazorpayLink(_planPrice: string): string {
  return RAZORPAY_BASE;
}

const PAYMENT_OPTIONS = [
  {
    id: "upi",
    label: "UPI (Google Pay, PhonePe, Paytm, BHIM)",
    description: "Pay instantly with any UPI app",
    icon: "🏦",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: "💳",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "All major Indian banks supported",
    icon: "🏛️",
  },
  {
    id: "wallet",
    label: "Wallets",
    description: "Paytm, Mobikwik, Freecharge & more",
    icon: "👛",
  },
  {
    id: "emi",
    label: "EMI",
    description: "Easy monthly instalments via card or bank",
    icon: "📅",
  },
];

function submitPaymentForVerification(
  cycle: "monthly" | "yearly",
  paymentDetails: { utrId: string; paymentMethod: string; amount: string },
): string {
  const paymentId = `PAY_${Date.now()}`;
  const deviceId = getDeviceId();

  // Save subscription as pending — NOT yet active
  localStorage.setItem(
    "aiapget_subscription",
    JSON.stringify({ plan: cycle, status: "pending", paymentId, deviceId }),
  );

  // Save payment record for admin review
  const existingRecords: object[] = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("aiapget_payment_records") ?? "[]",
      );
    } catch {
      return [];
    }
  })();

  const newRecord = {
    id: paymentId,
    date: new Date().toISOString(),
    plan: cycle,
    amount: paymentDetails.amount,
    utrId: paymentDetails.utrId.trim(),
    paymentMethod: paymentDetails.paymentMethod,
    status: "pending",
    deviceId,
    userId: (() => {
      try {
        return (
          JSON.parse(localStorage.getItem("aiapget_user_session") ?? "{}").id ??
          "unknown"
        );
      } catch {
        return "unknown";
      }
    })(),
    userName: (() => {
      try {
        return (
          JSON.parse(localStorage.getItem("aiapget_user_session") ?? "{}")
            .name ?? "Unknown"
        );
      } catch {
        return "Unknown";
      }
    })(),
  };

  existingRecords.push(newRecord);
  localStorage.setItem(
    "aiapget_payment_records",
    JSON.stringify(existingRecords),
  );

  return paymentId;
}

export default function PaymentMethodSelectorScreen({
  planName,
  planPrice,
  planCycle,
  onNavigate,
}: PaymentMethodSelectorScreenProps) {
  const [razorpayOpened, setRazorpayOpened] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [utrId, setUtrId] = useState("");
  const [utrError, setUtrError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const razorpayLink = getRazorpayLink(planPrice);

  const handlePay = (methodId?: string) => {
    window.open(razorpayLink, "_blank", "noopener,noreferrer");
    setRazorpayOpened(true);
    if (methodId) setSelectedMethod(methodId);
  };

  const handleConfirmPayment = () => {
    setUtrError("");
    const trimmed = utrId.trim();
    if (!trimmed) {
      setUtrError(
        "Please enter the UTR / Transaction ID from your payment receipt.",
      );
      return;
    }
    if (trimmed.length < 8) {
      setUtrError("UTR / Transaction ID must be at least 8 characters.");
      return;
    }
    submitPaymentForVerification(planCycle, {
      utrId: trimmed,
      paymentMethod: selectedMethod ?? "unknown",
      amount: planPrice,
    });
    // Mark that we should show a success banner on home
    localStorage.setItem("aiapget_payment_submitted", "true");
    setPendingVerification(true);
  };

  // "Verification in Progress" screen — shown after UTR submitted
  if (pendingVerification) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div
          className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-lg space-y-4"
          data-ocid="payment.pending_state"
        >
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-success" />
            </div>
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Payment Submitted!
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            Your payment details have been submitted successfully. The admin
            will verify your UTR and activate your subscription shortly.
          </p>
          <div className="bg-muted rounded-xl p-3 text-sm font-body text-muted-foreground space-y-1">
            <p>
              Plan: <strong className="text-foreground">{planName}</strong>
            </p>
            <p>
              Amount: <strong className="text-foreground">{planPrice}</strong>
            </p>
            <p className="text-xs mt-1 text-amber-500">
              UTR submitted:{" "}
              <strong className="text-foreground font-mono">
                {utrId.trim()}
              </strong>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2">
            <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-600 font-body text-left">
              Once approved by admin, you will have full access. Please check
              back shortly.
            </p>
          </div>
          <Button
            data-ocid="payment.primary_button"
            className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground border-0 flex items-center justify-center gap-2"
            onClick={() => onNavigate({ name: "home" })}
          >
            <CheckCircle2 className="w-4 h-4" />
            Subscription Done — Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            data-ocid="payment.link"
            onClick={() => onNavigate({ name: "subscription" })}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plans
          </button>
          <button
            type="button"
            data-ocid="payment.home.link"
            onClick={() => onNavigate({ name: "home" })}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-gold/30 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">
              Selected Plan
            </p>
            <p className="font-heading font-bold text-foreground">{planName}</p>
            <p className="text-xs text-muted-foreground font-body capitalize">
              {planCycle} billing
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-heading font-bold text-gold">
              {planPrice}
            </p>
          </div>
        </div>

        {/* Step 1: Pay */}
        <div
          className="bg-card border border-border rounded-2xl p-5 space-y-4"
          data-ocid="payment.section"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-heading font-bold text-foreground">
              Pay via Razorpay
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-body -mt-2">
            Tap a payment method below to open Razorpay's secure payment page.
          </p>

          {/* Payment method list */}
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                data-ocid={`payment.${option.id}.button`}
                onClick={() => handlePay(option.id)}
                className="w-full flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3 hover:border-gold/60 hover:bg-muted/80 active:scale-[0.98] transition-all duration-150 cursor-pointer text-left"
              >
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground font-body leading-tight">
                    {option.label}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {option.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>

          <Button
            onClick={() => handlePay()}
            data-ocid="payment.submit_button"
            className="w-full font-body text-base py-6 bg-gold hover:bg-gold/90 text-white border-0 rounded-xl flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Pay {planPrice} via Razorpay
          </Button>

          <p className="text-center text-xs text-muted-foreground font-body">
            🔒 You will be redirected to Razorpay's secure payment page.
          </p>
        </div>

        {/* Step 2: Enter UTR and confirm — only shown after Razorpay is opened */}
        {razorpayOpened && (
          <div
            className="bg-success/5 border border-success/30 rounded-2xl p-5 space-y-4"
            data-ocid="payment.confirm.section"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-success text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground font-body">
                  Confirm Your Payment
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Enter the UTR / Transaction ID from your payment receipt to
                  activate your subscription.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="utr-id"
                className="block text-xs font-medium text-foreground"
              >
                UTR / Transaction ID <span className="text-destructive">*</span>
              </label>
              <input
                id="utr-id"
                type="text"
                data-ocid="payment.utr.input"
                value={utrId}
                onChange={(e) => {
                  setUtrId(e.target.value);
                  if (utrError) setUtrError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-success/50 placeholder:text-muted-foreground font-body"
                placeholder="e.g. 4234567890 or T2312345..."
              />
              <p className="text-[11px] text-muted-foreground font-body">
                You can find this in your UPI app's transaction history or
                Razorpay payment receipt.
              </p>
              {utrError && (
                <div
                  className="flex items-center gap-2 text-xs text-destructive font-body"
                  data-ocid="payment.error_state"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {utrError}
                </div>
              )}
            </div>

            <Button
              data-ocid="payment.confirm_button"
              onClick={handleConfirmPayment}
              className="w-full font-body bg-success hover:bg-success/90 text-white border-0"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm Payment & Activate {planName}
            </Button>

            <button
              type="button"
              data-ocid="payment.secondary_button"
              onClick={() => handlePay()}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors font-body py-1"
            >
              Didn't finish? Reopen Razorpay →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
