import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Card, Chip, Callout, Button } from "../components/site/primitives";
import { adopters, sortedAdopters, formatJurisdiction } from "../content/adopters";
import { formatNewsDate } from "../content/news";

export const Route = createFileRoute("/adopters")({
  head: () => ({
    meta: [
      { title: "Adopters — COSTA" },
      { name: "description", content: "Organizations publishing, reading or implementing the COSTA open cannabis product data standard." },
      { property: "og:title", content: "Adopters — COSTA" },
      { property: "og:description", content: "Organizations publishing, reading or implementing the COSTA open cannabis product data standard." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gocosta.org/adopters" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://gocosta.org/adopters" }],
  }),
  component: Adopters,
});

const statusDefinitions = [
  ["Publishing", "Publishes a COSTA feed that passes the reference validator. The feed URL is listed and can be checked by anyone."],
  ["Reading", "Imports COSTA feeds in production."],
  ["Implementing", "Has committed to publishing or reading COSTA, and work is underway. Nothing is live yet."],
  ["Supporter", "Publicly supports the standard, with no implementation yet."],
] as const;

function Adopters() {
  return (
    <Layout>
      <PageHead eyebrow="Adopters" title="Who uses COSTA." lede="Producers, marketplaces, labs and software vendors that publish, read or are implementing COSTA. Every status is self-reported unless marked as a verified feed." />
      <section className="py-14" aria-labelledby="adopter-status-heading">
        <Container wide>
          <h2 id="adopter-status-heading" className="mb-6 text-xl">Status</h2>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {statusDefinitions.map(([status, definition]) => (
              <div key={status}>
                <dt className="mb-2 font-mono text-sm font-semibold text-accent">{status}</dt>
                <dd className="text-sm text-ink-muted">{definition}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="border-t border-rule py-14" aria-label="Adopter directory">
        <Container wide>
          <div className="grid gap-4 md:grid-cols-2">
            {sortedAdopters(adopters).map((adopter) => (
              <Card key={adopter.url}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl"><a href={adopter.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-hover">{adopter.name}</a></h2>
                  <Chip accent={adopter.status === "publishing"}>{adopter.status[0].toUpperCase() + adopter.status.slice(1)}</Chip>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>{adopter.role}</Chip>
                  {adopter.jurisdictions.map((code) => <Chip key={code}>{formatJurisdiction(code)}</Chip>)}
                </div>
                <p className="mt-4">{adopter.description}</p>
                <p className="mt-4 text-sm text-ink-muted">Listed <time dateTime={adopter.listed}>{formatNewsDate(adopter.listed)}</time></p>
                {adopter.feedUrl && <p className="mt-3 font-mono text-sm [overflow-wrap:anywhere]"><a href={adopter.feedUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-hover">{adopter.feedUrl}</a></p>}
                {adopter.note && <p className="mt-3 text-sm text-ink-muted">{adopter.note}</p>}
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-rule py-14">
        <Container>
          <div className="prose">
            <h2 className="!mt-0 !border-t-0 !pt-0">Get listed</h2>
            <p>To be listed, email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a> with your organization's name, website, role and status. To be listed as Publishing, your feed must be served at /.well-known/costa/feed.json, pass the reference validator for every profile it declares, and be added to registry/publishers.json in the COSTA repository by pull request. We re-check listed feeds and will change a listing's status if its feed stops validating.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="mailto:hello@gocosta.org" variant="solid">Email hello@gocosta.org</Button>
            <Button to="/adopt" variant="ghost">How to adopt</Button>
          </div>
          <Callout title="About these listings">COSTA does not certify organizations or audit their data. A listing means an organization told us its status, and for Publishing, that its feed validated when we checked it.</Callout>
        </Container>
      </section>
    </Layout>
  );
}