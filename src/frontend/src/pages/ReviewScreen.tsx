import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { useState } from "react";
import type { Question } from "../data/questions";

interface ReviewScreenProps {
  questions: Question[];
  answers: number[];
  onBack: () => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function ReviewScreen({
  questions,
  answers,
  onBack,
}: ReviewScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = questions[currentIndex];
  const userAnswer = answers[currentIndex];
  const isCorrect = userAnswer === current.correctIndex;
  const isSkipped = userAnswer === -1;

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
          <div className="flex-1">
            <h1 className="font-heading font-bold text-base">Answer Review</h1>
            <p className="text-xs font-medium opacity-85 font-body">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <Badge
            variant={
              isSkipped ? "secondary" : isCorrect ? "default" : "destructive"
            }
            className={
              isCorrect && !isSkipped ? "bg-success text-white border-0" : ""
            }
          >
            {isSkipped ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
          </Badge>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
        {/* Question */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-heading">
              {currentIndex + 1}
            </span>
            <div className="flex-1">
              <p className="text-foreground font-body text-base leading-relaxed">
                {current.text}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-muted-foreground font-body bg-muted px-2 py-0.5 rounded-full">
                  {current.topic}
                </span>
                <span className="text-xs text-muted-foreground font-body bg-muted px-2 py-0.5 rounded-full">
                  {current.year}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {current.options.map((option, idx) => {
            const isUserChoice = idx === userAnswer;
            const isCorrectChoice = idx === current.correctIndex;

            let cls =
              "w-full text-left border rounded-xl p-4 flex items-center gap-3 font-body text-sm";
            if (isCorrectChoice) {
              cls += " bg-success border-success";
            } else if (isUserChoice && !isCorrectChoice) {
              cls += " bg-destructive/10 border-destructive";
            } else {
              cls += " bg-card border-border opacity-55";
            }

            return (
              <div key={option} className={cls}>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading border ${
                    isCorrectChoice
                      ? "bg-white/30 border-white/50 text-white"
                      : isUserChoice
                        ? "bg-destructive border-destructive text-white"
                        : "border-border bg-muted text-foreground"
                  }`}
                >
                  {OPTION_LABELS[idx]}
                </span>
                <span
                  className={`flex-1 font-medium ${
                    isCorrectChoice
                      ? "text-white font-bold"
                      : isUserChoice && !isCorrectChoice
                        ? "text-destructive font-semibold"
                        : "text-foreground"
                  }`}
                >
                  {option}
                </span>
                {isCorrectChoice && (
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                )}
                {isUserChoice && !isCorrectChoice && (
                  <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {current.explanation && (
          <div className="bg-teal/10 border border-teal/30 rounded-xl p-4">
            <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-1 font-heading">
              Explanation
            </p>
            <p className="text-sm text-foreground font-body leading-relaxed">
              {current.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onBack}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Done
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 font-heading">
            Jump to Question
          </p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              const ans = answers[idx];
              const correct = ans === q.correctIndex;
              const skipped = ans === -1;
              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-heading transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                    idx === currentIndex
                      ? "bg-primary text-primary-foreground"
                      : skipped
                        ? "bg-muted text-muted-foreground"
                        : correct
                          ? "bg-success/20 text-success border border-success/40"
                          : "bg-destructive/15 text-destructive border border-destructive/30"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
