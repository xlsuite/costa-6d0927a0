import { describe, expect, test } from "bun:test";
import { newestNewsFirst, type NewsPost } from "../src/content/news";

describe("news listing order", () => {
  test("lists posts newest first without changing the content source order", () => {
    const posts: NewsPost[] = [
      { slug: "older", date: "2026-11-01", title: "", author: "", summary: "", body: null },
      { slug: "launch", date: "2026-11-02", title: "", author: "", summary: "", body: null },
      { slug: "newer", date: "2026-11-03", title: "", author: "", summary: "", body: null },
    ];
    expect(newestNewsFirst(posts).map((post) => post.slug)).toEqual(["newer", "launch", "older"]);
    expect(posts.map((post) => post.slug)).toEqual(["older", "launch", "newer"]);
  });
});