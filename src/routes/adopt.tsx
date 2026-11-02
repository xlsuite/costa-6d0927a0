import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Callout, Steps, FAQ, Button } from "../components/site/primitives";

export const Route = createFileRoute("/adopt")({
  head: () => ({
    meta: [
      { title: "Adopt — COSTA" },
      { name: "description", content: "A five-step guide for licensed cannabis producers to publish their product catalog in COSTA format." },
      { property: "og:title", content: "Adopt — COSTA" },
      { property: "og:description", content: "A five-step guide for licensed cannabis producers to publish their product catalog in COSTA format." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Adopt,
});

const FULL_JSON = `<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "OG Kush Dried Flower",
  "brand": { "@type": "Brand", "name": "Heritage Cannabis Co." },
  "sku": "HC-OGK-FLOWER-3.5G",
  "url": "https://heritagecannabisinc.ca/products/og-kush-35g",
  "image": ["https://heritagecannabisinc.ca/images/og-kush.jpg"],
  "description": "Premium OG Kush dried flower with a citrus and pine profile.",
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
    "expiryDate": "2026-06-15",
    "batchLotNum": "HCC-2025-0847",
    "testing": {
      "testedForContaminants": true,
      "testResultsUrl": "https://heritagecannabisinc.ca/coa/og-kush-batch-0847.pdf"
    },
    "regulatoryDisclosure": {
      "cannabisAccessRequirement": "RecreationalAndMedical",
      "consumptionWarning": "Keep out of reach of children. For use by adults 19+."
    }
  }
}
</${"script"}>`;

const faqs = [
  { q: "Do we need to remove our existing data feeds?", a: "No. COSTA is additive. Keep providing whatever formats your existing partners require. Add COSTA on top so any new partner can consume your catalog without a custom integration." },
  { q: "Do we need permission to use the standard?", a: "No. The spec is published under CC BY 4.0. Use it, fork it, extend it. Attribution is appreciated, not required for commercial use." },
  { q: "What if a field in the spec doesn't apply to our product?", a: `Required fields must be present. Optional fields can be omitted entirely — do not include the key with an empty value. If you need a field that doesn't exist, you can extend the schema under your own namespace (e.g., "myproducer:harvestDate") without breaking interoperability.` },
  { q: "How often do we need to update?", a: "Update whenever the underlying data changes — new batch, new price, stock change, new COA. JSON-LD on a templated product page is updated automatically whenever your product database is. An XML feed should be regenerated at least daily." },
  { q: "Does this conflict with our provincial reporting?", a: "No. Provincial wholesale boards have their own intake formats, and COSTA does not replace them. COSTA covers the consumer-facing product page and the public-web representation of your catalog — not what you file with the OCS, AGLC, or SQDC." },
  { q: "What does it cost?", a: "Nothing. There are no fees, no API keys, no membership dues. You publish on your own domain. Your only cost is the development time to add the JSON-LD or XML to your site." },
  { q: "Who validates that our data is honest?", a: "COSTA does not audit producers. The structured data is public, machine-readable, and easy to cross-reference against the COA URL you embedded. The transparency itself is the enforcement mechanism — regulators, journalists, and aggregators can spot inconsistencies trivially." },
];

function Adopt() {
  return (
    <Layout>
      <PageHead
        eyebrow="For licensed producers"
        title="Publish your catalog once. Be readable everywhere."
        lede="Adopting COSTA takes a developer about a day for a small catalog, and an afternoon per product family thereafter. There is no API to sign up for and no fees. Here is the path from zero to a live, validated feed."
      />
      <Container>
        <article className="prose" style={{ paddingBlock: "56px" }}>
          <h2>What you'll need</h2>
          <ul>
            <li>Access to your product page templates (or your headless CMS).</li>
            <li>Your current product master data — cannabinoid percentages, terpene results, batch and lot numbers, expiry dates, COA URLs.</li>
            <li>Your Health Canada license number.</li>
            <li>Either a developer or a marketing technologist who has shipped schema.org markup before. (If you have a Shopify or WooCommerce site, the dev who installed your SEO plugin can do this.)</li>
          </ul>

          <h2>Adoption in five steps</h2>
          <Steps
            items={[
              <><strong>Pick your delivery format.</strong> Most producers should start with JSON-LD embedded on every product page — it improves SEO and is read by every modern aggregator. If you have a partner who consumes feeds, also publish an XML feed at a stable URL like <code>/feeds/products.xml</code>.</>,
              <><strong>Copy the producer template.</strong> Start from the ready-made <a href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" target="_blank" rel="noopener noreferrer">template in the COSTA repository</a>. It includes JSON-LD blocks for dried flower, pre-rolls, vape cartridges, edibles, and concentrates. Replace the placeholders (<code>YOUR_STRAIN_NAME</code>, <code>THC_PERCENTAGE</code>, etc.) with your real values.</>,
              <><strong>Embed on your product pages.</strong> Place the JSON-LD inside a <code>&lt;script type="application/ld+json"&gt;</code> tag in the <code>&lt;head&gt;</code> of each product page. If you run a templated storefront, populate the fields from your existing product database — do this once in the template, not once per SKU.</>,
              <><strong>Validate before deploying.</strong> Run the JSON-LD through a validator (Google's Rich Results Test or the JSON-LD Playground). Cross-check that THC, CBD, and terpene percentages match your actual lab COA — structured data wrong is worse than structured data missing.</>,
              <><strong>Tell the alliance.</strong> Once your feed is live, email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a> with the URL. We list adopters publicly and notify aggregators that a new producer feed is available.</>,
            ]}
          />

          <h2>A minimal worked example</h2>
          <p>Here is what a single dried flower product looks like in JSON-LD, with every required field populated. Drop this into your product page's <code>&lt;head&gt;</code>:</p>
          <pre className="codeblock"><code>{FULL_JSON}</code></pre>
          <p>See the <Link to="/spec">full specification</Link> for every field, including the XML representation and optional fields like detailed terpene breakdowns and aggregate ratings.</p>

          <Callout title="Data discipline matters">
            Structured data is a contract. If your JSON-LD says <code>thcPercent: 22</code> and your COA says 18.5, you have signed a public contract that says 22 — and you've made it machine-readable for every regulator and aggregator. Wire your COSTA payload directly to the same source of truth your lab results live in, not to your marketing copy.
          </Callout>

          <h2>FAQ</h2>
          <FAQ items={faqs} />

          <h2>Ready to publish?</h2>
          <p>Email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a> once your feed is live. We will list you in the public adopter directory and notify the marketplaces and aggregators that read COSTA feeds.</p>
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Button href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" external variant="solid">Get the producer template</Button>
            <Button to="/spec" variant="ghost">Read the full spec</Button>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
