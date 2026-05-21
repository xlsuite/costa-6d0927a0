import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", marginTop: 0, background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          paddingInline: 24,
          paddingTop: 64,
          paddingBottom: 32,
        }}
      >
        <div className="costa-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
              <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
                <rect width="32" height="32" rx="5" fill="#0f5e5e" />
                <path d="M11 10l-4 6 4 6M21 10l4 6-4 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                COSTA<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </div>
            <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", maxWidth: "32ch" }}>
              An open, vendor-neutral standard for cannabis product data on the web.
            </p>
          </div>

          <div>
            <div className="costa-footer-h">Specification</div>
            <ul className="costa-footer-list">
              <li><Link to="/spec">Schema spec v1.0</Link></li>
              <li><a href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" target="_blank" rel="noopener noreferrer">Producer template</a></li>
              <li><a href="https://github.com/xlsuite/costa" target="_blank" rel="noopener noreferrer">Source on GitHub</a></li>
            </ul>
          </div>

          <div>
            <div className="costa-footer-h">Alliance</div>
            <ul className="costa-footer-list">
              <li><Link to="/about">About & governance</Link></li>
              <li><Link to="/get-involved">Get involved</Link></li>
              <li><a href="mailto:hello@gocosta.org">hello@gocosta.org</a></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--rule)",
            marginTop: 48,
            paddingTop: 24,
            color: "var(--ink-faint)",
            fontSize: "0.82rem",
          }}
        >
          © 2026 Cannabis Open Standards Technology Alliance · Specification licensed under CC BY 4.0 · Code under MIT · github.com/xlsuite/costa
        </div>
      </div>
      <style>{`
        .costa-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 3rem;
        }
        .costa-footer-h {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink);
          margin-bottom: 0.9rem;
        }
        .costa-footer-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .costa-footer-list a { color: var(--ink-muted); text-decoration: none; font-size: 0.9rem; }
        .costa-footer-list a:hover { color: var(--accent); }
        @media (max-width: 720px) {
          .costa-footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
}
