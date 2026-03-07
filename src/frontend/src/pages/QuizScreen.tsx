import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  SkipForward,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Question } from "../data/questions";

interface QuizScreenProps {
  questions: Question[];
  onComplete: (answers: number[], startTime: number) => void;
  onBack: () => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 60;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizScreen({
  questions,
  onComplete,
  onBack,
}: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1),
  );
  const [startTime] = useState(() => Date.now());
  const [timeRemaining, setTimeRemaining] = useState(TIMER_SECONDS);

  const current = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isAnswered = selectedAnswer !== -1;
  const isLast = currentIndex === questions.length - 1;
  const progress =
    ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

  // Refs to always hold the latest values inside the interval callback
  // so auto-skip logic never captures a stale closure.
  const answersRef = useRef(answers);
  const isLastRef = useRef(isLast);
  const onCompleteRef = useRef(onComplete);
  const startTimeRef = useRef(startTime);

  // Keep refs in sync with latest values each render
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    isLastRef.current = isLast;
  }, [isLast]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Countdown timer — restarts on every new question (currentIndex changes)
  // and stops immediately when a question is answered.
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIndex intentionally restarts the timer
  useEffect(() => {
    // Reset to full 60 s for each new question
    setTimeRemaining(TIMER_SECONDS);

    // Don't run timer if the question is already answered
    if (isAnswered) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Read fresh values from refs to avoid stale closure bugs
          setTimeout(() => {
            if (isLastRef.current) {
              onCompleteRef.current(answersRef.current, startTimeRef.current);
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnswered]);

  const stopTimer = () => {
    // Timer cleanup is handled by the useEffect cleanup above;
    // this is a no-op stub kept for call-site compatibility.
  };

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;
    stopTimer();
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    stopTimer();
    if (isLast) {
      onComplete(answers, startTime);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleSkip = () => {
    stopTimer();
    // Leave answers[currentIndex] as -1 (skipped)
    if (isLast) {
      onComplete(answers, startTime);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    stopTimer();
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const isTimeLow = timeRemaining <= 10;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
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
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body font-medium">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2">
                {/* Countdown Timer */}
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold font-heading transition-colors ${
                    isTimeLow
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-white/20 text-primary-foreground"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
                <span className="text-xs font-body font-medium bg-white/15 text-primary-foreground px-2 py-0.5 rounded-full">
                  {current.topic}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-1.5 bg-white/20" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
        {/* Question Card */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-heading">
              {currentIndex + 1}
            </span>
            <p className="text-foreground font-body text-base leading-relaxed pt-1">
              {current.text}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-body bg-muted px-2 py-0.5 rounded-full">
              Year: {current.year}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {current.options.map((option, idx) => {
            const isCorrect = idx === current.correctIndex;
            const isSelected = idx === selectedAnswer;

            let optionClass =
              "w-full text-left border rounded-xl p-4 flex items-center gap-3 transition-all duration-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50";

            if (!isAnswered) {
              optionClass +=
                " bg-card border-border text-foreground hover:border-gold hover:bg-gold/5 cursor-pointer";
            } else if (isCorrect) {
              optionClass += " bg-success border-success cursor-default";
            } else if (isSelected) {
              optionClass +=
                " bg-destructive/10 border-destructive cursor-default";
            } else {
              optionClass +=
                " bg-card border-border text-foreground opacity-55 cursor-default";
            }

            return (
              <button
                type="button"
                key={option}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={optionClass}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading border transition-colors ${
                    isAnswered && isCorrect
                      ? "bg-success border-success text-white"
                      : isAnswered && isSelected
                        ? "bg-destructive border-destructive text-white"
                        : "border-border bg-muted text-foreground"
                  }`}
                >
                  {OPTION_LABELS[idx]}
                </span>
                <span
                  className={`flex-1 ${
                    isAnswered && isCorrect
                      ? "text-white font-bold"
                      : isAnswered && isSelected && !isCorrect
                        ? "text-destructive font-medium"
                        : "text-foreground"
                  }`}
                >
                  {option}
                </span>
                {isAnswered && isCorrect && (
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && current.explanation && (
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
        <div className="flex items-center justify-between pt-2 gap-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {/* Skip Button — hidden once answered */}
            {!isAnswered && (
              <Button
                variant="outline"
                onClick={handleSkip}
                className="gap-1.5 border-gold text-gold hover:bg-gold/10 hover:border-gold"
              >
                <SkipForward className="w-4 h-4" />
                {isLast ? "Skip & Finish" : "Skip"}
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLast ? "Finish Quiz" : "Next"}
              {!isLast && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
