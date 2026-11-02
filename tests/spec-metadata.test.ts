import { expect, test } from "bun:test";
import { parseSpecMetadata } from "../src/lib/spec-metadata";

const header = "**Status:** Draft for public comment · **Version:** 2.0.0-draft.1 · **Date:** 2026-11-02 · **License:** MIT (see `LICENSE`)";

test("parses the first H1 and metadata pairs, stripping trailing parentheticals", () => {
  expect(parseSpecMetadata(`# COSTA 2.0: Open Cannabis Product Data Standard\n\n${header}\n# Later title`)).toEqual({
    title: "COSTA 2.0: Open Cannabis Product Data Standard",
    chips: [
      { key: "Status", value: "Draft for public comment" },
      { key: "Version", value: "2.0.0-draft.1" },
      { key: "Date", value: "2026-11-02" },
      { key: "License", value: "MIT" },
    ],
  });
});

test("uses legacy fallback while loading or without a metadata header", () => {
  expect(parseSpecMetadata(null)).toBeNull();
  expect(parseSpecMetadata("# GoCosta Cannabis Product Schema v1.0\nLegacy document")).toBeNull();
});

test("ignores fenced examples and uses only the first metadata line", () => {
  const parsed = parseSpecMetadata(`\`\`\`md\n# Example\n${header}\n\`\`\`\n# Actual title\n${header}\n**Version:** 9.0 · **License:** Other`);
  expect(parsed?.title).toBe("Actual title");
  expect(parsed?.chips.find((chip) => chip.key === "Version")?.value).toBe("2.0.0-draft.1");
});