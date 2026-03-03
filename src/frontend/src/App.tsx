import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppHeader from "./components/AppHeader";
import type { Question } from "./data/questions";
import AdminPanelScreen from "./pages/AdminPanelScreen";
import HistoryScreen from "./pages/HistoryScreen";
import HomeScreen from "./pages/HomeScreen";
import PaymentMethodSelectorScreen from "./pages/PaymentMethodSelectorScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";
import ReviewScreen from "./pages/ReviewScreen";
import SubscriptionPlansScreen from "./pages/SubscriptionPlansScreen";
import TopicBrowserScreen from "./pages/TopicBrowserScreen";

export type Screen =
  | { name: "home" }
  | { name: "quiz"; questions: Question[] }
  | {
      name: "results";
      questions: Question[];
      answers: number[];
      startTime: number;
    }
  | { name: "review"; questions: Question[]; answers: number[] }
  | { name: "topics" }
  | { name: "history" }
  | { name: "admin" }
  | { name: "subscription" }
  | {
      name: "payment";
      planName: string;
      planPrice: string;
      planCycle: "monthly" | "yearly";
    };

const queryClient = new QueryClient();

// Screens where the persistent AppHeader should NOT be shown
// (quiz/results/review have their own back navigation)
const HEADER_HIDDEN_SCREENS = new Set(["quiz", "results", "review"]);

function AppContent() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  const navigateTo = (s: Screen) => setScreen(s);

  const showHeader = !HEADER_HIDDEN_SCREENS.has(screen.name);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && (
        <AppHeader onNavigate={navigateTo} currentScreen={screen.name} />
      )}

      <div className="flex-1">
        {screen.name === "home" && <HomeScreen onNavigate={navigateTo} />}

        {screen.name === "quiz" && (
          <QuizScreen
            questions={screen.questions}
            onComplete={(answers, startTime) =>
              navigateTo({
                name: "results",
                questions: screen.questions,
                answers,
                startTime,
              })
            }
            onBack={() => navigateTo({ name: "home" })}
          />
        )}

        {screen.name === "results" && (
          <ResultsScreen
            questions={screen.questions}
            answers={screen.answers}
            startTime={screen.startTime}
            onReview={() =>
              navigateTo({
                name: "review",
                questions: screen.questions,
                answers: screen.answers,
              })
            }
            onNewQuiz={() => navigateTo({ name: "home" })}
          />
        )}

        {screen.name === "review" && (
          <ReviewScreen
            questions={screen.questions}
            answers={screen.answers}
            onBack={() => navigateTo({ name: "home" })}
          />
        )}

        {screen.name === "topics" && (
          <TopicBrowserScreen
            onStartQuiz={(qs) => navigateTo({ name: "quiz", questions: qs })}
            onBack={() => navigateTo({ name: "home" })}
          />
        )}

        {screen.name === "history" && (
          <HistoryScreen onBack={() => navigateTo({ name: "home" })} />
        )}

        {screen.name === "admin" && (
          <AdminPanelScreen onBack={() => navigateTo({ name: "home" })} />
        )}

        {screen.name === "subscription" && (
          <SubscriptionPlansScreen onNavigate={navigateTo} />
        )}

        {screen.name === "payment" && (
          <PaymentMethodSelectorScreen
            planName={screen.planName}
            planPrice={screen.planPrice}
            planCycle={screen.planCycle}
            onNavigate={navigateTo}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
