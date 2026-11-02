import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import server from "../src/server";

describe("COSTA namespace assets", () => {
  test("preserves the supplied context byte-for-byte", async () => {
    const bytes = await readFile(new URL("../public/ns/costa-2.0.jsonld", import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "ea81ee5793819bab48e48703979296747111a4ff26fa9140af96cdcb9f987f4b",
    );
  });

  test("sets the JSON-LD content type and permits cross-origin reads", async () => {
    const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
    expect(headers.split(/\n\s*\n/)[0].trimEnd()).toBe("/ns/*\n  Content-Type: application/ld+json\n  Access-Control-Allow-Origin: *");
  });

  test("temporarily redirects the bare namespace to the specification", async () => {
    const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
    expect(redirects.trimEnd()).toBe("/ns/2.0 /spec 302");
  });

  test("serves static assets before the application catch-all", async () => {
    const config = await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");
    expect(config).toMatch(/"assets"\s*:\s*\{\s*"run_worker_first"\s*:\s*false\s*\}/);
  });

  test("preserves the supplied JSON Schema byte-for-byte", async () => {
    const bytes = await readFile(new URL("../public/schemas/costa-2.0.schema.json", import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "62fe93fe8a469e88a5efdf64c2e290b9200101d5eed998469071477ef26902fa",
    );
  });

  test("sets the schema content type and permits cross-origin reads", async () => {
    const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
    expect(headers.split(/\n\s*\n/)[1].trimEnd()).toBe("/schemas/*\n  Content-Type: application/schema+json\n  Access-Control-Allow-Origin: *");
  });

  for (const path of ["/ns/2.0", "/ns/2.0/"]) {
    test(`GET ${path} redirects before application routing`, async () => {
      const response = await server.fetch(new Request(`https://gocosta.org${path}`), {}, {});
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe("/spec");
    });
  }
});