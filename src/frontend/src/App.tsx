import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import type { Question } from "./data/questions";
import AboutScreen from "./pages/AboutScreen";
import AdminPanelScreen from "./pages/AdminPanelScreen";
import ContactScreen from "./pages/ContactScreen";
import DeviceBlockedScreen from "./pages/DeviceBlockedScreen";
import HistoryScreen from "./pages/HistoryScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import PaymentMethodSelectorScreen from "./pages/PaymentMethodSelectorScreen";
import PrivacyPolicyScreen from "./pages/PrivacyPolicyScreen";
import ProfileSetupScreen from "./pages/ProfileSetupScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";
import ReviewScreen from "./pages/ReviewScreen";
import SubscriptionPlansScreen from "./pages/SubscriptionPlansScreen";
import TopicBrowserScreen from "./pages/TopicBrowserScreen";
import { getDeviceId, isDeviceAllowed } from "./utils/deviceId";

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
  | { name: "admin" }
  | { name: "subscription" }
  | {
      name: "payment";
      planName: string;
      planPrice: string;
      planCycle: "monthly" | "yearly";
    }
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
  "subscription",
  "payment",
]);

// ── Auth / subscription helpers ─────────────────────────────────────────────

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

function getSubscriptionStatus():
  | "active"
  | "pending"
  | "rejected"
  | "none"
  | "device_blocked" {
  try {
    const raw = localStorage.getItem("aiapget_subscription");
    if (!raw) return "none";
    const s = JSON.parse(raw);
    if (s.status === "pending") return "pending";
    if (s.status === "rejected") return "rejected";
    if (s.status === "approved") {
      const valid = typeof s.expiresAt === "number" && s.expiresAt > Date.now();
      if (!valid) return "none";
      // Device binding check — only applies once a device is bound
      if (!isDeviceAllowed(s.boundDeviceId)) return "device_blocked";
      return "active";
    }
    // Legacy records (no status field) — treat as active if expiry is valid
    if (typeof s.expiresAt === "number" && s.expiresAt > Date.now()) {
      if (!isDeviceAllowed(s.boundDeviceId)) return "device_blocked";
      return "active";
    }
    return "none";
  } catch {
    return "none";
  }
}

// Ensure device ID is initialised on every load
getDeviceId();

// ────────────────────────────────────────────────────────────────────────────

function AppContent() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  // Trigger re-evaluation of the gate by bumping this counter
  const [_gateKey, setGateKey] = useState(0);

  const navigateTo = (s: Screen) => setScreen(s);

  const refreshGate = () => setGateKey((k) => k + 1);

  // Gate checks (re-evaluated on every render + gateKey change)
  const session = getSession();
  const profileComplete = isProfileComplete();
  const subscriptionStatus = getSubscriptionStatus();
  const activeSubscription = subscriptionStatus === "active";
  const deviceBlocked = subscriptionStatus === "device_blocked";

  // Determine what to show based on gate state
  // Allow admin screen without subscription check
  const isAdminScreen = screen.name === "admin";

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

  // Device binding block — subscription is active on a different device
  if (deviceBlocked && !isAdminScreen) {
    return <DeviceBlockedScreen />;
  }

  if (!profileComplete) {
    return (
      <ProfileSetupScreen
        onProfileComplete={() => {
          refreshGate();
          setScreen({ name: "subscription" });
        }}
      />
    );
  }

  if (!activeSubscription && !isAdminScreen) {
    // If the user is on a subscription or payment screen, render it
    if (screen.name === "subscription" || screen.name === "payment") {
      // fall through to normal rendering below
    } else {
      // Force subscription screen (pass status so it can show pending/rejected notices)
      return (
        <SubscriptionPlansScreen
          subscriptionStatus={subscriptionStatus}
          onNavigate={(s) => {
            setScreen(s);
            if (s.name === "home") refreshGate();
          }}
        />
      );
    }
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

        {screen.name === "admin" && (
          <AdminPanelScreen onBack={() => navigateTo({ name: "home" })} />
        )}

        {screen.name === "subscription" && (
          <SubscriptionPlansScreen
            subscriptionStatus={subscriptionStatus}
            onNavigate={(s) => {
              navigateTo(s);
              if (s.name === "home") refreshGate();
            }}
          />
        )}

        {screen.name === "payment" && (
          <PaymentMethodSelectorScreen
            planName={screen.planName}
            planPrice={screen.planPrice}
            planCycle={screen.planCycle}
            onNavigate={(s) => {
              navigateTo(s);
              if (s.name === "home") refreshGate();
            }}
          />
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
