import { ArrowLeft, Clock, Mail, MessageSquare, Phone } from "lucide-react";
import type { Screen } from "../App";

interface ContactScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function ContactScreen({ onNavigate }: ContactScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="contact.page"
    >
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-8">
        {/* Back button */}
        <button
          type="button"
          onClick={() => onNavigate({ name: "home" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body group"
          data-ocid="contact.back_button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <section className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground leading-tight">
              Contact Us
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              We're here to help
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="space-y-3">
          {/* Email */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-heading font-semibold text-foreground">
                Email Support
              </h2>
              <a
                href="mailto:support@aiapgetunani.in"
                className="text-sm text-primary hover:underline font-body"
              >
                support@aiapgetunani.in
              </a>
              <p className="text-xs text-muted-foreground font-body">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-heading font-semibold text-foreground">
                Support Hours
              </h2>
              <p className="text-sm text-muted-foreground font-body">
                Monday – Saturday: 9:00 AM – 6:00 PM IST
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Closed on Sundays and national holidays.
              </p>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-heading font-semibold text-foreground">
                Feedback &amp; Suggestions
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Found an error in a question? Have a suggestion for improvement?
                We'd love to hear from you — email us with the subject line{" "}
                <em>"Feedback – AIAPGET App"</em>.
              </p>
            </div>
          </div>
        </section>

        {/* Additional info */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-heading font-semibold text-foreground">
            Reporting Incorrect Questions
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            If you believe a question or its answer is incorrect, please email
            us with:
          </p>
          <ul className="space-y-1.5 text-sm font-body text-muted-foreground">
            {[
              "The question text",
              "The year and topic it appears under",
              "Your suggested correction with a reference source",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Privacy note */}
        <section className="text-center">
          <p className="text-xs text-muted-foreground font-body">
            By contacting us you agree to our{" "}
            <button
              type="button"
              onClick={() => onNavigate({ name: "privacy" })}
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </button>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
