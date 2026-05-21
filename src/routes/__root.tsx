import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Layout } from "../components/site/Layout";

function NotFoundComponent() {
  return (
    <Layout>
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div className="eyebrow">404</div>
          <h1 style={{ fontSize: "2rem", marginTop: "0.8rem" }}>Page not found.</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: "0.8rem" }}>
            The page you're looking for doesn't exist.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/" className="btn btn-solid">Go home</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <Layout>
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 style={{ fontSize: "1.4rem" }}>This page didn't load.</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: "0.8rem" }}>Something went wrong on our end.</p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.6rem", justifyContent: "center" }}>
            <button
              onClick={() => { router.invalidate(); reset(); }}
              className="btn btn-solid"
            >Try again</button>
            <a href="/" className="btn btn-ghost">Go home</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "COSTA — An open standard for cannabis product data" },
      { name: "description", content: "COSTA is the Cannabis Open Standards Technology Alliance — a vendor-neutral schema for cannabis product data on the open web." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
