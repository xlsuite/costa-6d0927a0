import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import {
  Hero,
  Button,
  Section,
  Container,
  SectionHeader,
  Card,
  Chip,
} from "../components/site/primitives";

const HOME_JSON = `{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "OG Kush Dried Flower",
  "brand": { "@type": "Brand", "name": "Heritage Cannabis Co." },
  "sku": "HC-OGK-FLOWER-3.5G",
  "offers": {
    "@type": "Offer",
    "price": "12.99",
    "priceCurrency": "CAD",
    "availability": "https://schema.org/InStock"
  },
  "cannabis": {
    "@type": "CannabisProduct",
    "cannabinoidProfile": { "thcPercent": 18.5, "cbdPercent": 0.1 },
    "strain": { "name": "OG Kush", "type": "Hybrid" },
    "terpeneProfile": { "dominant": ["Myrcene", "Limonene", "Caryophyllene"] },
    "productForm": "Dried Flower",
    "packageSize": "3.5g",
    "classOfCannabis": "Cannabis (dried)",
    "healthCanadaLicenseNum": "LC0001234567",
    "testing": {
      "testedForContaminants": true,
      "testResultsUrl": "https://producer.ca/coa/og-kush-batch-0847.pdf"
    }
  }
}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COSTA — An open standard for cannabis product data" },
      { name: "description", content: "COSTA is the Cannabis Open Standards Technology Alliance. We maintain a vendor-neutral schema that lets licensed producers publish product information once — and have it read consistently by every dispensary, marketplace, regulator, and search engine that consumes it." },
      { property: "og:title", content: "COSTA — An open standard for cannabis product data" },
      { property: "og:description", content: "A vendor-neutral schema for cannabis product data on the open web." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gocosta.org" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "1", label: "Source of truth per product" },
  { value: "2", label: "Wire formats: JSON-LD and XML" },
  { value: "30+", label: "Schema fields covering cannabinoids, terpenes, testing, and compliance" },
  { value: "CC BY 4.0", label: "Open licensing for the specification" },
];

function Index() {
  return (
    <Layout>
      <Hero
        eyebrow="v1.0 · Published November 2025"
        title="An open standard for cannabis product data."
        lede="COSTA is the Cannabis Open Standards Technology Alliance. We maintain a vendor-neutral schema that lets licensed producers publish product information once — and have it read consistently by every dispensary, marketplace, regulator, and search engine that consumes it."
        ctas={
          <>
            <Button to="/spec" variant="solid">Read the spec →</Button>
            <Button to="/adopt" variant="ghost">Adopt for your catalog</Button>
          </>
        }
      />

      {/* The problem */}
      <Section>
        <Container wide>
          <SectionHeader
            kicker="The problem"
            title="Every retailer wants your data in a different shape."
            body="Licensed producers maintain the same product catalog in five different formats — one per marketplace, one per provincial board, one for their own website, one for their distributor, one for the GS1 feed. Consumers see inconsistent THC numbers, missing terpene data, and stale availability across the channels they shop on. COSTA fixes the format problem so everyone can fix the data problem."
          />
          <div className="costa-cards-3">
            <Card iconLabel="01 / Standardize" title="One schema, every channel">
              A single JSON-LD and XML representation for cannabinoids, terpenes, strain, packaging, testing, and regulatory data — built on schema.org so search engines understand it natively.
            </Card>
            <Card iconLabel="02 / Decentralize" title="You host your own data">
              No central authority, no API to pay for, no gatekeeper. Embed the JSON-LD on your product pages or publish an XML feed from your own domain. Aggregators come to you.
            </Card>
            <Card iconLabel="03 / Comply" title="Regulatory-aware by design">
              Fields for Health Canada class of cannabis, license number, batch/lot, expiry, COA links, and access requirements are first-class — not bolted on. U.S. state extensions are on the roadmap.
            </Card>
          </div>
        </Container>
      </Section>

      {/* Stat band */}
      <Section alt>
        <Container wide>
          <div className="costa-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: "0.88rem", color: "var(--ink-muted)", marginTop: "0.5rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Built on */}
      <Section>
        <Container wide>
          <SectionHeader
            kicker="Built on"
            title="Standards you already trust."
            body="COSTA extends widely adopted web standards rather than inventing new ones. If your team already publishes schema.org markup or GS1 feeds, you are most of the way there."
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {["schema.org/Product","JSON-LD","XML / XSD","ISO 8601","GS1 GTIN","Health Canada classes","CC BY 4.0"].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Container>
      </Section>

      {/* Example */}
      <Section>
        <Container wide>
          <SectionHeader
            kicker="Example"
            title="What a COSTA product looks like."
            body={<>Below is an abridged JSON-LD block that a producer drops into the <code style={{ fontFamily: "var(--font-mono)", background: "var(--code-bg)", border: "1px solid var(--rule)", padding: "1px 6px", borderRadius: 3, fontSize: "0.88em" }}>&lt;head&gt;</code> of a product page. See the <a href="/spec" style={{ color: "var(--accent)", textDecoration: "underline" }}>full specification</a> for every field.</>}
          />
          <pre className="codeblock"><code>{HOME_JSON}</code></pre>
        </Container>
      </Section>

      {/* Why adopt */}
      <Section>
        <Container wide>
          <SectionHeader kicker="Why adopt" title="Four reasons producers move to COSTA." />
          <div className="costa-cards-4">
            <Card title="Cut catalog work">Maintain one canonical product record. Marketplaces, dispensaries, and aggregators read directly from your site.</Card>
            <Card title="Reach search and AI">JSON-LD on schema.org/Product unlocks rich results in search and gives LLM-powered shopping tools structured data they can rely on.</Card>
            <Card title="Stay compliant without rework">Required fields map cleanly to Health Canada classes, license numbers, batch and lot, COA URLs, and 19+ access requirements.</Card>
            <Card title="Own your data">COSTA is decentralized. There is no platform to lock you in, no fees, no gatekeeper between you and the channels reading your catalog.</Card>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button to="/adopt" variant="solid">See how to adopt →</Button>
          </div>
        </Container>
      </Section>

      {/* Closing band */}
      <Section alt>
        <Container wide>
          <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
            <h2 style={{ fontSize: "1.8rem" }}>Help shape v1.1.</h2>
            <p style={{ color: "var(--ink-muted)", marginTop: "1rem" }}>
              The spec is open. File an issue, propose a field, or fork the repo. We are actively soliciting feedback from licensed producers, marketplaces, and provincial regulators.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Button href="https://github.com/xlsuite/costa" external variant="solid">View on GitHub</Button>
              <Button to="/get-involved" variant="ghost">Get involved</Button>
            </div>
          </div>
        </Container>
      </Section>

      <style>{`
        .costa-cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .costa-cards-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .costa-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        @media (max-width: 900px) {
          .costa-cards-3, .costa-cards-4 { grid-template-columns: 1fr 1fr; }
          .costa-stats { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        @media (max-width: 540px) {
          .costa-cards-3, .costa-cards-4, .costa-stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
}
