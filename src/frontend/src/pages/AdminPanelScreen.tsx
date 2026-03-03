import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  CreditCard,
  Loader2,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Question } from "../backend";
import {
  useAddQuestion,
  useGetAdminQuestions,
  useRemoveQuestion,
} from "../hooks/useAdminQueries";

const ADMIN_PASSWORD = "Naeem9472";

function getStoredPrices() {
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

interface AdminPanelScreenProps {
  onBack: () => void;
}

interface PaymentRecord {
  id: string;
  date: string;
  plan: string;
  amount: string;
  utrId: string;
  paymentMethod: string;
  userId: string;
  userName: string;
  status?: "pending" | "approved" | "rejected";
}

interface QuestionForm {
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswerIndex: number;
  topic: string;
  year: string;
  explanation: string;
}

const TOPICS = [
  "Kulliyat",
  "Ilmul Advia",
  "Moalijat",
  "Ilmul Jarahat",
  "Ain, Uzn, Anf, Halaq wa Asnan",
  "Amraz Jild wa Tazeeniyat",
  "Amraz Niswan wa Ilmul Qabala",
  "Kulliyat Ilaj",
  "Other",
];

// Dynamically generate years from 2016 to current year, descending
const currentYear = new Date().getFullYear();
const YEARS: string[] = Array.from({ length: currentYear - 2016 + 1 }, (_, i) =>
  String(currentYear - i),
);

const DEFAULT_FORM: QuestionForm = {
  questionText: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctAnswerIndex: 0,
  topic: TOPICS[0],
  year: YEARS[0],
  explanation: "",
};

export default function AdminPanelScreen({ onBack }: AdminPanelScreenProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<
    "add" | "list" | "pricing" | "payments"
  >("add");

  const loadPaymentRecords = (): PaymentRecord[] => {
    try {
      return JSON.parse(
        localStorage.getItem("aiapget_payment_records") ?? "[]",
      );
    } catch {
      return [];
    }
  };

  // Payment records state — mutable so approve/reject updates re-render
  const [paymentRecords, setPaymentRecords] =
    useState<PaymentRecord[]>(loadPaymentRecords);

  // Reload payment records every time the payments tab is opened
  useEffect(() => {
    if (activeTab === "payments") {
      try {
        const records: PaymentRecord[] = JSON.parse(
          localStorage.getItem("aiapget_payment_records") ?? "[]",
        );
        setPaymentRecords(records);
      } catch {
        setPaymentRecords([]);
      }
    }
  }, [activeTab]);

  const handleApprovePayment = (record: PaymentRecord) => {
    // Activate subscription for this user
    const days = record.plan === "yearly" ? 365 : 30;
    const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;

    // Update the subscription key for the current device
    // Since this is localStorage-based, we update the shared subscription store
    // keyed by userId. For single-user device apps the main key is used.
    const subKey =
      record.userId && record.userId !== "unknown"
        ? `aiapget_subscription_${record.userId}`
        : "aiapget_subscription";

    localStorage.setItem(
      subKey,
      JSON.stringify({ plan: record.plan, status: "approved", expiresAt }),
    );

    // Also update the main key (for the current user on this device)
    const currentUserId = (() => {
      try {
        return (
          JSON.parse(localStorage.getItem("aiapget_user_session") ?? "{}").id ??
          null
        );
      } catch {
        return null;
      }
    })();
    if (currentUserId === record.userId || record.userId === "unknown") {
      localStorage.setItem(
        "aiapget_subscription",
        JSON.stringify({ plan: record.plan, status: "approved", expiresAt }),
      );
    }

    // Update payment record status
    const updated = loadPaymentRecords().map((r) =>
      r.id === record.id ? { ...r, status: "approved" as const } : r,
    );
    localStorage.setItem("aiapget_payment_records", JSON.stringify(updated));
    setPaymentRecords(updated);
  };

  const handleRejectPayment = (record: PaymentRecord) => {
    const updated = loadPaymentRecords().map((r) =>
      r.id === record.id ? { ...r, status: "rejected" as const } : r,
    );
    localStorage.setItem("aiapget_payment_records", JSON.stringify(updated));
    setPaymentRecords(updated);
  };

  // Pricing state
  const storedPrices = getStoredPrices();
  const [pricingMonthly, setPricingMonthly] = useState(
    String(storedPrices.monthly),
  );
  const [pricingYearly, setPricingYearly] = useState(
    String(storedPrices.yearly),
  );
  const [pricingTrialDays, setPricingTrialDays] = useState(
    String(storedPrices.trialDays),
  );
  const [pricingSaved, setPricingSaved] = useState(false);
  const [pricingError, setPricingError] = useState("");

  const [form, setForm] = useState<QuestionForm>(DEFAULT_FORM);
  const [confirmDeleteId, setConfirmDeleteId] = useState<bigint | null>(null);

  const { data: adminQuestions = [], isLoading: questionsLoading } =
    useGetAdminQuestions();
  const addQuestionMutation = useAddQuestion();
  const removeQuestionMutation = useRemoveQuestion();

  // Keep a stable ref to reset so we can call it without triggering re-renders
  const resetMutationRef = useRef(addQuestionMutation.reset);
  resetMutationRef.current = addQuestionMutation.reset;

  // Clear mutation error state on mount to avoid stale errors from previous sessions
  useEffect(() => {
    resetMutationRef.current();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleFormChange = (
    field: keyof QuestionForm,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setPricingError("");
    const monthly = Number.parseInt(pricingMonthly, 10);
    const yearly = Number.parseInt(pricingYearly, 10);
    const trialDays = Number.parseInt(pricingTrialDays, 10);
    if (Number.isNaN(monthly) || monthly < 1) {
      setPricingError("Monthly price must be a positive number.");
      return;
    }
    if (Number.isNaN(yearly) || yearly < 1) {
      setPricingError("Yearly price must be a positive number.");
      return;
    }
    if (Number.isNaN(trialDays) || trialDays < 1 || trialDays > 30) {
      setPricingError("Trial days must be between 1 and 30.");
      return;
    }
    localStorage.setItem(
      "aiapget_subscription_prices",
      JSON.stringify({ monthly, yearly, trialDays }),
    );
    setPricingSaved(true);
    setTimeout(() => setPricingSaved(false), 3000);
  };

  const handleDeleteConfirm = async (id: bigint) => {
    try {
      await removeQuestionMutation.mutateAsync(id);
      setConfirmDeleteId(null);
    } catch {
      // Error handled by mutation state
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!form.questionText.trim()) {
      setErrorMessage("Question text is required.");
      return;
    }
    if (
      !form.option1.trim() ||
      !form.option2.trim() ||
      !form.option3.trim() ||
      !form.option4.trim()
    ) {
      setErrorMessage("All four answer options are required.");
      return;
    }

    try {
      await addQuestionMutation.mutateAsync({
        questionText: form.questionText.trim(),
        answerOptions: [
          form.option1.trim(),
          form.option2.trim(),
          form.option3.trim(),
          form.option4.trim(),
        ],
        correctAnswerIndex: form.correctAnswerIndex,
        topic: form.topic,
        year: String(form.year),
        explanation: form.explanation.trim() || undefined,
      });

      setSuccessMessage("Question added successfully!");
      setForm({ ...DEFAULT_FORM });

      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: unknown) {
      const raw =
        err instanceof Error ? err.message : "Failed to add question.";
      setErrorMessage(raw);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Question Manager
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Enter admin password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter admin password"
                />
                {passwordError && (
                  <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Access Panel
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                ← Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">
              Question Manager
            </h1>
            <p className="text-xs text-muted-foreground">
              AIAPGET Unani PYQ Admin Panel
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("add");
              setSuccessMessage("");
              setErrorMessage("");
              resetMutationRef.current();
            }}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === "add"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-1.5" />
            Add Question
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("list");
              setSuccessMessage("");
              setErrorMessage("");
              resetMutationRef.current();
            }}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === "list"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1.5" />
            View Questions ({adminQuestions.length})
          </button>
          <button
            type="button"
            data-ocid="admin.pricing.tab"
            onClick={() => {
              setActiveTab("pricing");
              setSuccessMessage("");
              setErrorMessage("");
              resetMutationRef.current();
            }}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === "pricing"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-1.5" />
            Pricing
          </button>
          <button
            type="button"
            data-ocid="admin.payments.tab"
            onClick={() => {
              setActiveTab("payments");
              setSuccessMessage("");
              setErrorMessage("");
              resetMutationRef.current();
            }}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === "payments"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <CreditCard className="w-4 h-4 inline mr-1.5" />
            Payments ({paymentRecords.length})
          </button>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="mb-4 p-4 bg-success/10 border border-success/30 rounded-xl flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Add Question Form */}
        {activeTab === "add" && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-6">
              Add New Question
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Question Text */}
              <div>
                <label
                  htmlFor="question-text"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Question Text *
                </label>
                <textarea
                  id="question-text"
                  value={form.questionText}
                  onChange={(e) =>
                    handleFormChange("questionText", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Enter the question..."
                />
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["option1", "option2", "option3", "option4"] as const).map(
                  (opt, idx) => (
                    <div key={opt}>
                      <label
                        htmlFor={`option-${idx}`}
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Option {idx + 1}{" "}
                        {form.correctAnswerIndex === idx && (
                          <span className="text-success text-xs">
                            (Correct)
                          </span>
                        )}
                      </label>
                      <input
                        id={`option-${idx}`}
                        type="text"
                        value={form[opt]}
                        onChange={(e) => handleFormChange(opt, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder={`Option ${idx + 1}`}
                      />
                    </div>
                  ),
                )}
              </div>

              {/* Correct Answer */}
              <div>
                <label
                  htmlFor="correct-answer"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Correct Answer *
                </label>
                <select
                  id="correct-answer"
                  value={form.correctAnswerIndex}
                  onChange={(e) =>
                    handleFormChange(
                      "correctAnswerIndex",
                      Number(e.target.value),
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>
              </div>

              {/* Topic & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="question-topic"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Topic *
                  </label>
                  <select
                    id="question-topic"
                    value={form.topic}
                    onChange={(e) => handleFormChange("topic", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="question-year"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Year *
                  </label>
                  <select
                    id="question-year"
                    value={form.year}
                    onChange={(e) => handleFormChange("year", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanation (optional) */}
              <div>
                <label
                  htmlFor="question-explanation"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Explanation{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="question-explanation"
                  value={form.explanation}
                  onChange={(e) =>
                    handleFormChange("explanation", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Explain why the correct answer is right (optional)..."
                />
              </div>

              <button
                type="submit"
                disabled={addQuestionMutation.isPending}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {addQuestionMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding Question...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Question
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Pricing Settings */}
        {activeTab === "pricing" && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Subscription Pricing
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Update the subscription prices shown to users. Changes take effect
              immediately.
            </p>

            {pricingSaved && (
              <div
                data-ocid="admin.pricing.success_state"
                className="mb-4 p-4 bg-success/10 border border-success/30 rounded-xl flex items-center gap-2 text-success"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Prices saved successfully!
                </span>
              </div>
            )}
            {pricingError && (
              <div
                data-ocid="admin.pricing.error_state"
                className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{pricingError}</span>
              </div>
            )}

            <form onSubmit={handleSavePricing} className="space-y-5">
              <div>
                <label
                  htmlFor="pricing-monthly"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Monthly Plan Price (₹)
                </label>
                <input
                  id="pricing-monthly"
                  type="number"
                  data-ocid="admin.pricing.monthly.input"
                  value={pricingMonthly}
                  onChange={(e) => setPricingMonthly(e.target.value)}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <label
                  htmlFor="pricing-yearly"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Yearly Plan Price (₹)
                </label>
                <input
                  id="pricing-yearly"
                  type="number"
                  data-ocid="admin.pricing.yearly.input"
                  value={pricingYearly}
                  onChange={(e) => setPricingYearly(e.target.value)}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 800"
                />
              </div>

              <div>
                <label
                  htmlFor="pricing-trial"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Free Trial Duration (days)
                </label>
                <input
                  id="pricing-trial"
                  type="number"
                  data-ocid="admin.pricing.trial.input"
                  value={pricingTrialDays}
                  onChange={(e) => setPricingTrialDays(e.target.value)}
                  min={1}
                  max={30}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 7"
                />
              </div>

              <button
                type="submit"
                data-ocid="admin.pricing.save_button"
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Save Pricing
              </button>
            </form>
          </div>
        )}

        {/* Payment Records */}
        {activeTab === "payments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Payment Records
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verify UTR against your Razorpay dashboard, then Approve or
                  Reject each payment.
                </p>
              </div>
            </div>

            {paymentRecords.length === 0 ? (
              <div
                data-ocid="admin.payments.empty_state"
                className="bg-card rounded-2xl border border-border p-12 text-center"
              >
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">
                  No payment records yet. Records will appear here once users
                  complete subscription payments.
                </p>
              </div>
            ) : (
              [...paymentRecords].reverse().map((record, idx) => {
                const status = record.status ?? "pending";
                return (
                  <div
                    key={record.id}
                    data-ocid={`admin.payment.item.${idx + 1}`}
                    className={`bg-card rounded-2xl border p-5 space-y-3 ${
                      status === "approved"
                        ? "border-success/40"
                        : status === "rejected"
                          ? "border-destructive/40"
                          : "border-amber-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                          #{paymentRecords.length - idx}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-lg font-medium ${
                            record.plan === "yearly"
                              ? "bg-gold/10 text-gold"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {record.plan === "yearly" ? "Yearly" : "Monthly"}
                        </span>
                        {/* Status badge */}
                        <span
                          className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                            status === "approved"
                              ? "bg-success/15 text-success"
                              : status === "rejected"
                                ? "bg-destructive/15 text-destructive"
                                : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {status === "approved"
                            ? "Approved"
                            : status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {record.amount}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-0.5">
                          User Name
                        </p>
                        <p className="font-medium text-foreground">
                          {record.userName}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Date</p>
                        <p className="font-medium text-foreground">
                          {new Date(record.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground mb-0.5">
                          UTR / Transaction ID
                        </p>
                        <p className="font-mono font-bold text-success text-sm select-all">
                          {record.utrId}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">
                          Payment Method
                        </p>
                        <p className="font-medium text-foreground capitalize">
                          {record.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* Approve / Reject — only for pending */}
                    {status === "pending" && (
                      <div
                        className="flex gap-2 pt-1"
                        data-ocid={`admin.payment.actions.${idx + 1}`}
                      >
                        <button
                          type="button"
                          data-ocid={`admin.payment.approve_button.${idx + 1}`}
                          onClick={() => handleApprovePayment(record)}
                          className="flex-1 py-2 rounded-xl bg-success text-white text-sm font-semibold hover:bg-success/90 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          type="button"
                          data-ocid={`admin.payment.reject_button.${idx + 1}`}
                          onClick={() => handleRejectPayment(record)}
                          className="flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {status === "approved" && (
                      <p className="text-xs text-success font-medium flex items-center gap-1 pt-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Subscription activated for this user
                      </p>
                    )}
                    {status === "rejected" && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1 pt-1">
                        <X className="w-3.5 h-3.5" />
                        Payment rejected — user will see a retry notice
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Questions List */}
        {activeTab === "list" && (
          <div className="space-y-4">
            {questionsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : adminQuestions.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No questions added yet.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("add")}
                  className="mt-4 px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Add First Question
                </button>
              </div>
            ) : (
              adminQuestions.map((q: Question, idx: number) => (
                <div
                  key={String(q.id)}
                  data-ocid={`admin.question.item.${idx + 1}`}
                  className="bg-card rounded-2xl border border-border p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                      #{idx + 1}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">
                        {q.topic}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-lg">
                        {q.year}
                      </span>

                      {/* Delete / Confirm area */}
                      {confirmDeleteId === q.id ? (
                        <div className="flex items-center gap-1 ml-1">
                          <span className="text-xs text-destructive font-medium">
                            Remove?
                          </span>
                          <button
                            type="button"
                            data-ocid={`admin.question.confirm_button.${idx + 1}`}
                            disabled={removeQuestionMutation.isPending}
                            onClick={() => handleDeleteConfirm(q.id)}
                            className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-60 flex items-center gap-1"
                          >
                            {removeQuestionMutation.isPending &&
                            confirmDeleteId === q.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : null}
                            Yes
                          </button>
                          <button
                            type="button"
                            data-ocid={`admin.question.cancel_button.${idx + 1}`}
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-lg hover:text-foreground transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          data-ocid={`admin.question.delete_button.${idx + 1}`}
                          onClick={() => setConfirmDeleteId(q.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground font-medium mb-3 text-sm leading-relaxed">
                    {q.questionText}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.answerOptions.map((opt: string, optIdx: number) => (
                      <div
                        key={opt}
                        className={`text-xs px-3 py-2 rounded-lg border ${
                          optIdx === Number(q.correctAnswerIndex)
                            ? "bg-success/10 border-success/30 text-success font-medium"
                            : "bg-muted/50 border-border text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 p-3 bg-muted/40 rounded-lg border border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Explanation
                      </p>
                      <p className="text-xs text-foreground leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
