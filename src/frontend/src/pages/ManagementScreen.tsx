/**
 * ManagementScreen — Password-gated management dashboard
 * Password: Naeem@#9472
 */

import { AlertCircle, ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";

const MANAGEMENT_PASSWORD = "Naeem@#9472";

// ── Password Gate ─────────────────────────────────────────────────────────────

interface PasswordGateProps {
  onUnlock: () => void;
  onBack: () => void;
}

function PasswordGate({ onUnlock, onBack }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MANAGEMENT_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground font-heading">
              Management
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              AIAPGET Unani PYQ Practice
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="mgmt-password"
              className="text-sm font-semibold text-foreground font-body"
            >
              Management Password
            </label>
            <input
              id="mgmt-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              data-ocid="management.password.input"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-input focus:ring-primary/30 focus:border-primary"
              }`}
            />
            {error && (
              <p
                data-ocid="management.password.field_error"
                className="text-xs text-destructive font-body flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            data-ocid="management.password.submit_button"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Unlock Management
          </button>
        </form>

        <button
          type="button"
          data-ocid="management.back_button"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}

// ── Main ManagementScreen ─────────────────────────────────────────────────────

interface ManagementScreenProps {
  onBack: () => void;
}

export default function ManagementScreen({ onBack }: ManagementScreenProps) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} onBack={onBack} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            data-ocid="management.back_button"
            onClick={onBack}
            aria-label="Back to Home"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-foreground font-heading truncate">
              Management
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              AIAPGET Unani PYQ · Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center">
        <div data-ocid="management.panel" className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground font-heading">
            Management page — no sections configured.
          </p>
          <p className="text-sm text-muted-foreground font-body">
            No management features are currently enabled.
          </p>
        </div>
      </div>
    </div>
  );
}
