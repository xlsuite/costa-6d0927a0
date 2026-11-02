import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Callout, Chip } from "../components/site/primitives";
import { parseSpecMetadata } from "../lib/spec-metadata";

export const Route = createFileRoute("/spec")({
  head: () => ({
    meta: [
      { title: "COSTA 2.0 Specification — COSTA" },
      { name: "description", content: "The COSTA 2.0 open cannabis product data standard: product, lot and lab report data, GTIN history and provincial profiles, in JSON, JSON-LD and XML." },
      { property: "og:title", content: "COSTA 2.0 Specification — COSTA" },
      { property: "og:description", content: "The COSTA 2.0 open cannabis product data standard: product, lot and lab report data, GTIN history and provincial profiles, in JSON, JSON-LD and XML." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Spec,
});

const SPEC_URL = "https://raw.githubusercontent.com/xlsuite/costa/main/gocosta-schema-spec.md";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Heading = { level: 2 | 3; text: string; id: string };

function Spec() {
  const [md, setMd] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const metadata = useMemo(() => parseSpecMetadata(md), [md]);

  useEffect(() => {
    if (!metadata?.title) return;
    const previousTitle = document.title;
    document.title = `${metadata.title} — COSTA`;
    return () => { document.title = previousTitle; };
  }, [metadata]);

  useEffect(() => {
    let cancelled = false;
    fetch(SPEC_URL, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((t) => { if (!cancelled) setMd(t); })
      .catch((e) => { if (!cancelled) setErr(e.message || String(e)); });
    return () => { cancelled = true; };
  }, []);

  const headings: Heading[] = useMemo(() => {
    if (!md) return [];
    const lines = md.split("\n");
    const out: Heading[] = [];
    let inCode = false;
    for (const line of lines) {
      if (/^```/.test(line)) { inCode = !inCode; continue; }
      if (inCode) continue;
      const m = line.match(/^(##|###)\s+(.+?)\s*$/);
      if (m) {
        const level = m[1].length === 2 ? 2 : 3;
        const text = m[2].replace(/`/g, "");
        out.push({ level: level as 2 | 3, text, id: slugify(text) });
      }
    }
    return out;
  }, [md]);

  return (
    <Layout>
      <PageHead
        eyebrow="Specification"
        title={metadata?.title ?? "COSTA 2.0: Open Cannabis Product Data Standard"}
        lede="The full technical specification for cannabis product, lot and lab report data — in JSON, JSON-LD and XML."
      />

      <div style={{ borderBottom: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: 1100, marginInline: "auto", paddingInline: 24, paddingBlock: 20, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {metadata ? metadata.chips.map(({ key, value }) => (
            <Chip key={key} accent={key === "Version"}>{value}</Chip>
          )) : <>
            <Chip accent>v2.0</Chip>
            <Chip>Draft for public comment</Chip>
            <Chip>MIT</Chip>
          </>}
          <a href="https://github.com/xlsuite/costa/blob/main/gocosta-schema-spec.md" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Chip>Source on GitHub →</Chip>
          </a>
          <a href="/schemas/costa-2.0.schema.json" download="costa-2.0.schema.json" style={{ textDecoration: "none" }}>
            <Chip>Download COSTA 2.0 JSON Schema ↓</Chip>
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, marginInline: "auto", paddingInline: 24, paddingBlock: 56 }}>
        <div className="spec-layout">
          <aside className="spec-toc">
            <div className="spec-toc-sticky">
              <details className="spec-toc-collapse" open>
                <summary>On this page</summary>
                <nav>
                  <ul>
                    {headings.map((h) => (
                      <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : 0 }}>
                        <a href={`#${h.id}`} style={{ fontSize: h.level === 3 ? "0.82rem" : "0.88rem" }}>{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>

              <div style={{ marginTop: "1.5rem" }}>
                <div className="eyebrow" style={{ marginBottom: "0.6rem" }}>Related</div>
                <ul className="spec-related">
                  <li><a href="/adopt">How to adopt →</a></li>
                  <li><a href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" target="_blank" rel="noopener noreferrer">Producer guide</a></li>
                  <li><a href="https://github.com/xlsuite/costa/tree/main/tools" target="_blank" rel="noopener noreferrer">Validator and examples</a></li>
                  <li><a href="https://github.com/xlsuite/costa" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
                </ul>
              </div>
            </div>
          </aside>

          <Container>
            <div className="docs" style={{ maxWidth: 740 }}>
              {!md && !err && <p style={{ color: "var(--ink-muted)" }}>Loading specification…</p>}
              {err && (
                <Callout title="Failed to load">
                  {err}. View the source directly on <a href="https://github.com/xlsuite/costa/blob/main/gocosta-schema-spec.md" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </Callout>
              )}
              {md && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => {
                      const text = childrenToText(children);
                      return <h1 id={slugify(text)}>{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const text = childrenToText(children);
                      return <h2 id={slugify(text)}>{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = childrenToText(children);
                      return <h3 id={slugify(text)}>{children}</h3>;
                    },
                  }}
                >
                  {md}
                </ReactMarkdown>
              )}
            </div>
          </Container>
        </div>
      </div>

      <style>{`
        .spec-layout { display: grid; grid-template-columns: 240px 1fr; gap: 2.5rem; align-items: start; }
        .spec-toc-sticky { position: sticky; top: 80px; }
        .spec-toc-collapse summary { list-style: none; cursor: pointer; font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin-bottom: 0.8rem; }
        .spec-toc-collapse summary::-webkit-details-marker { display: none; }
        .spec-toc nav ul, .spec-related { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
        .spec-toc nav a, .spec-related a { color: var(--ink-muted); text-decoration: none; font-size: 0.88rem; line-height: 1.35; display: block; padding: 2px 0; }
        .spec-toc nav a:hover, .spec-related a:hover { color: var(--accent); }
        @media (max-width: 900px) {
          .spec-layout { grid-template-columns: 1fr; }
          .spec-toc-sticky { position: static; padding-bottom: 1.5rem; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </Layout>
  );
}

function childrenToText(children: unknown): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return childrenToText((children as { props?: { children?: unknown } }).props?.children);
  }
  return "";
}
