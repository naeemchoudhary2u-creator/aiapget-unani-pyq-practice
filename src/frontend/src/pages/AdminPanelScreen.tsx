import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { Question } from "../backend";
import {
  useAddQuestion,
  useGetAdminQuestions,
  useRemoveQuestion,
} from "../hooks/useAdminQueries";

const ADMIN_PASSWORD = "Naeem9472";

interface AdminPanelScreenProps {
  onBack: () => void;
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
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");

  const [form, setForm] = useState<QuestionForm>(DEFAULT_FORM);
  const [confirmDeleteId, setConfirmDeleteId] = useState<bigint | null>(null);

  const { data: adminQuestions = [], isLoading: questionsLoading } =
    useGetAdminQuestions();
  const addQuestionMutation = useAddQuestion();
  const removeQuestionMutation = useRemoveQuestion();

  // Clear messages and reset mutation state when switching tabs
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
    addQuestionMutation.reset();
  }, [addQuestionMutation.reset]);

  // Clear mutation error state on mount to avoid stale errors from previous sessions
  useEffect(() => {
    addQuestionMutation.reset();
  }, [addQuestionMutation.reset]);

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
            onClick={() => setActiveTab("add")}
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
            onClick={() => setActiveTab("list")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              activeTab === "list"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1.5" />
            View Questions ({adminQuestions.length})
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
