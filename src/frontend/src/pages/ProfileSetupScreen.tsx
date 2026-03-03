import { Loader2, User } from "lucide-react";
import { useState } from "react";

interface ProfileSetupScreenProps {
  onProfileComplete: () => void;
}

export default function ProfileSetupScreen({
  onProfileComplete,
}: ProfileSetupScreenProps) {
  const [name, setName] = useState(() => {
    try {
      const session = localStorage.getItem("aiapget_user_session");
      if (session) {
        const s = JSON.parse(session);
        // Pre-fill with session name if it's not a generated one
        if (s.name && !s.name.startsWith("User ")) return s.name;
      }
    } catch {}
    return "";
  });
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    const ageNum = Number.parseInt(age, 10);
    if (!age || Number.isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      setError("Please enter a valid age (10–100).");
      return;
    }
    if (!gender) {
      setError("Please select your gender.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const profile = {
        name: name.trim(),
        age,
        gender,
        profileCompleted: true,
      };
      localStorage.setItem("aiapget_user_profile", JSON.stringify(profile));

      // Also update the name in session
      try {
        const sessionRaw = localStorage.getItem("aiapget_user_session");
        if (sessionRaw) {
          const session = JSON.parse(sessionRaw);
          session.name = name.trim();
          localStorage.setItem("aiapget_user_session", JSON.stringify(session));
        }
      } catch {}

      setIsLoading(false);
      onProfileComplete();
    }, 400);
  };

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

      <div className="relative w-full max-w-sm space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-heading font-bold text-foreground">
            Complete Your Profile
          </h1>
          <p className="text-sm text-muted-foreground font-body">
            Just a few details to personalise your experience
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="profile-name"
                type="text"
                data-ocid="profile.name.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground font-body"
                placeholder="Enter your full name"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="profile-age"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Age <span className="text-destructive">*</span>
              </label>
              <input
                id="profile-age"
                type="number"
                data-ocid="profile.age.input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={10}
                max={100}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground font-body"
                placeholder="Your age (10–100)"
              />
            </div>

            {/* Gender */}
            <div>
              <p className="block text-sm font-medium text-foreground mb-2">
                Gender <span className="text-destructive">*</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    data-ocid={`profile.gender.${g.toLowerCase()}.button`}
                    onClick={() => setGender(g)}
                    className={`py-2.5 rounded-xl text-sm font-body font-medium border-2 transition-all duration-150 ${
                      gender === g
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p
                className="text-xs text-destructive font-body"
                data-ocid="profile.error_state"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              data-ocid="profile.submit_button"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 font-body mt-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isLoading ? "Saving..." : "Continue"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground font-body">
          Your profile information is stored securely on your device.
        </p>
      </div>
    </div>
  );
}
