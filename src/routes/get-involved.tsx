import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Callout, Card, Button } from "../components/site/primitives";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get involved — COSTA" },
      { name: "description", content: "Contribute to the COSTA specification, join the alliance, or get in touch." },
      { property: "og:title", content: "Get involved — COSTA" },
      { property: "og:description", content: "Contribute to the COSTA specification, join the alliance, or get in touch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GetInvolved,
});

function GetInvolved() {
  return (
    <Layout>
      <PageHead
        eyebrow="Get involved"
        title="Help build the standard."
        lede="COSTA only works if the industry shapes it together. There are four useful ways to contribute, whether you write code, run a producer, or regulate the market."
      />

      <section style={{ paddingBlock: 64 }}>
        <Container wide>
          <div className="costa-gi-grid">
            <ContribCard
              icon="For developers"
              title="Open issues and pull requests"
              body="The specification lives on GitHub. File an issue when something is unclear, ambiguous, or missing. Submit a PR with a proposed change. All discussion is public."
              cta={<Button href="https://github.com/xlsuite/costa/issues" external variant="ghost">Open an issue →</Button>}
            />
            <ContribCard
              icon="For producers"
              title="Adopt and tell us"
              body="Implement COSTA on your product catalog, then email the URL. We will list you as an adopter, notify aggregators, and use your real-world implementation to inform the next version."
              cta={<Button to="/adopt" variant="ghost">See adoption guide →</Button>}
            />
            <ContribCard
              icon="For marketplaces & tech"
              title="Consume COSTA feeds"
              body="If you operate a dispensary, marketplace, aggregator or shopping tool, build a COSTA reader. Feeds are plain JSON with a published JSON Schema, and the reference validator is open source."
              cta={<Button to="/spec" variant="ghost">Read the spec →</Button>}
            />
            <ContribCard
              icon="For regulators"
              title="Give us regulatory feedback"
              body="If you work for a provincial wholesale board, Health Canada, or an international cannabis regulator, we want to make sure COSTA aligns cleanly with reporting requirements. Email us directly."
              cta={<Button href="mailto:hello@gocosta.org" variant="ghost">hello@gocosta.org</Button>}
            />
          </div>
          <style>{`
            .costa-gi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
            @media (max-width: 720px) { .costa-gi-grid { grid-template-columns: 1fr; } }
          `}</style>
        </Container>
      </section>

      <Container>
        <article className="prose" style={{ paddingBottom: 80 }}>
          <h2>How decisions get made</h2>
          <p>Every change to the spec is proposed in the open on GitHub. The process is intentionally lightweight:</p>
          <ol>
            <li>An issue is filed describing the problem or proposed addition.</li>
            <li>Discussion happens in the thread. Adopters, maintainers, and the broader community weigh in.</li>
            <li>If there is rough consensus, a pull request is opened with the concrete change.</li>
            <li>The maintainers merge once the PR is reviewed and aligned with the principles in the <a href="/about">about page</a>.</li>
          </ol>
          <p>Backwards-incompatible changes wait for a major version. Additive changes, such as new optional fields or enum values, ship in minor versions. Provincial profiles are versioned separately because provincial rules change more often. Every COSTA document carries a costaVersion field, so it is always clear which revision it targets.</p>

          <h2>Contact</h2>
          <p>For anything that does not belong on a public GitHub issue — partnership conversations, regulatory coordination, press — email <a href="mailto:hello@gocosta.org">hello@gocosta.org</a>.</p>

          <Callout title="Roadmap candidates">
            <p style={{ marginTop: 0 }}>Active areas of work after 2.0:</p>
            <ul style={{ margin: "0.5em 0 0", paddingLeft: "1.4em" }}>
              <li>Profiles for Saskatchewan, Manitoba, the Atlantic provinces and the territories, and a full review of Alberta's.</li>
              <li>U.S. state regulatory variants.</li>
              <li>Validator packages for JavaScript and Python.</li>
              <li>Feed signing and registry tooling.</li>
              <li>Pilots with producers, labs and provincial distributors.</li>
            </ul>
          </Callout>

          <p>If any of these matters to you, file an issue or open a draft PR. The roadmap moves at the speed of contributors.</p>
        </article>
      </Container>
    </Layout>
  );
}

function ContribCard({ icon, title, body, cta }: { icon: string; title: string; body: string; cta: React.ReactNode }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{icon}</div>
      <h3 style={{ fontSize: "1.1rem" }}>{title}</h3>
      <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", flex: 1 }}>{body}</p>
      <div style={{ marginTop: "0.5rem" }}>{cta}</div>
    </div>
  );
}
