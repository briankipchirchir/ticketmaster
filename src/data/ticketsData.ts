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

const ATTENDEE_NAME = "Melissa nathans";
const EVENT_NAME = "MAMAMOO 2026 WORLD TOUR <4WARD> in SINGAPORE";
const VENUE = "Singapore Indoor Stadium";
const EVENT_DATE = "31 Jul 2026 (Fri.) 07:30 pm";

export const ORDERS: Order[] = [
  {
    orderNo: "BK",
    orderTime: "20-05-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "vip-seated-1",
        eventName: EVENT_NAME,
        date: EVENT_DATE,
        venue: VENUE,
        seatInfoShort: "SEATED PC1 \nNo.09",
        ticketInfoShort: "VIP SEATED\n$358.00",
        bookingFee: "$10.00",
        subtotal: "$368.00",
        qty: 1,
        badgeLabel: "VIP SEATED",
        price: "$358.00",
        ticketCategory: "VIP SEATED PC1",
        section: "SEATED PC1",
        ticketInfoLines: ["Row 2 Seat 09"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-05-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "vip-standing-1",
        eventName: EVENT_NAME,
        date: EVENT_DATE,
        venue: VENUE,
        seatInfoShort: "STANDING PEN B\nNo.0032",
        ticketInfoShort: "VIP STANDING\n$358.00",
        bookingFee: "$10.00",
        subtotal: "$368.00",
        qty: 1,
        badgeLabel: "VIP Standing",
        price: "$358.00",
        ticketCategory: "VIP STANDING PEN B",
        section: "STANDING PEN B",
        ticketInfoLines: ["Queue No. 0032"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-05-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "cat1-1",
        eventName: EVENT_NAME,
        date: EVENT_DATE,
        venue: VENUE,
        seatInfoShort: "Section 223\nRow 5",
        ticketInfoShort: "CAT 1\n$318.00",
        bookingFee: "$10.00",
        subtotal: "$328.00",
        qty: 1,
        badgeLabel: "CAT 1",
        price: "$318.00",
        ticketCategory: "CAT 1",
        section: "Section 223",
        ticketInfoLines: ["Row 5 Seat 12"],
        gateDoor: "NORTH (L2)",
        levelTier: "L2",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-05-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "cat1-2",
        eventName: EVENT_NAME,
        date: EVENT_DATE,
        venue: VENUE,
        seatInfoShort: "Section 224\nRow 5",
        ticketInfoShort: "CAT 1\n$318.00",
        bookingFee: "$10.00",
        subtotal: "$328.00",
        qty: 1,
        badgeLabel: "CAT 1",
        price: "$318.00",
        ticketCategory: "CAT 1",
        section: "Section 224",
        ticketInfoLines: ["Row 5 Seat 13"],
        gateDoor: "NORTH (L2)",
        levelTier: "L2",
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