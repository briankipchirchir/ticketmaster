export interface TicketItem {
  id: string;
  eventName: string;
  date: string;
  venue: string;
  seatInfoShort: string; // shown in the collapsed order table row
  ticketInfoShort: string; // shown in the collapsed order table row
  bookingFee: string;
  subtotal: string;
  qty: number;
  // Fields used by the mobile ticket detail page
  badgeLabel: string;
  price: string;
  ticketCategory: string;
  section: string;
  ticketInfoLines: string[];
  gateDoor: string;
  levelTier: string;
  attendeeName: string;
}

export interface Order {
  orderNo: string;
  orderTime: string;
  status: string;
  items: TicketItem[];
}

const ATTENDEE_NAME = "Melissa nathans ";

const FFOREVER_EVENT_NAME =
  "F✦FOREVER 1st World Tour in Singapore\nF✦FOREVER 恒星之城 世界巡回演唱会 - 新加坡站";
const FFOREVER_VENUE = "Singapore Indoor Stadium";
const FFOREVER_ORDER_TIME = "16-06-2026\n02:09pm";

export const ORDERS: Order[] = [
  // ---------------- F✦FOREVER 1st World Tour in Singapore ----------------
  {
    orderNo: "BK",
    orderTime: FFOREVER_ORDER_TIME,
    status: "E-ticket Available",
    items: [
      {
        id: "fforever-cat2-1",
        eventName: FFOREVER_EVENT_NAME,
        date: "15 Aug 2026 (Sat.) 08:00 pm",
        venue: FFOREVER_VENUE,
        seatInfoShort: "221\nRow 21, Seat 5",
        ticketInfoShort: "CAT 2\nLive Nation + 恒星不忘尊荣礼包 $408.00",
        bookingFee: "$10.00",
        subtotal: "$418.00",
        qty: 1,
        badgeLabel: "CAT 2",
        price: "$408.00",
        ticketCategory: "CAT 2 — Live Nation + 恒星不忘尊荣礼包",
        section: "221",
        ticketInfoLines: ["Row 21 Seat 5"],
        gateDoor: "NORTH (L2)",
        levelTier: "L2",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: FFOREVER_ORDER_TIME,
    status: "E-ticket Available",
    items: [
      {
        id: "fforever-cat1-1",
        eventName: FFOREVER_EVENT_NAME,
        date: "16 Aug 2026 (Sun.) 08:00 pm",
        venue: FFOREVER_VENUE,
        seatInfoShort: "121A\nRow A, Seat 3",
        ticketInfoShort: "CAT 1\nLive Nation + 恒星不忘尊荣礼包 $458.00",
        bookingFee: "$10.00",
        subtotal: "$468.00",
        qty: 1,
        badgeLabel: "CAT 1",
        price: "$458.00",
        ticketCategory: "CAT 1 — Live Nation + 恒星不忘尊荣礼包",
        section: "121A",
        ticketInfoLines: ["Row A Seat 3"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: FFOREVER_ORDER_TIME,
    status: "E-ticket Available",
    items: [
      {
        id: "fforever-cat1-2",
        eventName: FFOREVER_EVENT_NAME,
        date: "16 Aug 2026 (Sun.) 08:00 pm",
        venue: FFOREVER_VENUE,
        seatInfoShort: "101A\nRow A, Seat 5",
        ticketInfoShort: "CAT 1\nLive Nation + 恒星不忘尊荣礼包 $458.00",
        bookingFee: "$10.00",
        subtotal: "$468.00",
        qty: 1,
        badgeLabel: "CAT 1",
        price: "$458.00",
        ticketCategory: "CAT 1 — Live Nation + 恒星不忘尊荣礼包",
        section: "121A",
        ticketInfoLines: ["Row A Seat 5"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
];

// Flat lookup helper: find any ticket item by its id, across all orders
export function findTicketById(id: string | undefined): TicketItem | undefined {
  if (!id) return undefined;
  for (const order of ORDERS) {
    const found = order.items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

// Flattened list of every ticket across every order, used by the
// multi-select "Ticket Transfer" page
export function getAllTickets(): TicketItem[] {
  return ORDERS.flatMap((order) => order.items);
}