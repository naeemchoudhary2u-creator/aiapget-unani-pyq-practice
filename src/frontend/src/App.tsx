import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import type { Question } from "./data/questions";
import AboutScreen from "./pages/AboutScreen";
import ContactScreen from "./pages/ContactScreen";
import HistoryScreen from "./pages/HistoryScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import ManagementScreen from "./pages/ManagementScreen";
import PrivacyPolicyScreen from "./pages/PrivacyPolicyScreen";
import ProfileSetupScreen from "./pages/ProfileSetupScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";
import ReviewScreen from "./pages/ReviewScreen";
import TopicBrowserScreen from "./pages/TopicBrowserScreen";
import { getDeviceId } from "./utils/deviceId";

export type Screen =
  | { name: "home" }
  | { name: "login" }
  | { name: "profile-setup" }
  | { name: "quiz"; questions: Question[] }
  | {
      name: "results";
      questions: Question[];
      answers: number[];
      startTime: number;
    }
  | { name: "review"; questions: Question[]; answers: number[] }
  | { name: "topics"; mode?: "topic" | "year" }
  | { name: "history" }
  | { name: "management" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "privacy" };

const queryClient = new QueryClient();

// Screens where the persistent AppHeader/Footer should NOT be shown
const HEADER_HIDDEN_SCREENS = new Set([
  "quiz",
  "results",
  "review",
  "login",
  "profile-setup",
]);

// ── Auth helpers ─────────────────────────────────────────────────────────────

function getSession() {
  try {
    const raw = localStorage.getItem("aiapget_user_session");
    if (!raw) return null;
    return JSON.parse(raw) as {
      id: string;
      name: string;
      loginType: "mobile" | "google";
      loginTime: number;
    };
  } catch {
    return null;
  }
}

function isProfileComplete() {
  try {
    const raw = localStorage.getItem("aiapget_user_profile");
    if (!raw) return false;
    const p = JSON.parse(raw);
    return p.profileCompleted === true;
  } catch {
    return false;
  }
}

// Ensure device ID is initialised on every load
getDeviceId();

// ────────────────────────────────────────────────────────────────────────────

function AppContent() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [_gateKey, setGateKey] = useState(0);

  const navigateTo = (s: Screen) => setScreen(s);
  const refreshGate = () => setGateKey((k) => k + 1);

  const session = getSession();

  const profileComplete = isProfileComplete();

  if (!session) {
    return (
      <LoginScreen
        onLoginComplete={() => {
          refreshGate();
          setScreen({ name: "home" });
        }}
      />
    );
  }

  if (!profileComplete) {
    return (
      <ProfileSetupScreen
        onProfileComplete={() => {
          refreshGate();
          setScreen({ name: "home" });
        }}
      />
    );
  }

  const showHeader = !HEADER_HIDDEN_SCREENS.has(screen.name);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && (
        <AppHeader
          onNavigate={navigateTo}
          currentScreen={screen.name}
          onLogout={() => {
            refreshGate();
            setScreen({ name: "home" });
          }}
        />
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
            initialMode={screen.mode ?? "topic"}
            onStartQuiz={(qs) => navigateTo({ name: "quiz", questions: qs })}
            onBack={() => navigateTo({ name: "home" })}
          />
        )}

        {screen.name === "history" && (
          <HistoryScreen onBack={() => navigateTo({ name: "home" })} />
        )}

        {screen.name === "management" && (
          <ManagementScreen onBack={() => navigateTo({ name: "home" })} />
        )}

        {screen.name === "about" && <AboutScreen onNavigate={navigateTo} />}

        {screen.name === "contact" && <ContactScreen onNavigate={navigateTo} />}

        {screen.name === "privacy" && (
          <PrivacyPolicyScreen onNavigate={navigateTo} />
        )}
      </div>

      {showHeader && <Footer onNavigate={navigateTo} />}
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
