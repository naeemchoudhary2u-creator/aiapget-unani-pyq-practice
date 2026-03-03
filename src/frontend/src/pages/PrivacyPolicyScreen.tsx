import { ArrowLeft, Shield } from "lucide-react";
import type { Screen } from "../App";

interface PrivacyPolicyScreenProps {
  onNavigate: (screen: Screen) => void;
}

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you use the AIAPGET Unani PYQ Practice app, we may collect minimal information necessary to provide our services:",
      "• Quiz scores and session data stored locally in your browser's localStorage.",
      "• Internet Identity principal (if you choose to log in) to associate your data with your account.",
      "• Device type and browser information for optimising the app experience.",
      "We do not collect your name, email, phone number, or any personally identifiable information unless you contact us voluntarily.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Information collected is used solely to:",
      "• Display your quiz history and performance statistics within the app.",
      "• Improve the app based on aggregated, anonymous usage patterns.",
      "• Respond to support requests if you contact us.",
      "We do not sell, trade, or otherwise transfer your information to third parties.",
    ],
  },
  {
    title: "3. Data Storage",
    content: [
      "Quiz scores and preferences are stored locally on your device using browser localStorage. This data is not transmitted to our servers.",
      "If you use Internet Identity (optional login), your principal identifier is stored on the Internet Computer blockchain. We do not store sensitive personal data on-chain.",
      "Clearing your browser data will erase locally stored quiz history.",
    ],
  },
  {
    title: "4. Cookies",
    content: [
      "This app does not use tracking cookies or third-party advertising cookies.",
      "We may use essential browser storage (localStorage/sessionStorage) strictly for app functionality such as saving your quiz session state.",
    ],
  },
  {
    title: "5. Third-Party Services",
    content: [
      "This app is hosted on the Internet Computer (ICP) blockchain infrastructure. Please refer to the DFINITY Foundation's privacy policy for information on blockchain data handling.",
      "We use Caffeine.ai as a development platform. Their privacy policy governs any data they may process.",
      "We do not embed third-party analytics, advertising networks, or social media trackers.",
    ],
  },
  {
    title: "6. Children's Privacy",
    content: [
      "This app is intended for university-level medical students and adults preparing for AIAPGET. It is not directed at children under 13.",
      "We do not knowingly collect information from children under 13 years of age.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "You have the right to:",
      "• Clear your local quiz history at any time by clearing your browser's site data.",
      "• Contact us to request information about any data we may hold.",
      "• Opt out of any optional data collection features within the app settings.",
      "For any privacy-related requests, contact us at support@aiapgetunani.in.",
    ],
  },
  {
    title: "8. Security",
    content: [
      "We take reasonable precautions to protect information. However, no method of transmission over the internet or electronic storage is 100% secure.",
      "The admin password for question management is your responsibility — keep it confidential.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
      "Continued use of the app after changes constitutes your acceptance of the revised policy.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have questions about this Privacy Policy, please contact us at:",
      "Email: support@aiapgetunani.in",
      "Subject line: Privacy Policy – AIAPGET App",
    ],
  },
];

export default function PrivacyPolicyScreen({
  onNavigate,
}: PrivacyPolicyScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="privacy.page"
    >
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-8">
        {/* Back button */}
        <button
          type="button"
          onClick={() => onNavigate({ name: "home" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body group"
          data-ocid="privacy.back_button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <section className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Effective date: March 2026
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            AIAPGET Unani PYQ Practice ("we", "our", "the app") is committed to
            protecting your privacy. This policy explains what information we
            collect, how we use it, and your rights regarding your data.
          </p>
        </section>

        {/* Policy sections */}
        <section className="space-y-5">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3"
            >
              <h2 className="text-sm font-heading font-semibold text-foreground">
                {sec.title}
              </h2>
              <div className="space-y-2">
                {sec.content.map((para) => (
                  <p
                    key={para}
                    className="text-sm text-muted-foreground font-body leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer note */}
        <section className="text-center pb-4">
          <p className="text-xs text-muted-foreground font-body">
            Last updated: March 2026 &nbsp;·&nbsp; AIAPGET Unani PYQ Practice
          </p>
        </section>
      </main>
    </div>
  );
}
