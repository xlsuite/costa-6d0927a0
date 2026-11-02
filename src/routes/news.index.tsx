import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container } from "../components/site/primitives";
import { newsPosts, newestNewsFirst, formatNewsDate } from "../content/news";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — COSTA" },
      { name: "description", content: "News and releases from the Cannabis Open Standards Technology Alliance." },
      { property: "og:title", content: "News — COSTA" },
      { property: "og:description", content: "News and releases from the Cannabis Open Standards Technology Alliance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gocosta.org/news" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://gocosta.org/news" }],
  }),
  component: News,
});

function News() {
  return <Layout>
    <PageHead eyebrow="Alliance" title="News" />
    <Container>
      <div style={{ paddingBlock: 56 }}>
        {newestNewsFirst(newsPosts).map((post) => <article className="prose" key={post.slug} style={{ paddingBottom: 32, marginBottom: 32, borderBottom: "1px solid var(--rule)" }}>
          <time className="eyebrow" dateTime={post.date}>{formatNewsDate(post.date)}</time>
          <h2><Link to="/news/$slug" params={{ slug: post.slug }}>{post.title}</Link></h2>
          <p>{post.summary}</p>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>{post.author}</p>
          <Link to="/news/$slug" params={{ slug: post.slug }}>Read the announcement →</Link>
        </article>)}
      </div>
    </Container>
  </Layout>;
}
