# COSTA

CSS-in-JS. No state management library.
Sticky top header with backdrop blur. Mobile-responsive (collapse nav links to a hamburger or hide on narrow viewports, leaving only the GitHub button).

Design system — be exact
Palette (use as Tailwind theme extensions or arbitrary values; do not substitute):

--bg background: #fafaf8 (warm off-white)
--bg-alt subtle band background: #f2f2ee
--surface cards: #ffffff
--ink text: #0c0c0c
--ink-muted: #555555
--ink-faint: #888888
--rule borders: #e2e2dc
--rule-strong: #c8c8c0
--accent (single accent — deep teal, deliberately not green): #0f5e5e
--accent-hover: #0a4646
--accent-tint for callouts: #e6f0ef
--code-bg: #f4f4ef

Type:

Body sans: system font stack — -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif. Base size 16.5px, line-height 1.55.
Mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace — used for code, identifiers, eyebrow labels, and the wordmark.
Headings semibold, tracking tight (-0.01em to -0.03em). Hero h1 is 3rem on desktop, ~2.2rem on mobile. Page-head h1 is 2.3rem.
"Eyebrow" labels above headings: monospace, 0.78rem, uppercase, letter-spacing 0.08em, accent color.

Layout:

Max content width 1100px for wide sections. Prose pages constrained to ~760px.
24px horizontal padding on container.
56–80px vertical padding on sections.
Borders between sections are 1px solid --rule.
No drop shadows. No gradients. No glassmorphism. No animation on hover beyond color transitions.
Buttons: rounded 4px (NOT pill-shaped), 11px×18px padding, 0.95rem font size. Two variants: solid accent (white text on teal) and ghost (transparent with --rule-strong border, ink text).
Cards: 1px border --rule, 4px radius, 22px padding, white background. NO shadows.
Chips: monospace, 0.82rem, pill-shaped (border-radius 999px), 1px border --rule-strong, muted text.

Components to build:

<SiteHeader /> — sticky top, backdrop-blur, 1px bottom border. Left: brand mark (an SVG of a square with chevrons [>< ] in accent color, beside the wordmark COSTA. where the period is accent-colored, both in mono). Right: nav links (About, Spec, Adopt, Get involved) plus a "GitHub" outlined button. Highlight active link with darker ink and slight font-weight bump. On mobile, hide the text links and keep only the GitHub button.
<SiteFooter /> — 3 columns + a legal line. Columns: (1) COSTA tagline blurb, (2) Specification links (Schema spec v1.0 / Producer template / Source on GitHub), (3) Alliance links (About & governance / Get involved / hello@gocosta.org). Legal line spans full width with a top border: © 2026 Cannabis Open Standards Technology Alliance · Specification licensed under CC BY 4.0 · Code under MIT · github.com/xlsuite/costa.
 — used on the home page only. Eyebrow + big h1 (max-width 16ch) + lede paragraph (max-width 60ch, muted) + CTA row.
 — used on every non-home page. Smaller version of Hero with a 56px top padding and a bottom border.
 — bordered white card with an optional mono "icon label" (e.g., 01 / Standardize) at top in accent color.
 — an ordered list rendered with CSS counters showing 01, 02, etc. in monospace accent color to the left of each item.
 — bordered box with a 3px left border in accent, accent-tint background, small mono uppercase title.
 — uses native / for accordion behavior. Each item has top/bottom border. + / − indicator on the right.

Routes & navigation
/              → Home
/about         → About / governance
/spec          → Specification (renders markdown)
/adopt         → Adoption guide for LPs
/get-involved  → Contribute / contact
All pages share  and . No 404 page needed beyond the default.

Page content — use this copy verbatim
Home (/)
Hero

Eyebrow: v1.0 · Published November 2025
H1: An open standard for cannabis product data.
Lede: COSTA is the Cannabis Open Standards Technology Alliance. We maintain a vendor-neutral schema that lets licensed producers publish product information once — and have it read consistently by every dispensary, marketplace, regulator, and search engine that consumes it.
CTAs: solid Read the spec → /spec, ghost Adopt for your catalog → /adopt.

Section: The problem

Kicker: The problem
H2: Every retailer wants your data in a different shape.
Body (muted, max-width 60ch): Licensed producers maintain the same product catalog in five different formats — one per marketplace, one per provincial board, one for their own website, one for their distributor, one for the GS1 feed. Consumers see inconsistent THC numbers, missing terpene data, and stale availability across the channels they shop on. COSTA fixes the format problem so everyone can fix the data problem.

Then a 3-column card grid:

Icon label 01 / Standardize · H3 One schema, every channel · body A single JSON-LD and XML representation for cannabinoids, terpenes, strain, packaging, testing, and regulatory data — built on schema.org so search engines understand it natively.
Icon label 02 / Decentralize · H3 You host your own data · body No central authority, no API to pay for, no gatekeeper. Embed the JSON-LD on your product pages or publish an XML feed from your own domain. Aggregators come to you.
Icon label 03 / Comply · H3 Regulatory-aware by design · body Fields for Health Canada class of cannabis, license number, batch/lot, expiry, COA links, and access requirements are first-class — not bolted on. U.S. state extensions are on the roadmap.

Stat band (gray --bg-alt background with top and bottom borders, 4-column grid):

1 — Source of truth per product
2 — Wire formats: JSON-LD and XML
30+ — Schema fields covering cannabinoids, terpenes, testing, and compliance
CC BY 4.0 — Open licensing for the specification

(Stat values are monospace 2rem, labels are 0.88rem muted.)
Section: Built on

Kicker: Built on
H2: Standards you already trust.
Body: COSTA extends widely adopted web standards rather than inventing new ones. If your team already publishes schema.org markup or GS1 feeds, you are most of the way there.
Chip row: schema.org/Product, JSON-LD, XML / XSD, ISO 8601, GS1 GTIN, Health Canada classes, CC BY 4.0.

Section: Example

Kicker: Example
H2: What a COSTA product looks like.
Body: Below is an abridged JSON-LD block that a producer drops into the  of a product page. See the full specification for every field. (Link "full specification" to /spec.)
Then a 

 block containing this exact JSON (preserve all whitespace and key order):

json{
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
}
Section: Why adopt (4-card grid, no icon labels)

Cut catalog work — Maintain one canonical product record. Marketplaces, dispensaries, and aggregators read directly from your site.
Reach search and AI — JSON-LD on schema.org/Product unlocks rich results in search and gives LLM-powered shopping tools structured data they can rely on.
Stay compliant without rework — Required fields map cleanly to Health Canada classes, license numbers, batch and lot, COA URLs, and 19+ access requirements.
Own your data — COSTA is decentralized. There is no platform to lock you in, no fees, no gatekeeper between you and the channels reading your catalog.

CTA below: solid button See how to adopt → → /adopt.
Closing band (gray --bg-alt background, centered):

H2: Help shape v1.1.
Body: The spec is open. File an issue, propose a field, or fork the repo. We are actively soliciting feedback from licensed producers, marketplaces, and provincial regulators.
CTAs: solid View on GitHub (external, → https://github.com/xlsuite/costa), ghost Get involved → /get-involved.


About (/about)
PageHead

Eyebrow: About
H1: Cannabis Open Standards Technology Alliance.
Lede: COSTA exists to give the cannabis industry one open, vendor-neutral way to describe a product — so producers stop maintaining five copies of every catalog and consumers stop seeing five different numbers for the same SKU.

Body sections (prose, max-width 760px):
## What COSTA is
COSTA is a public-interest alliance that maintains an open specification for cannabis product data. The specification — GoCosta Cannabis Product Schema (link to /spec) — defines a JSON-LD and XML representation for cannabinoid profiles, strain and genetics, terpene data, packaging, regulatory fields, lab testing, and pricing. It is built on schema.org/Product (link to https://schema.org/Product) and aligned with Health Canada's product classes.
The spec is published under CC BY 4.0 (link) and the reference code under the MIT license. There is no membership fee, no API, and no central registry. Producers host their own data on their own domains. Aggregators read it.
## Why it exists
Cannabis product data in Canada and emerging U.S. markets is fragmented by accident, not design. Each provincial wholesale board accepts a different intake spreadsheet. Each retail marketplace defines its own product object. Each dispensary website renders cannabinoid percentages differently. Producers reconcile this manually, every week, across dozens of channels.
The cost shows up downstream: stale availability, inconsistent THC and terpene values, missing certificates of analysis, and consumers who can't compare what they're being sold. None of the existing platforms will solve this themselves — their formats are competitive moats. So the answer is the same one the broader web reached for product data twenty years ago: an open, decentralized standard.
## Principles
Five commitments shape every decision about the specification:

Decentralized. Data lives on the producer's domain. No platform owns the registry.
Open. Built on schema.org and other widely adopted web standards. Spec under CC BY 4.0. Code under MIT.
Consumer-centric. Cannabinoid, terpene, effect, and testing data are first-class — not afterthoughts.
Interoperable. Any dispensary, marketplace, search engine, or AI shopping tool can consume the same payload.
Regulatory-aware. Health Canada classes, license numbers, batch and lot, expiry, and 19+ access are part of the core schema, not extensions.

## Governance
COSTA is currently stewarded by its founding maintainer with the intent of broadening governance as adopters come on board. The model we are aiming for is closer to the early IETF or W3C than a traditional trade association: written specifications, public issues, open pull requests, and rough consensus.
Concretely, that means:

Every change to the spec is proposed and reviewed in the open on GitHub (link to https://github.com/xlsuite/costa).
Versions are semantic. Backwards-incompatible changes wait for a major release.
Anyone can file an issue, propose a field, or fork the spec.
No company controls the standard. The alliance is structurally separate from any marketplace, dispensary, or licensed producer.

Render a <Callout> with title Honest disclosure:
COSTA was founded in 2025 by Riel Roussopoulos, who also operates a cannabis marketplace. The specification is deliberately published under a permissive open license, with code on GitHub, so that no single operator — including the founder's — can capture the standard. As adopters join, governance will move to a multi-party steering committee.
## Scope
v1.0 of the specification covers the data a licensed producer would publish for an individual SKU sold to adult consumers. Future versions on the roadmap include batch-level traceability, harvest data, consumer reviews as structured data, U.S. state-specific regulatory variants, and medical cannabis certifications. The spec is extensible: producers can add custom fields under their own namespace without breaking interoperability.
## What COSTA is not

Not a marketplace. We do not list products, take orders, or compete with retailers.
Not a regulator. We do not certify producers or audit compliance.
Not a SaaS vendor. There is nothing to subscribe to.
Not a replacement for provincial reporting. Producers still file what their regulator requires.

## Get involved
If you operate a licensed producer, marketplace, dispensary technology platform, regulator, or testing lab and have feedback on the schema, we want to hear from you. Open an issue on GitHub (link), propose a change via pull request, or email hello@gocosta.org.

Spec (/spec)
This is a docs-style page with a sticky left sidebar TOC and a content column.
PageHead

Eyebrow: Specification
H1: GoCosta Cannabis Product Schema v1.0
Lede: The full technical specification for representing cannabis product data on the open web — in JSON-LD and XML.

Metadata badge row (below the page-head, before the layout grid):

v1.0 (accent-tinted pill)
Published November 2025 (neutral pill)
CC BY 4.0 (neutral pill)
Source on GitHub → (neutral pill, link to https://github.com/xlsuite/costa/blob/main/gocosta-schema-spec.md)

Layout: 240px sticky left sidebar (TOC, top 80px), then a content column maxing at ~740px. On mobile, collapse to a single column with the TOC on top inside a <details> element.
TOC sidebar: Generated from h2 and h3 headings in the rendered markdown. h3 items are indented and a step smaller. Sidebar also has a "Related" section with three links: How to adopt → /adopt, Producer template (raw) → https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md, GitHub repository → https://github.com/xlsuite/costa.
Content rendering: Fetch the markdown file from https://raw.githubusercontent.com/xlsuite/costa/main/gocosta-schema-spec.md on mount with no caching (cache: "no-store"), then render it with react-markdown + remark-gfm for table support. Add stable id attributes to every h1/h2/h3 derived from a slug of the heading text so the TOC anchor links work. While loading, show "Loading specification…" in muted text. On error, render a <Callout> titled Failed to load with the error message and a link to the GitHub source.
Heading styles inside docs content:

h1: 2rem, no top margin.
h2: 1.4rem, top border, 0.6em top padding, 2.4em top margin. (Creates a visible section separator.)
h3: 1.1rem.

Code blocks in the rendered markdown should use --code-bg background, 1px --rule border, 4px radius, 13px monospace, 1.5 line-height, overflow-x scrollable, 1em+ padding.
Tables rendered from markdown: full width, 1px bottom border on each row, header row with --bg-alt background.

Adopt (/adopt)
PageHead

Eyebrow: For licensed producers
H1: Publish your catalog once. Be readable everywhere.
Lede: Adopting COSTA takes a developer about a day for a small catalog, and an afternoon per product family thereafter. There is no API to sign up for and no fees. Here is the path from zero to a live, validated feed.

Body sections (prose):
## What you'll need

Access to your product page templates (or your headless CMS).
Your current product master data — cannabinoid percentages, terpene results, batch and lot numbers, expiry dates, COA URLs.
Your Health Canada license number.
Either a developer or a marketing technologist who has shipped schema.org markup before. (If you have a Shopify or WooCommerce site, the dev who installed your SEO plugin can do this.)

## Adoption in five steps
Render with the <Steps> component (CSS-counter ordered list).

Pick your delivery format. Most producers should start with JSON-LD embedded on every product page — it improves SEO and is read by every modern aggregator. If you have a partner who consumes feeds, also publish an XML feed at a stable URL like /feeds/products.xml.
Copy the producer template. Start from the ready-made template in the COSTA repository. It includes JSON-LD blocks for dried flower, pre-rolls, vape cartridges, edibles, and concentrates. Replace the placeholders (YOUR_STRAIN_NAME, THC_PERCENTAGE, etc.) with your real values. (Link to https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md.)
Embed on your product pages. Place the JSON-LD inside a <script type="application/ld+json"> tag in the <head> of each product page. If you run a templated storefront, populate the fields from your existing product database — do this once in the template, not once per SKU.
Validate before deploying. Run the JSON-LD through a validator (Google's Rich Results Test or the JSON-LD Playground). Cross-check that THC, CBD, and terpene percentages match your actual lab COA — structured data wrong is worse than structured data missing.
Tell the alliance. Once your feed is live, email hello@gocosta.org with the URL. We list adopters publicly and notify aggregators that a new producer feed is available.

## A minimal worked example
Here is what a single dried flower product looks like in JSON-LD, with every required field populated. Drop this into your product page's :
(Then a 

 block with this exact content — preserve the wrapping @context": "https://schema.org/",
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
</script>
Body after: See the full specification (link to /spec) for every field, including the XML representation and optional fields like detailed terpene breakdowns and aggregate ratings.
Render a <Callout> with title Data discipline matters:
Structured data is a contract. If your JSON-LD says thcPercent: 22 and your COA says 18.5, you have signed a public contract that says 22 — and you've made it machine-readable for every regulator and aggregator. Wire your COSTA payload directly to the same source of truth your lab results live in, not to your marketing copy.
## FAQ
Render as <FAQ> accordion. Seven items:

Do we need to remove our existing data feeds? — No. COSTA is additive. Keep providing whatever formats your existing partners require. Add COSTA on top so any new partner can consume your catalog without a custom integration.
Do we need permission to use the standard? — No. The spec is published under CC BY 4.0. Use it, fork it, extend it. Attribution is appreciated, not required for commercial use.
What if a field in the spec doesn't apply to our product? — Required fields must be present. Optional fields can be omitted entirely — do not include the key with an empty value. If you need a field that doesn't exist, you can extend the schema under your own namespace (e.g., "myproducer:harvestDate") without breaking interoperability.
How often do we need to update? — Update whenever the underlying data changes — new batch, new price, stock change, new COA. JSON-LD on a templated product page is updated automatically whenever your product database is. An XML feed should be regenerated at least daily.
Does this conflict with our provincial reporting? — No. Provincial wholesale boards have their own intake formats, and COSTA does not replace them. COSTA covers the consumer-facing product page and the public-web representation of your catalog — not what you file with the OCS, AGLC, or SQDC.
What does it cost? — Nothing. There are no fees, no API keys, no membership dues. You publish on your own domain. Your only cost is the development time to add the JSON-LD or XML to your site.
Who validates that our data is honest? — COSTA does not audit producers. The structured data is public, machine-readable, and easy to cross-reference against the COA URL you embedded. The transparency itself is the enforcement mechanism — regulators, journalists, and aggregators can spot inconsistencies trivially.

## Ready to publish?
Email hello@gocosta.org once your feed is live. We will list you in the public adopter directory and notify the marketplaces and aggregators that read COSTA feeds.
CTA row: solid button Get the producer template (external → https://github.com/xlsuite/costa/blob/main/gocosta-producer-template.md), ghost Read the full spec → /spec.

Get involved (/get-involved)
PageHead

Eyebrow: Get involved
H1: Help build the standard.
Lede: COSTA only works if the industry shapes it together. There are four useful ways to contribute, whether you write code, run a producer, or regulate the market.

Section: four cards in a grid
Each card has a mono icon label, an H3, a paragraph, and a ghost button:

Icon label For developers · H3 Open issues and pull requests · body The specification lives on GitHub. File an issue when something is unclear, ambiguous, or missing. Submit a PR with a proposed change. All discussion is public. · button Open an issue → https://github.com/xlsuite/costa/issues
Icon label For producers · H3 Adopt and tell us · body Implement COSTA on your product catalog, then email the URL. We will list you as an adopter, notify aggregators, and use your real-world implementation to inform the next version. · button See adoption guide → /adopt
Icon label For marketplaces & tech · H3 Consume COSTA feeds · body If you operate a dispensary, marketplace, aggregator, or shopping tool, build a COSTA reader. Reading the spec is straightforward; the JSON-LD is standard schema.org. · button Read the spec → /spec
Icon label For regulators · H3 Give us regulatory feedback · body If you work for a provincial wholesale board, Health Canada, or an international cannabis regulator, we want to make sure COSTA aligns cleanly with reporting requirements. Email us directly. · button hello@gocosta.org (mailto)

Section: prose
## How decisions get made
Every change to the spec is proposed in the open on GitHub. The process is intentionally lightweight:

An issue is filed describing the problem or proposed addition.
Discussion happens in the thread. Adopters, maintainers, and the broader community weigh in.
If there is rough consensus, a pull request is opened with the concrete change.
The maintainers merge once the PR is reviewed and aligned with the principles in the about page (link to /about).

Backwards-incompatible changes wait for a major version (v2.0). Additive changes — new optional fields, new enum values — ship in minor versions (v1.1, v1.2). The version field on every payload makes it unambiguous which revision of the spec your data targets.
## Contact
For anything that does not belong on a public GitHub issue — partnership conversations, regulatory coordination, press — email hello@gocosta.org.
Render a <Callout> with title Roadmap candidates:
Active areas of work for v1.1 and beyond:

U.S. state regulatory variants (California METRC, Colorado MED, Washington WSLCB).
Batch-level traceability and harvest data.
Consumer reviews as structured data.
Medical cannabis certifications and therapeutic-use fields.
Reference validators in JavaScript and Python, published as packages.

Body after: If any of these matters to you, file an issue or open a draft PR. The roadmap moves at the speed of contributors.

SEO and meta
Every page has unique <title> and <meta name="description"> tags. Use react-helmet-async or Vite's metadata pattern.

/ → title COSTA — An open standard for cannabis product data, description matches the hero lede.
/about → title About — COSTA, description COSTA exists to give the cannabis industry a single open standard for product data — independent of any marketplace, dispensary, or regulator.
/spec → title GoCosta Schema Specification v1.0 — COSTA, description The GoCosta Cannabis Product Schema v1.0 — full technical specification, JSON-LD and XML representations, and implementation guidance.
/adopt → title Adopt — COSTA, description A five-step guide for licensed cannabis producers to publish their product catalog in COSTA format.
/get-involved → title Get involved — COSTA, description Contribute to the COSTA specification, join the alliance, or get in touch.

Add Open Graph tags on the home page: og:title, og:description, og:type=website, og:url=https://gocosta.org. (I'll add og:image later.)
Favicon: a 32×32 SVG, deep teal (#0f5e5e) rounded square with two white chevrons [>< ].

Things to deliberately NOT do

No cannabis-green palette. No leaf icons. No marijuana imagery. The single accent color is deep teal #0f5e5e. Resist any urge to be "playful" with this — it undermines the standards-body positioning.
No fake social proof. Do not invent testimonials, partner logos, adopter counts, or "trusted by" sections. The spec has zero adopters today; saying otherwise is false. The closest the site comes is "Help shape v1.1" — that's the honest framing.
No marketing fluff. No "revolutionizing the industry" language. No "future of cannabis data." Every claim on this site is one that a regulator could fact-check.
No shadcn over-styling. Don't reach for Card components with deep shadows and large rounded corners. The cards on this site are flat, 4px radius, hairline border. Same restraint everywhere.
No animations on scroll. No fade-ins. No motion. Standards-body sites do not have animations.
No dark mode toggle. The site has one theme — the light one specified above.
No newsletter signup. Email hello@gocosta.org is the only call-to-action that requires the user to give an address.
No client-side analytics tracking by default. Add Plausible-style privacy-respecting analytics only if I ask.


Build order

Set up Tailwind theme with the exact palette and fonts above.
Build the shared <SiteHeader> and <SiteFooter> first.
Build the design-system primitives: <Card>, <Steps>, <Callout>, <FAQ>, <Button>, <Chip>, <Hero>, <PageHead>.
Build the home page so we can see the system in action.
Build About, Adopt, Get involved (each is mostly prose with a few components).
Build the Spec page last — it has the most moving parts (fetch, markdown render, TOC generation, anchor scrolling).
Verify all internal links resolve and the site renders cleanly at 380px, 768px, and 1280px widths.

When complete, the site should feel like the documentation site for a serious open standard — sober, well-structured, and absent of marketing tropes.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://costa.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/830e8a7d-d885-41d7-ada6-e429fa88b3fe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
