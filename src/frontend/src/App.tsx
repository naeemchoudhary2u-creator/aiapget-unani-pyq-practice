import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import type { Question } from "./data/questions";
import {
  useGetSubscriptionByUser,
  useUpdateLastLoginDevice,
} from "./hooks/useSubscriptionQueries";
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

const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24 hours in ms

function getSubscriptionStatus():
  | "active"
  | "grace"
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

    const now = Date.now();

    if (
      s.status === "approved" ||
      (typeof s.expiresAt === "number" && !s.status)
    ) {
      // Device binding check — only applies once a device is bound
      if (s.boundDeviceId && !isDeviceAllowed(s.boundDeviceId))
        return "device_blocked";

      // Grace period: expired within 24 hours → still allow but warn
      if (typeof s.expiresAt === "number") {
        if (s.expiresAt > now) return "active";
        if (s.expiresAt > now - GRACE_PERIOD_MS) return "grace";
      }
      return "none";
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
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    getSubscriptionStatus,
  );
  const activeSubscription =
    subscriptionStatus === "active" || subscriptionStatus === "grace";
  const deviceBlocked = subscriptionStatus === "device_blocked";

  // Backend subscription sync
  const userId = session?.id ?? "";
  const { data: backendSub } = useGetSubscriptionByUser(userId);
  const updateLastLoginDeviceMutation = useUpdateLastLoginDevice();
  const lastSyncedUserIdRef = useRef<string | null>(null);
  const updateLastLoginDeviceMutateRef = useRef(
    updateLastLoginDeviceMutation.mutate,
  );
  updateLastLoginDeviceMutateRef.current = updateLastLoginDeviceMutation.mutate;

  useEffect(() => {
    if (!backendSub || !userId) return;

    const currentDeviceId = getDeviceId();

    // If admin has reset device binding (RESET_REQUESTED sentinel), clear local lock
    if (backendSub.deviceId === "RESET_REQUESTED") {
      try {
        const raw = localStorage.getItem("aiapget_subscription");
        if (raw) {
          const s = JSON.parse(raw);
          s.boundDeviceId = undefined;
          localStorage.setItem("aiapget_subscription", JSON.stringify(s));
        }
      } catch {}
      setSubscriptionStatus(getSubscriptionStatus());
      return;
    }

    // Sync backend subscription into localStorage if backend is source of truth
    if (backendSub.status === "active") {
      const expiryDate = new Date(backendSub.expiryDate);
      const expiresAt = expiryDate.getTime();

      const syncedSub = {
        plan: backendSub.planType,
        status: "approved",
        expiresAt,
        boundDeviceId: backendSub.deviceId || currentDeviceId,
        startDate: backendSub.startDate,
        paymentRef: backendSub.paymentRef,
        userName: backendSub.userName,
      };

      // If device doesn't match stored deviceId, block
      if (backendSub.deviceId && backendSub.deviceId !== currentDeviceId) {
        syncedSub.boundDeviceId = backendSub.deviceId;
      }

      localStorage.setItem("aiapget_subscription", JSON.stringify(syncedSub));
      setSubscriptionStatus(getSubscriptionStatus());
    }

    // Update last login device (fire and forget)
    if (lastSyncedUserIdRef.current !== userId) {
      lastSyncedUserIdRef.current = userId;
      updateLastLoginDeviceMutateRef.current({
        userId,
        deviceId: currentDeviceId,
      });
    }
  }, [backendSub, userId]);

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
            if (s.name === "home") {
              setSubscriptionStatus(getSubscriptionStatus());
              refreshGate();
            }
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
              if (s.name === "home") {
                setSubscriptionStatus(getSubscriptionStatus());
                refreshGate();
              }
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
