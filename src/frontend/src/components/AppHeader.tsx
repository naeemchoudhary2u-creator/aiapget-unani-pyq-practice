import {
  Clock,
  CreditCard,
  Home,
  Info,
  List,
  LogOut,
  MessageSquare,
  MoreVertical,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Screen } from "../App";

interface AppHeaderProps {
  onNavigate: (screen: Screen) => void;
  currentScreen: string;
  onLogout?: () => void;
}

const menuItems: {
  icon: React.ReactNode;
  label: string;
  screen: Screen;
  badge?: string;
  ocid?: string;
}[] = [
  {
    icon: <Home className="w-4 h-4" />,
    label: "Home",
    screen: { name: "home" },
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    label: "Practice Quiz",
    screen: { name: "quiz", questions: [] },
  },
  {
    icon: <List className="w-4 h-4" />,
    label: "Browse by Topic",
    screen: { name: "topics" },
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "Browse by Year",
    screen: { name: "topics" },
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    label: "Score History",
    screen: { name: "history" },
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: "Subscription Plans",
    screen: { name: "subscription" },
    badge: "New",
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    label: "Admin Panel",
    screen: { name: "admin" },
    badge: "Admin",
  },
  {
    icon: <Info className="w-4 h-4" />,
    label: "About",
    screen: { name: "about" },
    ocid: "nav.about_link",
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    label: "Contact",
    screen: { name: "contact" },
    ocid: "nav.contact_link",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    label: "Privacy Policy",
    screen: { name: "privacy" },
    ocid: "nav.privacy_link",
  },
];

export default function AppHeader({
  onNavigate,
  currentScreen,
  onLogout,
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get user info from localStorage session
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aiapget_user_session");
      if (raw) {
        const session = JSON.parse(raw);
        if (session.name) {
          setUserName(session.name);
          setUserInitial(session.name.charAt(0).toUpperCase());
        }
      }
    } catch {}
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleNavigate = (screen: Screen) => {
    // Don't navigate to quiz with empty questions from menu
    if (screen.name === "quiz") {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(false);
    onNavigate(screen);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem("aiapget_user_session");
    if (onLogout) onLogout();
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* 3-dot kebab menu — top-left */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            data-ocid="nav.menu.button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open navigation menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MoreVertical className="w-5 h-5" />
            )}
          </button>

          {/* Dropdown drawer */}
          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-150">
              {/* Drawer header — show user if logged in */}
              {userName ? (
                <div className="bg-primary/10 px-4 py-3 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                    {userInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {userName}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body uppercase tracking-widest">
                      Signed In
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-primary/10 px-4 py-3 border-b border-border">
                  <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">
                    Navigation
                  </p>
                </div>
              )}

              <nav className="py-1">
                {menuItems.map((item) => {
                  const isActive = currentScreen === item.screen.name;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => handleNavigate(item.screen)}
                      data-ocid={item.ocid}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gold/10 focus:outline-none focus:bg-gold/10 ${
                        isActive ? "bg-gold/15 text-gold" : "text-foreground"
                      }`}
                    >
                      <span className={isActive ? "text-gold" : "text-primary"}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-sm font-body font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-body font-semibold px-1.5 py-0.5 rounded-full border ${
                            item.badge === "New"
                              ? "bg-gold/20 text-gold border-gold/40"
                              : "bg-primary/10 text-primary border-primary/30"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Logout button */}
              {onLogout && (
                <div className="border-t border-border py-1">
                  <button
                    type="button"
                    data-ocid="nav.logout.button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-body font-medium">
                      Logout
                    </span>
                  </button>
                </div>
              )}

              <div className="border-t border-border px-4 py-2">
                <p className="text-[10px] text-muted-foreground font-body text-center">
                  AIAPGET Unani PYQ Practice
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Logo + Title */}
        <img
          src="/assets/generated/app-logo-transparent.dim_128x128.png"
          alt="AIAPGET Logo"
          className="w-10 h-10 rounded-full border-2 border-gold object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/generated/app-logo.dim_128x128.png";
          }}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-heading font-bold tracking-wide leading-tight truncate">
            AIAPGET Unani PYQ
          </h1>
          <p className="text-[11px] opacity-75 font-body">
            Previous Year Questions Practice
          </p>
        </div>

        {/* User avatar (right side) */}
        {userInitial && (
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0 hover:bg-white/30 transition-colors"
            aria-label={`User: ${userName}`}
          >
            {userInitial}
          </button>
        )}
      </div>
    </header>
  );
}
