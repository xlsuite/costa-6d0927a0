import type { ReactNode } from "react";

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  body: ReactNode;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "costa-2-0",
    title: "COSTA 2.0: lab reports, GTIN history and provincial profiles",
    date: "2026-11-02",
    author: "Riel Roussopoulos, founding maintainer",
    summary: "COSTA 2.0 is out as a draft for public comment. It turns COSTA from a product-page markup format into a full product data standard, with free tools that check data against federal rules and provincial supplier requirements.",
    body: <>
      <p>COSTA 2.0 is now published as a draft for public comment. It is a breaking release. Version 1 described a product page. Distributors, retailers, labs and regulators need more than that: which lot this is, what its label says, what the lab measured, and which GTIN meant which product, and when. Version 2.0 covers product master data, lot data and lab results, with a free reference validator that checks them.</p>
      <h2>Why a breaking release</h2>
      <p>Version 1 had errors we needed to fix. It expressed dried cannabis potency as a percentage, but under the Cannabis Regulations labels show Total THC and Total CBD, and dried cannabis is labelled in milligrams per gram. It also pointed to schema files that were never published. Fixing both properly meant changing field names and structure, so 2.0 is a new major version.</p>
      <h2>What's new</h2>
      <ul>
        <li><strong>Aligned with federal rules.</strong> The seven classes of cannabis in Schedule 4 of the Cannabis Act map one-to-one to the consolidated schedule Health Canada proposed for the Cannabis Tracking System Order in the Canada Gazette, Part I, on September 26, 2026. Potency is carried in the same basis and units the label must use, and the validator checks the federal THC limits.</li>
        <li><strong>Lab reports as data.</strong> A certificate of analysis becomes a structured record: the lab and its accreditation, the sample, every test panel and result, and a SHA-256 fingerprint of the signed PDF. The validator checks that required tests are present, that Total THC adds up (THC + 0.877 × THCA), and that the label is within the tolerance the Cannabis Regulations allow.</li>
        <li><strong>GTIN history.</strong> Every product gets a permanent COSTA ID. GTINs become dated assignments, and a defined lookup by lot and packaging date keeps a reused or reassigned GTIN from resolving to the wrong product.</li>
        <li><strong>Provincial profiles.</strong> Machine-checkable rules for the Ontario Cannabis Store, BC Liquor Distribution Branch and SQDC, with Alberta (AGLC) provisional. Barcodes can vary by province, because they already do: the OCS forbids application identifier (90) on case labels and the SQDC requires it.</li>
        <li><strong>JSON, JSON-LD and XML.</strong> The XML Schema is generated from the JSON Schema, and every example converts JSON → XML → JSON without loss.</li>
        <li><strong>Free tooling.</strong> A reference validator, a test case for every rule, and automated checks on every change to the repository.</li>
      </ul>
      <h2>What COSTA is, and what it isn't</h2>
      <p>COSTA does not issue GTINs or replace barcodes. Provincial distributors require GS1 GTINs, and COSTA uses them as their owners publish them. What COSTA offers is an open, royalty-free way to describe and share the data behind those GTINs, hosted on each producer's own domain and checkable by anyone.</p>
      <p>COSTA does not replace provincial intake processes today, either. A COSTA feed becomes a substitute for a distributor's own process only once that distributor agrees to accept it. That is the work ahead, and it is why the provincial profiles exist: they show exactly how COSTA data meets each distributor's current requirements.</p>
      <h2>Moving from version 1</h2>
      <ul>
        <li>Potency: multiply a percentage by 10 to get mg/g (18.5% becomes 185 mg/g), and use the Total THC and Total CBD values printed on the label.</li>
        <li>Class of cannabis: use the Schedule 4 wording exactly, for example "dried cannabis".</li>
        <li>Price and availability are no longer in the core record. Keep them in schema.org Offer markup on your product pages.</li>
        <li>Lot numbers, expiry dates and test results move to lot and lab report records.</li>
      </ul>
      <p>Section 14 of the specification has the full migration table.</p>
      <h2>Comment on the draft</h2>
      <p>We want feedback before 2.0 is final, especially from producers willing to try it on a real catalogue, labs on the lab report model, and provincial distributors on the profiles. Open an issue or pull request on GitHub, or email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a>.</p>
      <p>Separately, Health Canada's comment period on the proposed Cannabis Tracking System Order amendment closes on November 10, 2026.</p>
    </>,
  },
];

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function newestNewsFirst(posts: readonly NewsPost[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
