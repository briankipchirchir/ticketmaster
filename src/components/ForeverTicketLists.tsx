// src/components/ForeverTicketsList.tsx

import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { FOREVER_TICKETS } from "../data/ForeverTicketData";
import foreverPoster from "../assets/forever.jpeg";

const styles: Record<string, CSSProperties> = {
  page: {
    padding: "2rem",
    background: "#f4f4f6",
    minHeight: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  heading: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },
  button: {
    display: "block",
    width: "100%",
    background: "#e0313f",
    color: "#ffffff",
    border: "none",
    padding: "14px 0",
    fontSize: 13.5,
    fontWeight: 700,
    letterSpacing: "0.5px",
    cursor: "pointer",
  },
  cardTop: {
    display: "flex",
    gap: 12,
    padding: "18px 18px 0 18px",
  },
  poster: {
    width: 64,
    height: 64,
    objectFit: "cover",
    borderRadius: 6,
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a1a1a",
    lineHeight: 1.35,
  },
  body: {
    padding: "14px 18px 18px 18px",
  },
  metaRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontSize: 13.5,
    color: "#333",
    marginBottom: 8,
  },
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  price: {
    fontSize: 13.5,
    fontWeight: 700,
    color: "#1a1a1a",
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

// Formats a Date (or date string) as "Fri, 07 Aug 2026 08:00 pm"
function formatTicketDateTime(dateInput: string | Date) {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const weekday = d.toLocaleDateString("en-GB", { weekday: "short" });
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleDateString("en-GB", { month: "short" });
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${weekday}, ${day} ${month} ${year} ${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${ampm}`;
}

function ForeverTicketsList() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>F+FOREVER Tickets</h2>
      <div style={styles.grid}>
        {FOREVER_TICKETS.map((t) => (
          <div key={t.id} style={styles.card}>
            <button
              style={styles.button}
              onClick={() => navigate(`/forever-mobile-ticket/${t.id}`)}
            >
              VIEW MOBILE TICKET
            </button>

            <div style={styles.cardTop}>
              <img src={foreverPoster} alt={t.eventName} style={styles.poster} />
              <div style={styles.title}>{t.eventName}</div>
            </div>

            <div style={styles.body}>
              <div style={styles.metaRow}>
                <span style={styles.iconWrap}>
                  <ClockIcon />
                </span>
                <span>{formatTicketDateTime(t.date)}</span>
              </div>
              <div style={styles.metaRow}>
                <span style={styles.iconWrap}>
                  <PinIcon />
                </span>
                <span>{t.venue}</span>
              </div>
              <div style={styles.metaRow}>
                <span>🎟️</span>
                <span>
                  Section: {t.section} · Row {t.row} · Seat {t.seat}
                </span>
              </div>
              <div style={styles.metaRow}>
                <span>📺</span>
                <span>
                  {t.category} / {t.ticketType}
                </span>
              </div>
              <div style={styles.price}>
                MYR {t.priceMYR.toLocaleString()}.00
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForeverTicketsList;