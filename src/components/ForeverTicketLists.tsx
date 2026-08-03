// src/components/ForeverTicketsList.tsx
//
// Standalone admin-facing index page listing all F+FOREVER tickets.
// Links out to /forever-mobile-ticket/:ticketId (ForeverMobileTicket.tsx).
// Does not touch AdminPage.tsx, Mobileticketpage.tsx, or ticketsData.ts.

import { useNavigate } from "react-router-dom";
import { FOREVER_TICKETS } from "../data/ForeverTicketData";

function ForeverTicketsList() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>F+FOREVER Tickets</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {FOREVER_TICKETS.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/forever-mobile-ticket/${t.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>{t.category}</p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
              {t.date}
            </p>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#888" }}>
              Section {t.section} · Row {t.row} · Seat {t.seat}
            </p>
            <p style={{ margin: "4px 0", fontWeight: 600 }}>
              MYR {t.priceMYR.toLocaleString()}.00
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForeverTicketsList;