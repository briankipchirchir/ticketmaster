// src/components/ForeverMobileTicket.tsx
//
// Standalone mobile-ticket view for F+FOREVER tickets, styled to match
// the BookMyShow e-ticket card layout. Uses inline styles only (no
// external CSS file needed). Reads only from data/foreverTicketsData.ts —
// does not touch Mobileticketpage.tsx, MyTickets.tsx, or the existing
// Order/ticketsData.ts.

import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";

// If forever.jpeg already lives in src/assets, this import will resolve.
// Adjust the path if your assets folder is elsewhere.
import foreverPoster from "../assets/forever.jpeg";
import { getForeverTicketById } from "../data/ForeverTicketData";

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0e0e12",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "32px 16px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#2b2b3d",
    padding: "14px 18px",
  },
  logo: {
    fontWeight: 700,
    fontSize: 20,
    color: "#ffffff",
  },
  logoAccent: {
    color: "#e0313f",
  },
  priceTag: {
    textAlign: "right",
    color: "#ffffff",
    fontSize: 13,
  },
  priceTagStrong: {
    display: "block",
    fontSize: 15,
  },
  body: {
    padding: 20,
  },
  top: {
    display: "flex",
    gap: 14,
    marginBottom: 16,
  },
  poster: {
    width: 90,
    height: 90,
    objectFit: "cover",
    borderRadius: 6,
    flexShrink: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1a1a1a",
    lineHeight: 1.3,
  },
  meta: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    margin: "10px 0",
    fontSize: 14,
    color: "#333",
  },
  metaLink: {
    color: "#e0313f",
    textDecoration: "none",
    fontSize: 13,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    margin: "18px 0",
    paddingTop: 16,
    borderTop: "1px solid #eee",
  },
  gridCellLabel: {
    fontSize: 13,
    color: "#8a8a8a",
    marginBottom: 4,
  },
  gridCellValue: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  purchaser: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #eee",
    fontSize: 13,
  },
  notice: {
    marginTop: 16,
    fontSize: 12,
    color: "#444",
    lineHeight: 1.5,
  },
  notFound: {
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 60,
    fontSize: 15,
  },
};

function ForeverMobileTicket() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const ticket = ticketId ? getForeverTicketById(ticketId) : undefined;

  if (!ticket) {
    return (
      <div style={styles.page}>
        <p style={styles.notFound}>Ticket not found.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            book<span style={styles.logoAccent}>my</span>show
          </div>
          <div style={styles.priceTag}>
            E-Ticket
            <strong style={styles.priceTagStrong}>
              MYR {ticket.priceMYR.toLocaleString()}.00
            </strong>
          </div>
        </div>

        <div style={styles.body}>
          <div style={styles.top}>
            <img
              src={foreverPoster}
              alt={ticket.eventName}
              style={styles.poster}
            />
            <div style={styles.title}>{ticket.eventName}</div>
          </div>

          <div style={styles.meta}>🕐 {ticket.date}</div>
          <div style={styles.meta}>
            <span>
              📍 {ticket.venue}
              <br />
              <a
                href={ticket.venueMapUrl}
                target="_blank"
                rel="noreferrer"
                style={styles.metaLink}
              >
                View map
              </a>
            </span>
          </div>

          <div style={styles.grid}>
            <div>
              <div style={styles.gridCellLabel}>Category</div>
              <div style={styles.gridCellValue}>{ticket.category}</div>
            </div>
            <div>
              <div style={styles.gridCellLabel}>Entrance</div>
              <div style={styles.gridCellValue}>{ticket.entrance}</div>
            </div>
            <div>
              <div style={styles.gridCellLabel}>Ticket Type</div>
              <div style={styles.gridCellValue}>{ticket.ticketType}</div>
            </div>
          </div>

          <div style={styles.grid}>
            <div>
              <div style={styles.gridCellLabel}>Section</div>
              <div style={styles.gridCellValue}>{ticket.section}</div>
            </div>
            <div>
              <div style={styles.gridCellLabel}>Row</div>
              <div style={styles.gridCellValue}>{ticket.row}</div>
            </div>
            <div>
              <div style={styles.gridCellLabel}>Seat</div>
              <div style={styles.gridCellValue}>{ticket.seat}</div>
            </div>
          </div>

          <div style={styles.purchaser}>
            <div style={styles.gridCellLabel}>Purchaser Full Name</div>
            <div style={styles.gridCellValue}>
              {ticket.purchaserFullName}
            </div>
          </div>

          <div style={styles.notice}>
            Screenshot / image format of e-ticket(s) will NOT be accepted.
            <br />
            电子门票一律不接受截图 / 图片格式。
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForeverMobileTicket;