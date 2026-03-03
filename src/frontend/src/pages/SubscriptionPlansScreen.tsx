import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Crown, Star, Zap } from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";

interface SubscriptionPlansScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MONTHLY_PLAN = {
  id: "monthly",
  name: "Monthly Plan",
  price: 199,
  billingCycle: "monthly" as const,
  priceLabel: "₹199",
  period: "/month",
  features: [
    "Unlimited practice quizzes",
    "All 60+ AIAPGET PYQs",
    "Topic-wise & year-wise filters",
    "Detailed answer explanations",
    "Score history & analytics",
    "Priority support",
  ],
  savingsBadge: null,
  highlight: false,
};

const YEARLY_PLAN = {
  id: "yearly",
  name: "Yearly Plan",
  price: 1499,
  billingCycle: "yearly" as const,
  priceLabel: "₹1,499",
  period: "/year",
  perMonth: "₹125/mo",
  features: [
    "Everything in Monthly",
    "Save 37% vs monthly billing",
    "Unlimited practice quizzes",
    "All 60+ AIAPGET PYQs",
    "Topic-wise & year-wise filters",
    "Detailed answer explanations",
    "Score history & analytics",
    "Early access to new questions",
    "Priority support",
  ],
  savingsBadge: "Save 37%",
  highlight: true,
};

export default function SubscriptionPlansScreen({
  onNavigate,
}: SubscriptionPlansScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const handleSubscribe = (plan: typeof MONTHLY_PLAN | typeof YEARLY_PLAN) => {
    onNavigate({
      name: "payment",
      planName: plan.name,
      planPrice: plan.priceLabel,
      planCycle: plan.billingCycle,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Back button */}
        <button
          type="button"
          onClick={() => onNavigate({ name: "home" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Crown className="w-6 h-6 text-gold" />
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Choose Your Plan
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Unlock full access to all AIAPGET Unani PYQ practice materials
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center">
          <div className="bg-muted rounded-full p-1 flex gap-1">
            <button
              type="button"
              onClick={() => setSelectedPlan("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                selectedPlan === "monthly"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlan("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedPlan === "yearly"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded-full font-semibold">
                Save 37%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Monthly Card */}
          <button
            type="button"
            onClick={() => setSelectedPlan("monthly")}
            className={`relative bg-card border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 text-left w-full ${
              selectedPlan === "monthly"
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold text-foreground">
                {MONTHLY_PLAN.name}
              </h3>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-heading font-bold text-foreground">
                {MONTHLY_PLAN.priceLabel}
              </span>
              <span className="text-sm text-muted-foreground font-body ml-1">
                {MONTHLY_PLAN.period}
              </span>
            </div>
            <ul className="space-y-2 mb-5">
              {MONTHLY_PLAN.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm font-body text-foreground"
                >
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe(MONTHLY_PLAN);
              }}
              variant={selectedPlan === "monthly" ? "default" : "outline"}
              className="w-full font-body"
            >
              Get Started
            </Button>
          </button>

          {/* Yearly Card */}
          <button
            type="button"
            onClick={() => setSelectedPlan("yearly")}
            className={`relative bg-card border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 text-left w-full ${
              selectedPlan === "yearly"
                ? "border-gold shadow-lg shadow-gold/10"
                : "border-border hover:border-gold/40"
            }`}
          >
            {/* Best Value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gold text-white text-[11px] font-body font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                Best Value
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3 mt-1">
              <Crown className="w-5 h-5 text-gold" />
              <h3 className="font-heading font-bold text-foreground">
                {YEARLY_PLAN.name}
              </h3>
            </div>
            <div className="mb-1">
              <span className="text-3xl font-heading font-bold text-foreground">
                {YEARLY_PLAN.priceLabel}
              </span>
              <span className="text-sm text-muted-foreground font-body ml-1">
                {YEARLY_PLAN.period}
              </span>
            </div>
            <p className="text-xs text-gold font-body font-semibold mb-4">
              Just {YEARLY_PLAN.perMonth} — save 37%!
            </p>
            <ul className="space-y-2 mb-5">
              {YEARLY_PLAN.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm font-body text-foreground"
                >
                  <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe(YEARLY_PLAN);
              }}
              className="w-full font-body bg-gold hover:bg-gold/90 text-white border-0"
            >
              Subscribe & Save
            </Button>
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
            <Check className="w-3.5 h-3.5 text-success" /> 7-day free trial
          </span>
        </div>
      </main>
    </div>
  );
}
