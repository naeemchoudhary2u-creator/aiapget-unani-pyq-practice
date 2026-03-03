import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Loader2,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";

interface PaymentMethodSelectorScreenProps {
  planName: string;
  planPrice: string;
  planCycle: "monthly" | "yearly";
  onNavigate: (screen: Screen) => void;
}

type PaymentMethod = "upi" | "credit" | "debit" | "netbanking" | "wallet";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
}[] = [
  {
    id: "upi",
    label: "UPI",
    desc: "Pay via any UPI app instantly",
    icon: (
      <img
        src="/assets/generated/upi-badge.dim_120x48.png"
        alt="UPI"
        className="h-7 object-contain"
      />
    ),
    badge: "Recommended",
  },
  {
    id: "credit",
    label: "Credit Card",
    desc: "Visa, Mastercard, RuPay, Amex",
    icon: (
      <img
        src="/assets/generated/card-icon.dim_64x64.png"
        alt="Card"
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    id: "debit",
    label: "Debit Card",
    desc: "All major bank debit cards",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
  },
  {
    id: "netbanking",
    label: "Net Banking",
    desc: "All major Indian banks",
    icon: <Building2 className="w-6 h-6 text-primary" />,
  },
  {
    id: "wallet",
    label: "Wallets",
    desc: "Paytm, PhonePe, Amazon Pay",
    icon: <Wallet className="w-6 h-6 text-primary" />,
  },
];

export default function PaymentMethodSelectorScreen({
  planName,
  planPrice,
  planCycle,
  onNavigate,
}: PaymentMethodSelectorScreenProps) {
  const [selected, setSelected] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [bank, setBank] = useState("");
  const [walletApp, setWalletApp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = async () => {
    setIsProcessing(true);
    // Mock payment processing delay
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-lg space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-success" />
            </div>
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Payment Successful!
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            You're now subscribed to the{" "}
            <strong className="text-foreground">{planName}</strong>. Enjoy
            unlimited access to all AIAPGET Unani PYQ materials.
          </p>
          <div className="bg-muted rounded-xl p-3 text-sm font-body text-muted-foreground">
            <p>
              Amount paid:{" "}
              <strong className="text-foreground">{planPrice}</strong>
            </p>
            <p>
              Billing:{" "}
              <strong className="text-foreground capitalize">
                {planCycle}
              </strong>
            </p>
          </div>
          <Button
            className="w-full font-body bg-gold hover:bg-gold/90 text-white border-0"
            onClick={() => onNavigate({ name: "home" })}
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        {/* Back */}
        <button
          type="button"
          onClick={() => onNavigate({ name: "subscription" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </button>

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

        {/* Payment Methods */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest font-body mb-3">
            Select Payment Method
          </h3>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 focus:outline-none ${
                  selected === method.id
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-border bg-card hover:border-gold/40"
                }`}
              >
                {/* Radio dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected === method.id
                      ? "border-gold"
                      : "border-muted-foreground"
                  }`}
                >
                  {selected === method.id && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>

                {/* Icon */}
                <div className="w-10 flex items-center justify-center flex-shrink-0">
                  {method.icon}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-body font-semibold text-foreground">
                      {method.label}
                    </span>
                    {method.badge && (
                      <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded-full font-body font-semibold">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    {method.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic input fields */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          {selected === "upi" && (
            <div className="space-y-2">
              <Label htmlFor="upi-id" className="font-body text-sm">
                UPI ID
              </Label>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Input
                  id="upi-id"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="font-body"
                />
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Enter your UPI ID (e.g. name@okaxis, name@paytm)
              </p>
            </div>
          )}

          {(selected === "credit" || selected === "debit") && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="card-name" className="font-body text-sm">
                  Cardholder Name
                </Label>
                <Input
                  id="card-name"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="font-body"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card-number" className="font-body text-sm">
                  Card Number
                </Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                        .slice(0, 19),
                    )
                  }
                  className="font-body"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="card-expiry" className="font-body text-sm">
                    Expiry (MM/YY)
                  </Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCardExpiry(
                        v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v,
                      );
                    }}
                    className="font-body"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-cvv" className="font-body text-sm">
                    CVV
                  </Label>
                  <Input
                    id="card-cvv"
                    placeholder="•••"
                    type="password"
                    value={cardCvv}
                    onChange={(e) =>
                      setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    className="font-body"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {selected === "netbanking" && (
            <div className="space-y-2">
              <Label htmlFor="bank-select" className="font-body text-sm">
                Select Bank
              </Label>
              <select
                id="bank-select"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="">-- Choose your bank --</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="pnb">Punjab National Bank</option>
                <option value="bob">Bank of Baroda</option>
                <option value="other">Other Bank</option>
              </select>
            </div>
          )}

          {selected === "wallet" && (
            <div className="space-y-2">
              <p className="font-body text-sm font-medium text-foreground">
                Select Wallet
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Paytm",
                  "PhonePe",
                  "Amazon Pay",
                  "Google Pay",
                  "Mobikwik",
                  "Freecharge",
                ].map((w) => (
                  <button
                    type="button"
                    key={w}
                    onClick={() => setWalletApp(w)}
                    className={`py-2 px-2 rounded-lg border text-xs font-body font-medium transition-colors ${
                      walletApp === w
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border bg-background text-foreground hover:border-gold/40"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full font-body text-base py-6 bg-gold hover:bg-gold/90 text-white border-0 rounded-xl"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing Payment…
            </span>
          ) : (
            `Pay ${planPrice}`
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground font-body">
          🔒 This is a demo UI. No real payment will be processed.
        </p>
      </main>
    </div>
  );
}
