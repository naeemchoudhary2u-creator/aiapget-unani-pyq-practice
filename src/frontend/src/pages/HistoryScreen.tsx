import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Calendar, ChevronLeft, Trash2, Trophy } from "lucide-react";
import { useClearHistory, useQuizHistory } from "../hooks/useQueries";

interface HistoryScreenProps {
  onBack: () => void;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGrade(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: "Excellent", color: "text-success" };
  if (pct >= 60) return { label: "Good", color: "text-gold" };
  if (pct >= 40) return { label: "Average", color: "text-amber-600" };
  return { label: "Poor", color: "text-destructive" };
}

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const { data: history, isLoading } = useQuizHistory();
  const clearHistory = useClearHistory();

  const avgScore =
    history && history.length > 0
      ? Math.round(
          history.reduce((sum, a) => sum + (a.correct / a.total) * 100, 0) /
            history.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-base flex-1">
            Score History
          </h1>
          {history && history.length > 0 && (
            <button
              type="button"
              onClick={() => clearHistory.mutate()}
              disabled={clearHistory.isPending}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Clear history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 space-y-4">
        {/* Summary */}
        {!isLoading && history && history.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <Trophy className="w-4 h-4 text-gold" />,
                label: "Attempts",
                value: history.length,
              },
              {
                icon: <BarChart2 className="w-4 h-4 text-teal" />,
                label: "Avg Score",
                value: `${avgScore}%`,
              },
              {
                icon: <Calendar className="w-4 h-4 text-primary" />,
                label: "Best",
                value: `${Math.max(...history.map((a) => Math.round((a.correct / a.total) * 100)))}%`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-3 text-center shadow-xs"
              >
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="text-lg font-bold font-heading text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-body font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : !history || history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground/40 mb-3" />
            <p className="text-foreground font-body text-sm font-medium">
              No quiz attempts yet.
            </p>
            <p className="text-muted-foreground font-body text-xs mt-1">
              Complete a quiz to see your history here.
            </p>
            <Button
              onClick={onBack}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start a Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((attempt, idx) => {
              const pct = Math.round((attempt.correct / attempt.total) * 100);
              const grade = getGrade(pct);
              return (
                <div
                  key={attempt.timestamp}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold font-heading text-primary">
                      #{history.length - idx}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold font-heading ${grade.color}`}
                      >
                        {pct}%
                      </span>
                      <span
                        className={`text-xs font-semibold font-body ${grade.color}`}
                      >
                        {grade.label}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-body mt-0.5 font-medium">
                      {attempt.correct}/{attempt.total} correct &nbsp;·&nbsp;{" "}
                      {formatDate(attempt.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card py-3 px-4 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} AIAPGET Unani PYQ &nbsp;·&nbsp; Built
          with <span className="text-destructive">♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "aiapget-unani-pyq")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
