import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "../components/site/Layout";
import { PageHead, Container, Button } from "../components/site/primitives";
import { newsPosts, formatNewsDate } from "../content/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = newsPosts.find((item) => item.slug === params.slug);
    if (!post) throw notFound();
    return { slug: post.slug, title: post.title, date: post.date, author: post.author, summary: post.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable — COSTA News" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.title} — COSTA`;
    const url = `https://gocosta.org/news/${loaderData.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: loaderData.date },
        { property: "article:author", content: loaderData.author },
        { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
        { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e584dd42-9e20-47dc-a22f-1058501bca96" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: NewsPost,
});

function NewsPost() {
  const data = Route.useLoaderData();
  const post = newsPosts.find((item) => item.slug === data.slug);
  if (!post) return null;
  return <Layout>
    <PageHead eyebrow={`News · ${formatNewsDate(post.date)}`} title={post.title} lede={post.summary} />
    <Container>
      <article className="prose" style={{ paddingBlock: 56 }}>
        <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 0 }}>{post.author}</p>
        {post.body}
        <div style={{ display: "flex", gap: "0.8rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <Button to="/spec" variant="solid">Read the 2.0 spec →</Button>
          <Button href="https://github.com/xlsuite/costa" variant="ghost" external>View on GitHub</Button>
        </div>
      </article>
    </Container>
  </Layout>;
}
