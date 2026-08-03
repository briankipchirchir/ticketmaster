// src/data/foreverTicketsData.ts
//
// Standalone data file for the F+FOREVER concert mobile tickets.
// Deliberately self-contained (own types, own constants) so it does NOT
// touch the existing ticketsData.ts / Order type used elsewhere.

export const FFOREVER_EVENT_NAME =
  "F+FOREVER 恒星之城 世界巡回演唱会 - 吉隆坡站";
export const FFOREVER_VENUE = "Unifi Arena Bukit Jalil";
export const FFOREVER_MAP_URL =
  "https://maps.google.com/?q=Unifi+Arena+Bukit+Jalil";

// Replace with the real purchaser name for each ticket if it differs.
const DEFAULT_PURCHASER_NAME = "MELISSA ZURIN ";

export type ForeverCategory = "P1" | "P2" | "P3";

export interface ForeverTicket {
  id: string;
  eventName: string;
  posterAsset: string; // import path / filename for the poster thumbnail
  date: string; // e.g. "Fri, 7 Aug, 2026 08:00 pm"
  venue: string;
  venueMapUrl: string;
  category: ForeverCategory;
  entrance: string; // e.g. "Main"
  ticketType: string; // e.g. "Live Nation Presale"
  section: string; // PLACEHOLDER - update with real section
  row: string; // PLACEHOLDER - update with real row
  seat: string; // PLACEHOLDER - update with real seat
  purchaserFullName: string;
  priceMYR: number;
}

// ---- PLACEHOLDER SEAT DATA ----
// Update section / row / seat / entrance for each ticket once you have
// the real seat map assignments. Prices are taken from the official
// price tiers on the seating chart (P1 1288 / P2 1088 / P3(RV) 788).

export const FOREVER_TICKETS: ForeverTicket[] = [
  // ---------- Friday, 7 Aug 2026 ----------
  {
    id: "fforever-fri-p1",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Fri, 7 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P1",
    entrance: "Main",
    ticketType: "Live Nation Presale",
    section: "319", // placeholder
    row: "D", // placeholder
    seat: "20", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 1288,
  },
  {
    id: "fforever-fri-p2",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Fri, 7 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P2",
    entrance: "Main",
    ticketType: "Live Nation Presale",
    section: "306", // placeholder
    row: "N", // placeholder
    seat: "5", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 1088,
  },
  {
    id: "fforever-fri-p3",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Fri, 7 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P3",
    entrance: "Main",
    ticketType: "Live Nation Presale RV",
    section: "321", // placeholder, restricted view
    row: "B", // placeholder
    seat: "15", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 788,
  },

  // ---------- Saturday, 8 Aug 2026 ----------
  {
    id: "fforever-sat-p1",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Sat, 8 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P1",
    entrance: "Main",
    ticketType: "Live Nation Presale",
    section: "319", // placeholder
    row: "D", // placeholder
    seat: "20", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 1288,
  },
  {
    id: "fforever-sat-p2",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Sat, 8 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P2",
    entrance: "Main",
    ticketType: "Live Nation Presale",
    section: "306", // placeholder
    row: "N", // placeholder
    seat: "5", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 1088,
  },
  {
    id: "fforever-sat-p3",
    eventName: FFOREVER_EVENT_NAME,
    posterAsset: "forever.jpeg",
    date: "Sat, 8 Aug, 2026 08:00 pm",
    venue: FFOREVER_VENUE,
    venueMapUrl: FFOREVER_MAP_URL,
    category: "P3",
    entrance: "Main",
    ticketType: "Live Nation Presale RV",
    section: "316", // placeholder, restricted view
    row: "B", // placeholder
    seat: "18", // placeholder
    purchaserFullName: DEFAULT_PURCHASER_NAME,
    priceMYR: 788,
  },
];

export function getForeverTicketById(id: string): ForeverTicket | undefined {
  return FOREVER_TICKETS.find((t) => t.id === id);
}