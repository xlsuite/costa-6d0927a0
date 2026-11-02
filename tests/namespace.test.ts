import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

describe("COSTA namespace assets", () => {
  test("preserves the supplied context byte-for-byte", async () => {
    const bytes = await readFile(new URL("../public/ns/costa-2.0.jsonld", import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "ea81ee5793819bab48e48703979296747111a4ff26fa9140af96cdcb9f987f4b",
    );
  });

  test("sets the JSON-LD content type and permits cross-origin reads", async () => {
    const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
    expect(headers).toBe("/ns/*\n  Content-Type: application/ld+json\n  Access-Control-Allow-Origin: *\n");
  });

  test("temporarily redirects the bare namespace to the specification", async () => {
    const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
    expect(redirects).toBe("/ns/2.0 /spec 302\n");
  });

  test("serves static assets before the application catch-all", async () => {
    const config = await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");
    expect(config).toMatch(/"assets"\s*:\s*\{\s*"run_worker_first"\s*:\s*false\s*\}/);
  });
});