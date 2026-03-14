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
          {/* WhatsApp */}
          <a
            href="https://wa.me/919068404266"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-start gap-4 hover:border-green-500/50 transition-colors group"
            data-ocid="contact.whatsapp_button"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-green-500"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-heading font-semibold text-foreground">
                WhatsApp Support
              </h2>
              <p className="text-sm text-green-600 font-body font-medium group-hover:underline">
                AIAPGET Unani PYQ
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Tap to open WhatsApp and chat with us directly.
              </p>
            </div>
          </a>

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
