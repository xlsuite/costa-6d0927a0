export type SpecMetadata = {
  title: string | null;
  chips: { key: string; value: string }[];
};

export function parseSpecMetadata(markdown: string | null): SpecMetadata | null {
  if (!markdown) return null;
  let title: string | null = null;
  let chips: SpecMetadata["chips"] | null = null;
  let fence: string | null = null;
  for (const line of markdown.split(/\r?\n/)) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1][0];
      else if (fence === marker[1][0]) fence = null;
      continue;
    }
    if (fence) continue;
    const heading = line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (!title && heading) title = heading[1];
    if (chips) continue;
    const pairs = line.trim().split(" · ").map((part) =>
      part.match(/^\*\*(Status|Version|Date|License):\*\*\s+(.+?)\s*$/),
    );
    if (pairs.length < 2 || pairs.some((pair) => !pair)) continue;
    chips = pairs.flatMap((pair) => pair ? [{
      key: pair[1],
      value: pair[2].replace(/\s*\([^)]*\)\s*$/, "").trim(),
    }] : []);
  }
  return chips ? { title, chips } : null;
}