import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Callout } from "../components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — COSTA" },
      { name: "description", content: "COSTA exists to give the cannabis industry a single open standard for product data — independent of any marketplace, dispensary, or regulator." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHead
        eyebrow="About"
        title="Cannabis Open Standards Technology Alliance."
        lede="COSTA exists to give the cannabis industry one open, vendor-neutral way to describe a product — so producers stop maintaining five copies of every catalog and consumers stop seeing five different numbers for the same SKU."
      />
      <Container>
        <article className="prose" style={{ paddingBlock: "56px" }}>
          <h2>What COSTA is</h2>
          <p>
            COSTA is a public-interest alliance that maintains an open specification for cannabis product data. The specification — <Link to="/spec">GoCosta Cannabis Product Schema</Link> — defines a JSON-LD and XML representation for cannabinoid profiles, strain and genetics, terpene data, packaging, regulatory fields, lab testing, and pricing. It is built on <a href="https://schema.org/Product" target="_blank" rel="noopener noreferrer">schema.org/Product</a> and aligned with Health Canada's product classes.
          </p>
          <p>
            The spec is published under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> and the reference code under the MIT license. There is no membership fee, no API, and no central registry. Producers host their own data on their own domains. Aggregators read it.
          </p>

          <h2>Why it exists</h2>
          <p>
            Cannabis product data in Canada and emerging U.S. markets is fragmented by accident, not design. Each provincial wholesale board accepts a different intake spreadsheet. Each retail marketplace defines its own product object. Each dispensary website renders cannabinoid percentages differently. Producers reconcile this manually, every week, across dozens of channels.
          </p>
          <p>
            The cost shows up downstream: stale availability, inconsistent THC and terpene values, missing certificates of analysis, and consumers who can't compare what they're being sold. None of the existing platforms will solve this themselves — their formats are competitive moats. So the answer is the same one the broader web reached for product data twenty years ago: an open, decentralized standard.
          </p>

          <h2>Principles</h2>
          <p>Five commitments shape every decision about the specification:</p>
          <ul>
            <li><strong>Decentralized.</strong> Data lives on the producer's domain. No platform owns the registry.</li>
            <li><strong>Open.</strong> Built on schema.org and other widely adopted web standards. Spec under CC BY 4.0. Code under MIT.</li>
            <li><strong>Consumer-centric.</strong> Cannabinoid, terpene, effect, and testing data are first-class — not afterthoughts.</li>
            <li><strong>Interoperable.</strong> Any dispensary, marketplace, search engine, or AI shopping tool can consume the same payload.</li>
            <li><strong>Regulatory-aware.</strong> Health Canada classes, license numbers, batch and lot, expiry, and 19+ access are part of the core schema, not extensions.</li>
          </ul>

          <h2>Governance</h2>
          <p>
            COSTA is currently stewarded by its founding maintainer with the intent of broadening governance as adopters come on board. The model we are aiming for is closer to the early IETF or W3C than a traditional trade association: written specifications, public issues, open pull requests, and rough consensus.
          </p>
          <p>Concretely, that means:</p>
          <ul>
            <li>Every change to the spec is proposed and reviewed in the open on <a href="https://github.com/xlsuite/costa" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
            <li>Versions are semantic. Backwards-incompatible changes wait for a major release.</li>
            <li>Anyone can file an issue, propose a field, or fork the spec.</li>
            <li>No company controls the standard. The alliance is structurally separate from any marketplace, dispensary, or licensed producer.</li>
          </ul>

          <Callout title="Honest disclosure">
            COSTA was founded in 2025 by Riel Roussopoulos, who also operates a cannabis marketplace. The specification is deliberately published under a permissive open license, with code on GitHub, so that no single operator — including the founder's — can capture the standard. As adopters join, governance will move to a multi-party steering committee.
          </Callout>

          <h2>Scope</h2>
          <p>
            v1.0 of the specification covers the data a licensed producer would publish for an individual SKU sold to adult consumers. Future versions on the roadmap include batch-level traceability, harvest data, consumer reviews as structured data, U.S. state-specific regulatory variants, and medical cannabis certifications. The spec is extensible: producers can add custom fields under their own namespace without breaking interoperability.
          </p>

          <h2>What COSTA is not</h2>
          <ul>
            <li><strong>Not a marketplace.</strong> We do not list products, take orders, or compete with retailers.</li>
            <li><strong>Not a regulator.</strong> We do not certify producers or audit compliance.</li>
            <li><strong>Not a SaaS vendor.</strong> There is nothing to subscribe to.</li>
            <li><strong>Not a replacement for provincial reporting.</strong> Producers still file what their regulator requires.</li>
          </ul>

          <h2>Get involved</h2>
          <p>
            If you operate a licensed producer, marketplace, dispensary technology platform, regulator, or testing lab and have feedback on the schema, we want to hear from you. Open an issue on <a href="https://github.com/xlsuite/costa" target="_blank" rel="noopener noreferrer">GitHub</a>, propose a change via pull request, or email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a>.
          </p>
        </article>
      </Container>
    </Layout>
  );
}
