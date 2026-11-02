# Architecture rules

- Serve namespace and schema resources through Cloudflare static assets before the application worker; keep response headers and redirects in public/_headers and public/_redirects, with the bare namespace redirect also handled before routing in the server entry because production may bypass static redirect rules.
- Parse spec header metadata in a browser-safe pure helper shared with tests; keep the existing client fetch and legacy fallback, updating the browser title after markdown loads because route head metadata cannot observe component state.