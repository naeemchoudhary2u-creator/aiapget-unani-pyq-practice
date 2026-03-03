import {
  Clock,
  CreditCard,
  Home,
  List,
  MoreVertical,
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
}

const menuItems: {
  icon: React.ReactNode;
  label: string;
  screen: Screen;
  badge?: string;
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
];

export default function AppHeader({
  onNavigate,
  currentScreen,
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* 3-dot kebab menu — top-left */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
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
              {/* Drawer header */}
              <div className="bg-primary/10 px-4 py-3 border-b border-border">
                <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">
                  Navigation
                </p>
              </div>

              <nav className="py-1">
                {menuItems.map((item) => {
                  const isActive = currentScreen === item.screen.name;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => handleNavigate(item.screen)}
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
          src="/assets/generated/app-logo.dim_128x128.png"
          alt="AIAPGET Logo"
          className="w-9 h-9 rounded-full border-2 border-gold object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-heading font-bold tracking-wide leading-tight truncate">
            AIAPGET Unani PYQ
          </h1>
          <p className="text-[11px] opacity-75 font-body">
            Previous Year Questions Practice
          </p>
        </div>
      </div>
    </header>
  );
}
