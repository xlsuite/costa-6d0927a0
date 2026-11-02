import { describe, expect, test } from "bun:test";
import { adopters, adopterRoles, adopterStatuses, sortedAdopters, formatJurisdiction, type Adopter } from "../src/content/adopters";

describe("adopter directory", () => {
  test("every adopter has a valid status", () => {
    for (const adopter of adopters) expect(adopterStatuses).toContain(adopter.status);
  });
  test("every adopter has a valid role", () => {
    for (const adopter of adopters) expect(adopterRoles).toContain(adopter.role);
  });
  test("publishing entries require the standard feed URL", () => {
    const publishing: Adopter = { ...adopters[0], status: "publishing", feedUrl: "https://example.org/.well-known/costa/feed.json" };
    for (const adopter of [...adopters, publishing]) {
      if (adopter.status === "publishing") {
        expect(adopter.feedUrl.endsWith("/.well-known/costa/feed.json")).toBe(true);
        expect(new URL(adopter.feedUrl).pathname).toBe("/.well-known/costa/feed.json");
      } else {
        expect(adopter.feedUrl).toBeUndefined();
      }
    }
  });
  test("listed dates parse as ISO calendar dates", () => {
    for (const adopter of adopters) {
      expect(adopter.listed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const date = new Date(`${adopter.listed}T00:00:00Z`);
      expect(Number.isNaN(date.getTime())).toBe(false);
      expect(date.toISOString().slice(0, 10)).toBe(adopter.listed);
    }
  });
  test("sorts by status then name without mutating input", () => {
    const base = adopters[0];
    if (!base) throw new Error("Expected the Poof listing");
    const entries: Adopter[] = [
      { ...base, name: "Supporter", status: "supporter" },
      { ...base, name: "Zebra", status: "reading" },
      { ...base, name: "Implementer", status: "implementing" },
      { ...base, name: "Publisher", status: "publishing", feedUrl: "https://example.org/.well-known/costa/feed.json" },
      { ...base, name: "Alpha", status: "reading" },
    ];
    expect(sortedAdopters(entries).map((entry) => entry.name)).toEqual(["Publisher", "Alpha", "Zebra", "Implementer", "Supporter"]);
    expect(entries[0].name).toBe("Supporter");
  });
  test("formats the requested jurisdictions and preserves unknown codes", () => {
    expect(["CA-ON", "CA-BC", "CA-QC", "CA-AB", "CA-SK"].map(formatJurisdiction)).toEqual(["Ontario", "British Columbia", "Quebec", "Alberta", "CA-SK"]);
  });
});