import { ArrowRight, Loader2, Mail, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

interface LoginScreenProps {
  onLoginComplete: () => void;
}

type LoginMode = "select" | "google-form" | "mobile-form";

function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Store the last-used login credentials so we can auto-login next time
function saveCredential(type: "google" | "mobile", value: string) {
  try {
    localStorage.setItem(
      "aiapget_last_credential",
      JSON.stringify({ type, value }),
    );
  } catch {}
}

function getLastCredential(): {
  type: "google" | "mobile";
  value: string;
} | null {
  try {
    const raw = localStorage.getItem("aiapget_last_credential");
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (
      (c.type === "google" || c.type === "mobile") &&
      typeof c.value === "string" &&
      c.value.length > 0
    ) {
      return c;
    }
    return null;
  } catch {
    return null;
  }
}

export default function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [mode, setMode] = useState<LoginMode>("select");
  const [googleName, setGoogleName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  // Auto-login: if the user has previously logged in, restore their session automatically
  useEffect(() => {
    if (autoLoginAttempted) return;
    setAutoLoginAttempted(true);

    const cred = getLastCredential();
    if (!cred) return;

    // Auto-login using saved credential
    setIsLoading(true);
    setTimeout(() => {
      if (cred.type === "google") {
        const session = {
          id: generateId("google"),
          name: cred.value,
          loginType: "google" as const,
          loginTime: Date.now(),
        };
        localStorage.setItem("aiapget_user_session", JSON.stringify(session));
      } else {
        const digits = cred.value.replace(/\D/g, "");
        const session = {
          id: generateId("mobile"),
          name: `User ${digits.slice(-4)}`,
          mobile: digits,
          loginType: "mobile" as const,
          loginTime: Date.now(),
        };
        localStorage.setItem("aiapget_user_session", JSON.stringify(session));
      }
      setIsLoading(false);
      onLoginComplete();
    }, 400);
  }, [autoLoginAttempted, onLoginComplete]);

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!googleName.trim()) {
      setError("Please enter your name.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const session = {
        id: generateId("google"),
        name: googleName.trim(),
        loginType: "google" as const,
        loginTime: Date.now(),
      };
      localStorage.setItem("aiapget_user_session", JSON.stringify(session));
      saveCredential("google", googleName.trim());
      setIsLoading(false);
      onLoginComplete();
    }, 600);
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const digits = mobileNumber.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const session = {
        id: generateId("mobile"),
        name: `User ${digits.slice(-4)}`,
        mobile: digits,
        loginType: "mobile" as const,
        loginTime: Date.now(),
      };
      localStorage.setItem("aiapget_user_session", JSON.stringify(session));
      saveCredential("mobile", digits);
      setIsLoading(false);
      onLoginComplete();
    }, 600);
  };

  // Show a loading screen during auto-login
  if (isLoading && mode === "select") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/app-logo-transparent.dim_128x128.png"
            alt="AIAPGET Logo"
            className="w-20 h-20 rounded-full border-4 border-gold object-cover shadow-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/generated/app-logo.dim_128x128.png";
            }}
          />
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-body">
            Signing you in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm space-y-6">
        {/* Logo & App Name */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <img
              src="/assets/generated/app-logo-transparent.dim_128x128.png"
              alt="AIAPGET Logo"
              className="w-20 h-20 rounded-full border-4 border-gold object-cover shadow-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/generated/app-logo.dim_128x128.png";
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              AIAPGET Unani PYQ
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Previous Year Questions Practice
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {mode === "select" && (
            <div className="p-6 space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-heading font-bold text-foreground">
                  Welcome
                </h2>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Sign in to access your practice sessions
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Google Login */}
                <button
                  type="button"
                  data-ocid="login.google.button"
                  onClick={() => {
                    setMode("google-form");
                    setError("");
                  }}
                  className="w-full flex items-center gap-4 bg-white dark:bg-card border-2 border-border rounded-xl px-4 py-3.5 hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98] transition-all duration-150 group"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      role="img"
                      aria-label="Google logo"
                    >
                      <title>Google</title>
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground font-body">
                      Continue with Google
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      Use your Google account
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-body">
                    or
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Mobile Login */}
                <button
                  type="button"
                  data-ocid="login.mobile.button"
                  onClick={() => {
                    setMode("mobile-form");
                    setError("");
                  }}
                  className="w-full flex items-center gap-4 bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-3.5 hover:border-primary/50 hover:bg-primary/10 active:scale-[0.98] transition-all duration-150 group"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground font-body">
                      Continue with Mobile
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      Use your phone number
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          )}

          {mode === "google-form" && (
            <div className="p-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMode("select");
                  setGoogleName("");
                  setError("");
                }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                ← Back
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground">
                    Continue with Google
                  </h3>
                  <p className="text-xs text-muted-foreground font-body">
                    Enter your name to proceed
                  </p>
                </div>
              </div>

              <form onSubmit={handleGoogleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="google-name"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="google-name"
                    type="text"
                    data-ocid="login.google.input"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground font-body"
                    placeholder="Enter your full name"
                  />
                </div>

                {error && (
                  <p
                    className="text-xs text-destructive font-body"
                    data-ocid="login.error_state"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="login.google.submit_button"
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 font-body"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {isLoading ? "Signing in..." : "Continue"}
                </button>
              </form>
            </div>
          )}

          {mode === "mobile-form" && (
            <div className="p-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMode("select");
                  setMobileNumber("");
                  setError("");
                }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                ← Back
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground">
                    Continue with Mobile
                  </h3>
                  <p className="text-xs text-muted-foreground font-body">
                    Enter your 10-digit mobile number
                  </p>
                </div>
              </div>

              <form onSubmit={handleMobileSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="mobile-number"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Mobile Number
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-body font-medium flex-shrink-0">
                      +91
                    </span>
                    <input
                      id="mobile-number"
                      type="tel"
                      data-ocid="login.mobile.input"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground font-body"
                      placeholder="Enter mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>

                {error && (
                  <p
                    className="text-xs text-destructive font-body"
                    data-ocid="login.error_state"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="login.mobile.submit_button"
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 font-body"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {isLoading ? "Signing in..." : "Continue"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground font-body px-2">
          © {new Date().getFullYear()} AIAPGET Unani PYQ Practice. Built with{" "}
          <span className="text-destructive">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
