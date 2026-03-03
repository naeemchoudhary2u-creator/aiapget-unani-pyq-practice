import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  Info,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { Screen } from "../App";

interface AboutScreenProps {
  onNavigate: (screen: Screen) => void;
}

const features = [
  {
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Browse by Year",
    desc: "Access authentic previous year questions from AIAPGET exams dating back to 2016, organized by year for targeted revision.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Browse by Topic",
    desc: "Explore questions categorised by Unani subjects — Kulliyat, Ilmul Advia, Moalijat, Tashreeh ul Badan, and more.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Practice Quiz with Timer",
    desc: "Take timed quizzes with 60 seconds per question. Auto-skip on timeout keeps your practice realistic.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Admin Question Management",
    desc: "Authorised administrators can add new questions with explanations, categorised by year and topic.",
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Score History",
    desc: "Track your performance across multiple quiz sessions to monitor your progress over time.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Subscription Plans",
    desc: "Unlock unlimited access with monthly or yearly premium plans for serious AIAPGET aspirants.",
  },
];

export default function AboutScreen({ onNavigate }: AboutScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="about.page"
    >
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-8">
        {/* Back button */}
        <button
          type="button"
          onClick={() => onNavigate({ name: "home" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body group"
          data-ocid="about.back_button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <section className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground leading-tight">
              About the App
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              AIAPGET Unani PYQ Practice
            </p>
          </div>
        </section>

        {/* Purpose */}
        <section className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold" />
            What is AIAPGET?
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            The{" "}
            <strong className="text-foreground">
              All India Ayush Post Graduate Entrance Test (AIAPGET)
            </strong>{" "}
            is a national-level entrance examination conducted for admission to
            postgraduate courses in Ayurveda, Unani, Siddha, and Homeopathy
            across India.
          </p>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            This app is specifically designed for aspirants preparing for the{" "}
            <strong className="text-foreground">
              Unani System of Medicine
            </strong>{" "}
            section of AIAPGET. It provides access to carefully curated previous
            year questions (PYQs) to help you practise efficiently and build
            confidence before the exam.
          </p>
        </section>

        {/* Features */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest font-body px-1">
            App Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-xl p-4 space-y-2 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary">{f.icon}</span>
                  <span className="text-sm font-heading font-semibold text-foreground">
                    {f.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Info */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-3">
          <h2 className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Exam Coverage
          </h2>
          <ul className="space-y-2 text-sm font-body text-muted-foreground">
            {[
              "Kulliyat (Fundamentals of Unani Medicine)",
              "Ilmul Advia (Pharmacology)",
              "Moalijat (Medicine / Clinical Practice)",
              "Tashreeh ul Badan (Anatomy)",
              "Ilmul Jarahat (Surgery)",
              "Amraz-e-Niswan wa Ilmul Qabala (Gynaecology & Obstetrics)",
              "Ilmul Atfal (Paediatrics)",
              "Kulliyat-e-Qanoon (Jurisprudence)",
            ].map((subject) => (
              <li key={subject} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                {subject}
              </li>
            ))}
          </ul>
        </section>

        {/* Developer info */}
        <section className="bg-card border border-border rounded-2xl p-5 shadow-xs text-center space-y-2">
          <p className="text-sm font-body text-muted-foreground">
            Developed to support Unani medicine students across India.
          </p>
          <p className="text-xs font-body text-muted-foreground">
            For queries and support, visit the{" "}
            <button
              type="button"
              onClick={() => onNavigate({ name: "contact" })}
              className="text-primary hover:underline font-medium"
            >
              Contact page
            </button>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
