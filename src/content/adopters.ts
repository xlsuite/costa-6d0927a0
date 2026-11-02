export const adopterRoles = ["producer", "marketplace", "retailer", "software", "lab", "distributor"] as const;
export const adopterStatuses = ["publishing", "reading", "implementing", "supporter"] as const;

export type Adopter = {
  name: string;
  url: string;
  role: (typeof adopterRoles)[number];
  jurisdictions: string[];
  listed: string;
  description: string;
  note?: string;
} & (
  | { status: "publishing"; feedUrl: string }
  | { status: "reading" | "implementing" | "supporter"; feedUrl?: never }
);

export const adopters: Adopter[] = [
  { name: "Poof", url: "https://poof.ca", role: "marketplace", status: "implementing", jurisdictions: ["CA-ON"], listed: "2026-11-02", description: "Online cannabis marketplace in Ontario. Building support for reading COSTA product feeds into its catalogue.", note: "Disclosure: COSTA's founding maintainer is Poof's CMO." },
];

export function sortedAdopters(entries: readonly Adopter[]) {
  return [...entries].sort((a, b) => adopterStatuses.indexOf(a.status) - adopterStatuses.indexOf(b.status) || a.name.localeCompare(b.name));
}

const jurisdictionNames: Record<string, string> = {
  "CA-ON": "Ontario",
  "CA-BC": "British Columbia",
  "CA-QC": "Quebec",
  "CA-AB": "Alberta",
};

export function formatJurisdiction(code: string) {
  return jurisdictionNames[code] ?? code;
}