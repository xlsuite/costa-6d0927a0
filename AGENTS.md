# Architecture rules

- Serve namespace resources through Cloudflare static assets before the application worker; keep namespace response headers and redirects in public/_headers and public/_redirects so application catch-all routing cannot intercept them.