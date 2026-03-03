import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Eye,
  Minus,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import type { Question } from "../data/questions";
import { useRecordAttempt } from "../hooks/useQueries";

interface ResultsScreenProps {
  questions: Question[];
  answers: number[];
  startTime: number;
  onReview: () => void;
  onNewQuiz: () => void;
}

function getPerformanceTier(pct: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (pct >= 80)
    return { label: "Excellent", color: "text-success", emoji: "🏆" };
  if (pct >= 60) return { label: "Good", color: "text-gold", emoji: "⭐" };
  if (pct >= 40)
    return { label: "Average", color: "text-amber-600", emoji: "📚" };
  return { label: "Needs Improvement", color: "text-destructive", emoji: "💪" };
}

export default function ResultsScreen({
  questions,
  answers,
  startTime,
  onReview,
  onNewQuiz,
}: ResultsScreenProps) {
  const recordAttempt = useRecordAttempt();

  const correct = answers.filter(
    (a, i) => a === questions[i].correctIndex,
  ).length;
  const total = questions.length;
  const skipped = answers.filter((a) => a === -1).length;
  const incorrect = total - correct - skipped;
  const percentage = Math.round((correct / total) * 100);
  const tier = getPerformanceTier(percentage);
  const timeTaken = Math.round((Date.now() - startTime) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  useEffect(() => {
    recordAttempt.mutate({
      timestamp: Math.floor(Date.now() / 1000),
      correct,
      total,
    });
  }, [correct, total, recordAttempt.mutate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-heading font-bold">Quiz Results</h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-5">
        {/* Score Card */}
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-xs">
          <div className="text-5xl mb-2">{tier.emoji}</div>
          <div className={`text-4xl font-bold font-heading ${tier.color}`}>
            {percentage}%
          </div>
          <div
            className={`text-lg font-semibold font-heading mt-1 ${tier.color}`}
          >
            {tier.label}
          </div>
          <div className="text-sm text-foreground font-body mt-2 font-medium">
            {correct} out of {total} correct
          </div>

          <div className="mt-4">
            <Progress value={percentage} className="h-3 rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: <CheckCircle className="w-5 h-5 text-success" />,
              label: "Correct",
              value: correct,
              color: "text-success",
            },
            {
              icon: <XCircle className="w-5 h-5 text-destructive" />,
              label: "Incorrect",
              value: incorrect,
              color: "text-destructive",
            },
            {
              icon: <Minus className="w-5 h-5 text-muted-foreground" />,
              label: "Skipped",
              value: skipped,
              color: "text-foreground",
            },
            {
              icon: <Trophy className="w-5 h-5 text-gold" />,
              label: "Time",
              value: `${minutes}m ${seconds}s`,
              color: "text-gold",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-3 text-center shadow-xs"
            >
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <div className={`text-xl font-bold font-heading ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-body font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Topic Breakdown */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">
            Topic Breakdown
          </h3>
          <div className="space-y-2">
            {Array.from(new Set(questions.map((q) => q.topic))).map((topic) => {
              const topicQs = questions.filter((q) => q.topic === topic);
              const topicCorrect = topicQs.filter((q, _) => {
                const idx = questions.indexOf(q);
                return answers[idx] === q.correctIndex;
              }).length;
              const topicPct = Math.round(
                (topicCorrect / topicQs.length) * 100,
              );
              return (
                <div key={topic} className="flex items-center gap-3">
                  <span className="text-xs font-body text-foreground w-32 truncate font-medium">
                    {topic}
                  </span>
                  <div className="flex-1">
                    <Progress value={topicPct} className="h-2" />
                  </div>
                  <span className="text-xs font-body text-foreground w-16 text-right font-semibold">
                    {topicCorrect}/{topicQs.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onReview}
            className="flex-1 gap-2 border-gold text-gold hover:bg-gold/10"
          >
            <Eye className="w-4 h-4" />
            Review Answers
          </Button>
          <Button
            onClick={onNewQuiz}
            className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Start New Quiz
          </Button>
        </div>
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
