import type { Screen } from "../App";

interface FooterProps {
  onNavigate: (screen: Screen) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-card py-4 px-4"
      data-ocid="footer.section"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Copyright */}
        <p className="text-xs text-muted-foreground font-body text-center sm:text-left">
          © {currentYear} AIAPGET Unani PYQ Practice. All rights reserved.
        </p>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => onNavigate({ name: "about" })}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-body px-2 py-1 rounded hover:bg-primary/5"
            data-ocid="footer.about_link"
          >
            About
          </button>
          <span className="text-muted-foreground/40 text-xs select-none">
            |
          </span>
          <button
            type="button"
            onClick={() => onNavigate({ name: "contact" })}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-body px-2 py-1 rounded hover:bg-primary/5"
            data-ocid="footer.contact_link"
          >
            Contact
          </button>
          <span className="text-muted-foreground/40 text-xs select-none">
            |
          </span>
          <button
            type="button"
            onClick={() => onNavigate({ name: "privacy" })}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-body px-2 py-1 rounded hover:bg-primary/5"
            data-ocid="footer.privacy_link"
          >
            Privacy Policy
          </button>
        </nav>

        {/* Caffeine attribution */}
        <p className="text-xs text-muted-foreground font-body text-center sm:text-right">
          Built with{" "}
          <span className="text-destructive" aria-label="love">
            ♥
          </span>{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
