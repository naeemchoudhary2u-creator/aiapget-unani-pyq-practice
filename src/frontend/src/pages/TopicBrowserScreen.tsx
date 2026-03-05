import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Loader2,
  Play,
} from "lucide-react";
import { useState } from "react";
import {
  type Question,
  TOPICS,
  YEARS,
  questions as staticQuestions,
} from "../data/questions";
import { useAllQuestions } from "../hooks/useAdminQueries";

interface TopicBrowserScreenProps {
  initialMode?: BrowseMode;
  onStartQuiz: (questions: Question[]) => void;
  onBack: () => void;
}

type BrowseMode = "topic" | "year";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TopicBrowserScreen({
  initialMode = "topic",
  onStartQuiz,
  onBack,
}: TopicBrowserScreenProps) {
  const [mode, setMode] = useState<BrowseMode>(initialMode);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const { data: allQuestions = staticQuestions, isLoading } = useAllQuestions();

  // Build topic list: include all static topics + any new topics from backend questions
  const allTopics = Array.from(
    new Set([...TOPICS, ...allQuestions.map((q) => q.topic)]),
  );

  // Build year list: include all static years + any new years from backend questions
  // Local Question.year is always a number
  const allYears = Array.from(
    new Set([...YEARS, ...allQuestions.map((q) => q.year)]),
  ).sort((a, b) => a - b);

  const topicData = allTopics
    .map((topic) => ({
      topic,
      questions: allQuestions.filter((q) => q.topic === topic),
    }))
    .filter((t) => t.questions.length > 0);

  const yearData = allYears
    .map((year) => ({
      year,
      questions: allQuestions.filter((q) => q.year === year),
    }))
    .filter((y) => y.questions.length > 0);

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
            Browse Questions
          </h1>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin opacity-70" />}
        </div>
        {/* Mode Toggle */}
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("topic")}
            className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
              mode === "topic"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            By Topic
          </button>
          <button
            type="button"
            onClick={() => setMode("year")}
            className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
              mode === "year"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            By Year
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-body">Loading questions…</span>
          </div>
        )}

        {!isLoading &&
          mode === "topic" &&
          topicData.map(({ topic, questions: topicQs }) => (
            <div
              key={topic}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedTopic(expandedTopic === topic ? null : topic)
                }
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground font-heading text-sm">
                    {topic}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    {topicQs.length} question{topicQs.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartQuiz(shuffleArray(topicQs));
                    }}
                    className="gap-1 bg-primary hover:bg-primary/90 text-xs h-7 px-3"
                  >
                    <Play className="w-3 h-3" />
                    Quiz
                  </Button>
                  {expandedTopic === topic ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedTopic === topic && (
                <div className="border-t border-border divide-y divide-border">
                  {topicQs.map((q, idx) => (
                    <div
                      key={q.id}
                      className="px-4 py-3 flex items-start gap-3"
                    >
                      <span className="text-xs text-muted-foreground font-body w-5 flex-shrink-0 pt-0.5">
                        {idx + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-body leading-snug">
                          {q.text}
                        </p>
                        <span className="text-xs text-muted-foreground font-body mt-1 inline-block">
                          Year: {q.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        {!isLoading &&
          mode === "year" &&
          yearData.map(({ year, questions: yearQs }) => (
            <div
              key={year}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedYear(expandedYear === year ? null : year)
                }
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 font-bold font-heading text-sm">
                  {String(year).slice(2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground font-heading text-sm">
                    AIAPGET {year}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    {yearQs.length} question{yearQs.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartQuiz(shuffleArray(yearQs));
                    }}
                    className="gap-1 bg-primary hover:bg-primary/90 text-xs h-7 px-3"
                  >
                    <Play className="w-3 h-3" />
                    Quiz
                  </Button>
                  {expandedYear === year ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedYear === year && (
                <div className="border-t border-border divide-y divide-border">
                  {yearQs.map((q, idx) => (
                    <div
                      key={q.id}
                      className="px-4 py-3 flex items-start gap-3"
                    >
                      <span className="text-xs text-muted-foreground font-body w-5 flex-shrink-0 pt-0.5">
                        {idx + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-body leading-snug">
                          {q.text}
                        </p>
                        <span className="text-xs text-muted-foreground font-body mt-1 inline-block">
                          Topic: {q.topic}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} AIAPGET Unani PYQ Practice &nbsp;·&nbsp;{" "}
          Built with <span className="text-destructive">♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "aiapget-unani-pyq")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
