import { BookOpen, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginScreen() {
  const { login, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-card rounded-3xl shadow-lg border border-border p-8 sm:p-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "backOut" }}
            className="flex justify-center mb-7"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shadow-xs">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading text-2xl font-bold text-foreground leading-tight mb-2">
              AIAPGET Unani
              <br />
              PYQ Practice
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Login to start practicing and track your progress
            </p>
          </motion.div>

          {/* Features list */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.4 }}
            className="space-y-2 mb-8"
          >
            {[
              "Year-wise & topic-wise MCQs",
              "Instant feedback with explanations",
              "Track your quiz history",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </motion.ul>

          {/* Login button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
          >
            <button
              type="button"
              data-ocid="login.primary_button"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-xs"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login with Internet Identity
                </>
              )}
            </button>
          </motion.div>

          {/* Error state */}
          {isLoginError && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="login.error_state"
              className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2 text-destructive"
            >
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                {loginError?.message ?? "Login failed. Please try again."}
              </p>
            </motion.div>
          )}

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Secure authentication via{" "}
            <span className="text-foreground font-medium">
              Internet Identity
            </span>
            . No password required.
          </p>
        </div>

        {/* Attribution */}
        <p className="text-center text-xs text-muted-foreground mt-5">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
