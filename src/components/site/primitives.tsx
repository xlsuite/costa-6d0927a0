import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";

export function Container({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <div
      className={className}
      style={{
        maxWidth: wide ? 1100 : 760,
        marginInline: "auto",
        paddingInline: 24,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  alt = false,
  border = true,
  className = "",
}: {
  children: ReactNode;
  alt?: boolean;
  border?: boolean;
  className?: string;
}) {
  return (
    <section
      className={className}
      style={{
        background: alt ? "var(--bg-alt)" : "transparent",
        borderTop: border ? "1px solid var(--rule)" : undefined,
        borderBottom: alt ? "1px solid var(--rule)" : undefined,
        paddingBlock: "clamp(56px, 8vw, 80px)",
      }}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

type ButtonProps = {
  variant?: "solid" | "ghost";
  to?: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button({ variant = "solid", to, href, external, children, ...rest }: ButtonProps) {
  const cls = `btn ${variant === "solid" ? "btn-solid" : "btn-ghost"}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={`chip ${accent ? "chip-accent" : ""}`}>{children}</span>;
}

export function Card({
  iconLabel,
  title,
  children,
}: {
  iconLabel?: string;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="card">
      {iconLabel && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.8rem",
          }}
        >
          {iconLabel}
        </div>
      )}
      {title && (
        <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{title}</h3>
      )}
      <div style={{ color: "var(--ink-muted)", fontSize: "0.95rem" }}>{children}</div>
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="callout">
      <div className="callout-title">{title}</div>
      <div style={{ color: "var(--ink)" }}>{children}</div>
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="steps">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ol>
  );
}

export function FAQ({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div style={{ margin: "1.5em 0" }}>
      {items.map((it, i) => (
        <details key={i} className="faq-item">
          <summary>{it.q}</summary>
          <div className="faq-body">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  lede,
  ctas,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  ctas?: ReactNode;
}) {
  return (
    <Container wide>
      <div style={{ paddingBlock: "clamp(64px, 10vw, 112px)" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3rem)",
            maxWidth: "16ch",
            marginTop: "1.2rem",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "var(--ink-muted)",
            maxWidth: "60ch",
            marginTop: "1.2rem",
            fontSize: "1.075rem",
          }}
        >
          {lede}
        </p>
        {ctas && (
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {ctas}
          </div>
        )}
      </div>
    </Container>
  );
}

export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div style={{ borderBottom: "1px solid var(--rule)", paddingTop: 56, paddingBottom: 56 }}>
      <Container wide>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ fontSize: "2.3rem", marginTop: "1rem", lineHeight: 1.15, maxWidth: "20ch" }}>
          {title}
        </h1>
        {lede && (
          <p style={{ color: "var(--ink-muted)", maxWidth: "60ch", marginTop: "1rem" }}>{lede}</p>
        )}
      </Container>
    </div>
  );
}

export function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: ReactNode;
}) {
  return (
    <div style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2 style={{ fontSize: "1.8rem", marginTop: "0.8rem", lineHeight: 1.2 }}>{title}</h2>
      {body && <p style={{ color: "var(--ink-muted)", marginTop: "1rem", maxWidth: "60ch" }}>{body}</p>}
    </div>
  );
}
