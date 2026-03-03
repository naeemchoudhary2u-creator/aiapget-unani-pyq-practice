import {
  BookOpen,
  ChevronRight,
  Clock,
  CreditCard,
  List,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { Screen } from "../App";
import { TOPICS, questions as staticQuestions } from "../data/questions";
import { useAllQuestions } from "../hooks/useAdminQueries";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { data: allQuestions = staticQuestions } = useAllQuestions();

  // Compute unique topics from merged question set
  const allTopics = Array.from(new Set(allQuestions.map((q) => q.topic)));

  const startRandomQuiz = (count = 20) => {
    const shuffled = shuffleArray(allQuestions).slice(0, count);
    onNavigate({ name: "quiz", questions: shuffled });
  };

  const navCards = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Start Practice Quiz",
      desc: "20 random questions from all topics",
      action: () => startRandomQuiz(20),
    },
    {
      icon: <List className="w-6 h-6" />,
      title: "Browse by Topic",
      desc: `${allTopics.length} Unani subject categories`,
      action: () => onNavigate({ name: "topics" }),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Browse by Year",
      desc: "Filter questions by exam year",
      action: () => onNavigate({ name: "topics" }),
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Score History",
      desc: "View your past quiz attempts",
      action: () => onNavigate({ name: "history" }),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Subscription Plans",
      desc: "Monthly & yearly premium access",
      action: () => onNavigate({ name: "subscription" }),
      isSubscription: true,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Admin Panel",
      desc: "Add and manage questions",
      action: () => onNavigate({ name: "admin" }),
      isAdmin: true,
    },
  ];

  return (
    <div className="flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Hero Banner */}
        <section className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Unani Medicine"
            className="w-full h-40 sm:h-52 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-end p-5">
            <h2 className="text-primary-foreground font-heading text-xl sm:text-2xl font-bold drop-shadow">
              Master Unani Medicine
            </h2>
            <p className="text-primary-foreground/90 text-sm mt-1 font-body max-w-xs">
              Practice with {allQuestions.length}+ authentic AIAPGET previous
              year questions
            </p>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-3">
          {[
            { label: "Questions", value: allQuestions.length },
            { label: "Topics", value: allTopics.length },
            { label: "Years", value: "2016–2026" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-3 text-center shadow-xs"
            >
              <div className="text-xl font-bold text-gold font-heading">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Navigation Cards */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest font-body px-1">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navCards.map((card) => (
              <button
                type="button"
                key={card.title}
                onClick={card.action}
                className={`group bg-card border rounded-xl p-4 flex items-center gap-4 text-left hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                  card.isAdmin
                    ? "border-gold/40 hover:border-gold"
                    : card.isSubscription
                      ? "border-gold/60 hover:border-gold bg-gradient-to-r from-card to-gold/5"
                      : "border-border hover:border-gold"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    card.isAdmin
                      ? "bg-gold/15 text-gold group-hover:bg-gold/25"
                      : card.isSubscription
                        ? "bg-gold/20 text-gold group-hover:bg-gold/30"
                        : "bg-primary/10 text-primary group-hover:bg-gold/20 group-hover:text-gold"
                  }`}
                >
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground font-heading text-sm flex items-center gap-2">
                    {card.title}
                    {card.isAdmin && (
                      <span className="text-[10px] font-body font-normal bg-gold/15 text-gold px-1.5 py-0.5 rounded-full border border-gold/30">
                        Admin
                      </span>
                    )}
                    {card.isSubscription && (
                      <span className="text-[10px] font-body font-normal bg-gold/20 text-gold px-1.5 py-0.5 rounded-full border border-gold/40">
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground font-body mt-0.5">
                    {card.desc}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-card border border-border rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-gold" />
            <h3 className="font-heading font-semibold text-foreground">
              About AIAPGET
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            The All India Ayush Post Graduate Entrance Test (AIAPGET) is a
            national-level entrance examination for admission to postgraduate
            courses in Ayurveda, Unani, Siddha, and Homeopathy. This app focuses
            on the{" "}
            <strong className="text-foreground">
              Unani System of Medicine
            </strong>
            , covering subjects like Kulliyat, Ilmul Advia, Moalijat, Tashreeh,
            and more.
          </p>
        </section>
      </main>
    </div>
  );
}
