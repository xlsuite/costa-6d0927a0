import { createFileRoute, Link } from "@tanstack/react-router";
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
  "@context": "https://gocosta.org/ns/costa-2.0.jsonld",
  "@type": "CostaProduct",
  "costaVersion": "2.0",
  "costaId": "https://producer.example/costa/products/3f2a9c1e-7b1d-4c55-9a43-0d6b8f1e2a10",
  "recordVersion": 4,
  "recordUpdated": "2026-10-28T14:05:00Z",
  "status": "active",
  "conformsTo": ["ca-federal/2.0"],
  "identifiers": {
    "gtins": [
      { "gtin": "00628123000105", "packagingLevel": "consumerUnit",
        "validFrom": "2026-03-01", "validThrough": null, "status": "active" }
    ]
  },
  "name": { "en": "Northern Lights Dried Flower 3.5 g", "fr": "Northern Lights fleurs séchées 3,5 g" },
  "brand": { "name": "Northshore" },
  "licenceHolder": { "legalName": "Northshore Cannabis Co. Ltd.", "role": "processor",
                     "phone": "+1 613 555 0100", "email": "info@producer.example" },
  "classOfCannabis": "dried cannabis",
  "productForm": "driedFlower",
  "discreteUnits": false,
  "netContent": { "value": 3.5, "unit": "g" },
  "potency": {
    "totalThc": { "unit": "mg/g", "min": 200, "max": 260 },
    "totalCbd": { "unit": "mg/g", "min": 0, "max": 2 }
  },
  "terpenes": { "dominant": ["beta-Myrcene", "beta-Caryophyllene", "Limonene"] },
  "strain": { "name": "Northern Lights", "plantType": "indicaDominant" }
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
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "1", label: "Source of truth per product" },
  { value: "2", label: "Wire formats: JSON-LD and XML, generated from one schema" },
  { value: "30+", label: "Schema fields covering cannabinoids, terpenes, testing, and compliance" },
  { value: "MIT", label: "Open license for the specification and reference code" },
];

function Index() {
  return (
    <Layout>
      <Hero
        eyebrow="v2.0 · Published November 2, 2026"
        title="An open standard for cannabis product data."
        lede="COSTA is the Cannabis Open Standards Technology Alliance. We maintain a vendor-neutral schema that lets licensed producers publish product information once — and have it read consistently by every dispensary, marketplace, regulator, and search engine that consumes it."
        ctas={
          <>
            <Button to="/spec" variant="solid">Read the spec →</Button>
            <Button to="/adopt" variant="ghost">Adopt for your catalog</Button>
          </>
        }
      />

      <section style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--rule)", paddingBlock: 20 }}>
        <Container wide>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.8rem" }}>
            <span>New · COSTA 2.0 draft: lab reports, GTIN history and provincial profiles</span>
            <Link to="/news/$slug" params={{ slug: "costa-2-0" }}>Read the announcement →</Link>
          </div>
        </Container>
      </section>

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
              One schema for product, lot and lab report data, in JSON-LD and XML. Product pages keep using schema.org/Product, so search engines understand them natively.
            </Card>
            <Card iconLabel="02 / Decentralize" title="You host your own data">
              No central authority, no API to pay for, no gatekeeper. Publish a feed at /.well-known/costa/feed.json on your own domain and link it from your product pages. Aggregators come to you.
            </Card>
            <Card iconLabel="03 / Comply" title="Regulatory-aware by design">
              Health Canada classes of cannabis, label-basis potency, lot data, structured lab reports and provincial supplier profiles are first-class, not bolted on. A free reference validator checks them.
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
            body="COSTA extends widely adopted web standards rather than inventing new ones. If your team already publishes schema.org markup or GS1 GTINs, you are most of the way there."
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {["schema.org/Product","JSON-LD","JSON Schema","XML / XSD","ISO 8601","GS1 GTIN","Health Canada classes","MIT"].map((c) => (
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
            body={<>Below is a minimal COSTA 2.0 product record for a fictional producer. It passes the reference validator for the federal profile. See the <Link to="/spec">full specification</Link> for every field, plus lot and lab report records.</>}
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
            <Card title="Stay compliant without rework">The validator checks your data against Health Canada label rules, THC limits and lab results, and against OCS, BC LDB and SQDC supplier requirements, before anyone else sees it.</Card>
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
            <h2 style={{ fontSize: "1.8rem" }}>Help shape 2.0.</h2>
            <p style={{ color: "var(--ink-muted)", marginTop: "1rem" }}>
              COSTA 2.0 is a draft for public comment. File an issue, propose a change, or fork the repo. We are actively seeking feedback from licensed producers, labs, marketplaces and provincial distributors.
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
