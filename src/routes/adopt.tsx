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

const PAGE_SNIPPET = `<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Northern Lights Dried Flower 3.5 g",
  "brand": { "@type": "Brand", "name": "Northshore" },
  "gtin14": "00628123000105",
  "image": "https://producer.example/img/nl-35-front.jpg",
  "url": "https://producer.example/products/northern-lights-3-5g"
}
</${"script"}>
<link rel="alternate" type="application/costa+json"
      href="https://producer.example/costa/products/3f2a9c1e-7b1d-4c55-9a43-0d6b8f1e2a10">`;

const LOT_SNIPPET = `{
  "@context": "https://gocosta.org/ns/costa-2.0.jsonld",
  "@type": "CostaLot",
  "costaVersion": "2.0",
  "lotId": "https://producer.example/costa/lots/NSC-NL-2610A",
  "product": "https://producer.example/costa/products/3f2a9c1e-7b1d-4c55-9a43-0d6b8f1e2a10",
  "gtin": "00628123000105",
  "lotNumber": "NSC-NL-2610A",
  "packagingDate": "2026-10-14",
  "labelledPotency": {
    "totalThc": { "unit": "mg/g", "value": 231 },
    "totalCbd": { "unit": "mg/g", "value": 0.8 }
  },
  "labReports": [
    { "reportId": "https://lab.example/reports/EAL-26-10412", "scope": "finalForm",
      "sha256": "3f6c76bed796e031b0f1b80216aaf8e30d60aef4bd86f3300c6719004592d760" }
  ],
  "qaRelease": { "releasedDate": "2026-10-20" }
}`;

const faqs = [
  { q: "Do we need to remove our existing data feeds?", a: "No. COSTA is additive. Keep providing whatever formats your existing partners require. Add COSTA on top so any new partner can consume your catalog without a custom integration." },
  { q: "Do we need permission to use the standard?", a: "No. The specification and reference code are published under the MIT license. Use it, fork it, extend it." },
  { q: "What if a field in the spec doesn't apply to our product?", a: "Leave it out. Label statements that don't apply to your product type must be omitted, and the validator tells you which ones are required. Publisher-specific data goes in the extensions object, with keys in the form prefix:name, so it never collides with standard fields." },
  { q: "How often do we need to update?", a: "Whenever the data changes: a new lot, a new certificate of analysis, a new GTIN. Increase the product's recordVersion when it changes, and the feed's sequence number every time the feed changes, so readers know to refresh." },
  { q: "Does this conflict with our provincial reporting?", a: "No. COSTA 2.0 includes profiles that check your data against OCS, BC LDB and SQDC supplier requirements, but it does not replace their intake processes. For example, the OCS still requires suppliers to use GS1 Canada for GTINs, barcodes, product images and ECCnet listing." },
  { q: "What does it cost?", a: "COSTA itself costs nothing: no fees, no API keys, no membership dues. You still need GS1 GTINs, which distributors require, and development time to publish your feed." },
  { q: "Who validates that our data is honest?", a: "COSTA does not audit producers. The reference validator catches inconsistencies, such as a label outside the permitted tolerance of the lab result or a Total THC that doesn't add up, and each lab report carries a fingerprint of the signed PDF so anyone can check that the data and the document match." },
];

function Adopt() {
  return (
    <Layout>
      <PageHead
        eyebrow="For licensed producers"
        title="Publish your catalog once. Be readable everywhere."
        lede="Adopting COSTA means publishing your product, lot and lab data from your own domain and checking it with the free reference validator. There is no API to sign up for and no fees. Here is the path from zero to a live, validated feed."
      />
      <Container>
        <article className="prose [overflow-wrap:anywhere]" style={{ paddingBlock: "56px" }}>
          <h2>What you'll need</h2>
          <ul>
            <li>Your GS1 GTINs for each product and packaging level.</li>
            <li>The values printed on your labels: class of cannabis, net content, and Total THC and Total CBD in the label's units (mg/g for dried cannabis).</li>
            <li>Lot numbers, packaging dates and certificates of analysis for each lot.</li>
            <li>Your Health Canada licence number.</li>
            <li>A developer comfortable with JSON. Node.js is needed to run the reference validator.</li>
          </ul>

          <h2>Adoption in five steps</h2>
          <Steps
            items={[
              <><strong>Give each product a permanent COSTA ID.</strong> An https URL on your domain, such as https://yourdomain.ca/costa/products/{"{uuid}"}. Never reuse it, and don't put the GTIN in it.</>,
              <><strong>Describe the product.</strong> Start from the <a href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" target="_blank" rel="noopener noreferrer">producer guide</a> and the <a href="https://github.com/xlsuite/costa/tree/main/examples" target="_blank" rel="noopener noreferrer">examples</a> in the repository. Record every GTIN with the date it took effect, pick the class and form, and enter potency ranges in label units.</>,
              <><strong>Publish lots and lab reports.</strong> For each lot, publish the lot number, packaging date and the potency printed on its label, and link the final-form certificate of analysis.</>,
              <><strong>Validate.</strong> Run the reference validator: <code>cd tools &amp;&amp; npm ci &amp;&amp; node validate.mjs your-feed.json</code>. Fix every error and review every warning. Declare the provinces you sell into in conformsTo, and the validator checks those requirements too.</>,
              <><strong>Publish and register.</strong> Serve your feed at <code>/.well-known/costa/feed.json</code>, link each product page to its COSTA record, add your feed to registry/publishers.json by pull request, and email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a>.</>,
            ]}
          />

          <h2>A worked example</h2>
          <p>A COSTA record has two parts. On the product page, keep ordinary schema.org markup for search engines and link to the COSTA record:</p>
          <pre className="codeblock"><code>{PAGE_SNIPPET}</code></pre>
          <p>The COSTA record itself lives at that URL, or in your feed. Each lot gets its own record, linked to the product and to its lab report:</p>
          <pre className="codeblock"><code>{LOT_SNIPPET}</code></pre>
          <p>The product record looks like the example on the home page. See the <Link to="/spec">full specification</Link> for every field, including lab reports, GTIN history and provincial profiles.</p>

          <Callout title="Data discipline matters">
            Structured data is a public statement. If your record says Total THC 220 mg/g and your certificate of analysis says 185, you have published 220, in a form every regulator and aggregator can read. The validator compares labels with lab results, but only if you wire your COSTA data to the same source your lab results come from, not to your marketing copy.
          </Callout>

          <h2>FAQ</h2>
          <FAQ items={faqs} />

          <h2>Ready to publish?</h2>
          <p>Email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a> once your feed is live. We will list you in the public adopter directory and notify the marketplaces and aggregators that read COSTA feeds.</p>
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Button href="https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md" external variant="solid">Get the producer guide</Button>
            <Button to="/spec" variant="ghost">Read the full spec</Button>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
