import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/spec", label: "Spec" },
  { to: "/adopt", label: "Adopt" },
  { to: "/get-involved", label: "Get involved" },
];

export function SiteHeader() {
  const loc = useLocation();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        background: "rgba(250, 250, 248, 0.78)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          paddingInline: 24,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="5" fill="#0f5e5e" />
            <path
              d="M11 10l-4 6 4 6M21 10l4 6-4 6"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.98rem", color: "var(--ink)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            COSTA<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>

        <nav
          className="costa-nav"
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          {navLinks.map((l) => {
            const active = loc.pathname === l.to || loc.pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className="costa-navlink"
                style={{
                  fontSize: "0.9rem",
                  color: active ? "var(--ink)" : "var(--ink-muted)",
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/xlsuite/costa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ padding: "7px 14px", fontSize: "0.85rem" }}
          >
            GitHub
          </a>
        </nav>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .costa-navlink { display: none; }
          .costa-nav { gap: 0.5rem; }
        }
      `}</style>
    </header>
  );
}
