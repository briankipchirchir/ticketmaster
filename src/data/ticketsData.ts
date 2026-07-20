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

const ATTENDEE_NAME = "Brian Kip";

export const ORDERS: Order[] = [
  {
    orderNo: "BK",
    orderTime: "20-04-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "vip-1",
        eventName: "EXO PLANET #6 - EXhOrizon in SINGAPORE",
        date: "24 Jul 2026 (Fri.) 08:00 pm",
        venue: "Singapore Indoor Stadium",
        seatInfoShort: "STANDING PEN C\nNo.0031",
        ticketInfoShort: "VIP STANDING PEN C\nVIP $368.00",
        bookingFee: "$10.00",
        subtotal: "$378.00",
        qty: 1,
        badgeLabel: "VIP Standing",
        price: "$368.00",
        ticketCategory: "VIP STANDING PEN C",
        section: "STANDING PEN C",
        ticketInfoLines: ["Queue No. 0031"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-04-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "vip-2",
        eventName: "EXO PLANET #6 - EXhOrizon in SINGAPORE",
        date: "24 Jul 2026 (Fri.) 08:00 pm",
        venue: "Singapore Indoor Stadium",
        seatInfoShort: "STANDING PEN C\nNo.0032",
        ticketInfoShort: "VIP STANDING PEN C\nVIP $368.00",
        bookingFee: "$10.00",
        subtotal: "$378.00",
        qty: 1,
        badgeLabel: "VIP Standing",
        price: "$368.00",
        ticketCategory: "VIP STANDING PEN C",
        section: "STANDING PEN C",
        ticketInfoLines: ["Queue No. 0032"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-04-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "vip-3",
        eventName: "EXO PLANET #6 - EXhOrizon in SINGAPORE",
        date: "24 Jul 2026 (Fri.) 08:00 pm",
        venue: "Singapore Indoor Stadium",
        seatInfoShort: "STANDING PEN C\nNo.0033",
        ticketInfoShort: "VIP STANDING PEN C\nVIP $368.00",
        bookingFee: "$10.00",
        subtotal: "$378.00",
        qty: 1,
        badgeLabel: "VIP Standing",
        price: "$368.00",
        ticketCategory: "VIP STANDING PEN C",
        section: "STANDING PEN C",
        ticketInfoLines: ["Queue No. 0033"],
        gateDoor: "PREMIER WEST (L1)",
        levelTier: "L1",
        attendeeName: ATTENDEE_NAME,
      },
    ],
  },
  {
    orderNo: "BK",
    orderTime: "20-04-2026\n12:12pm",
    status: "E-ticket Available",
    items: [
      {
        id: "cat1-1",
        eventName: "EXO PLANET #6 - EXhOrizon in SINGAPORE",
        date: "24 Jul 2026 (Fri.) 08:00 pm",
        venue: "Singapore Indoor Stadium",
        seatInfoShort: "STANDING PEN D\nNo.0061",
        ticketInfoShort: "CAT 1 STANDING PEN D\n$338.00",
        bookingFee: "$10.00",
        subtotal: "$348.00",
        qty: 1,
        badgeLabel: "Standard",
        price: "$338.00",
        ticketCategory: "CAT 1 STANDING PEN D",
        section: "STANDING PEN D",
        ticketInfoLines: ["Queue No. 0061"],
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