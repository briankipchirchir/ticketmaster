// src/components/ForeverMobileTicket.tsx

import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";

import foreverPoster from "../assets/forever.jpeg";
import { getForeverTicketById } from "../data/ForeverTicketData";

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#ffffff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    width: "100%",
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#2b2b3d",
    padding: "16px 20px",
  },
  logo: {
    fontWeight: 700,
    fontSize: 20,
    color: "#ffffff",
    letterSpacing: "-0.3px",
    display: "flex",
    alignItems: "center",
  },
  logoAccent: {
    color: "#ffffff",
    background: "#e0313f",
    padding: "1px 6px",
    margin: "0 1px",
    borderRadius: "50% 50% 50% 4px / 60% 60% 40% 40%",
    display: "inline-block",
    lineHeight: 1.1,
    transform: "rotate(-2deg)",
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
    flex: 1,
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
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
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
    color: "#1a1a1a",
    textAlign: "center",
    paddingTop: 60,
    fontSize: 15,
  },
};

// --- Icons matching the BookMyShow e-ticket style (red outline) ---

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#e0313f" strokeWidth="1.8" />
      <path
        d="M12 7v5l3.5 2"
        stroke="#e0313f"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"
        stroke="#e0313f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" stroke="#e0313f" strokeWidth="1.8" />
    </svg>
  );
}

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

          <div style={styles.meta}>
            <span style={styles.iconWrap}>
              <ClockIcon />
            </span>
            <span>{ticket.date}</span>
          </div>

          <div style={styles.meta}>
            <span style={styles.iconWrap}>
              <PinIcon />
            </span>
            <span>
              {ticket.venue}
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
            <div style={styles.gridCellValue}>{ticket.purchaserFullName}</div>
          </div>

          <div style={styles.notice}>
            Screenshot / image format of e-ticket(s) will NOT be accepted.
            <br />
            电子门票一律不接受截图/图片格式。
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForeverMobileTicket;