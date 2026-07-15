import { useState } from "react";
import kualImg from "../assets/kual.jpeg";

const BG_DARK = "#0d0d0f";
const CARD_DARK = "#1c1c1e";
const CARD_DARKER = "#151517";
const BORDER_DARK = "#2c2c2e";
const TEXT_WHITE = "#ffffff";
const TEXT_GRAY = "#8e8e93";

type TicketStatus = "upcoming" | "expired" | "transferred";

interface TicketOrder {
  id: string;
  eventImage: string;
  eventName: string;
  dateLabel: string;
  venue: string;
  status: TicketStatus;
  ticketType: string; // e.g. "STANDING", "SEATED"
  section: string;
  row: string;
  seat: string;
  entrance: string;
}

const MOCK_TICKETS: TicketOrder[] = [
  {
    id: "1",
    eventImage: kualImg,
    eventName: "The Neighbourhood - THE WOURLD TOUR",
    dateLabel: "Thu, Jul 16, 8:00 PM",
    venue: "Mega Star Arena KL, Mega star aren...",
    status: "upcoming",
    ticketType: "STANDING",
    section: "PRIORITY STANDING",
    row: "-",
    seat: "-",
    entrance: "A",
  },
  {
    id: "2",
    eventImage: kualImg,
    eventName: "The Neighbourhood - THE WOURLD TOUR",
    dateLabel: "Thu, Jul 16, 8:00 PM",
    venue: "Mega Star Arena KL, Mega star aren...",
    status: "transferred",
    ticketType: "STANDING",
    section: "GENERAL STANDING",
    row: "-",
    seat: "-",
    entrance: "A",
  },
   {
    id: "3",
    eventImage: kualImg,
    eventName: "The Neighbourhood - THE WOURLD TOUR",
    dateLabel: "Thu, Jul 16, 8:00 PM",
    venue: "Mega Star Arena KL, Mega star aren...",
    status: "transferred",
    ticketType: "STANDING",
    section: "PRIORITY STANDING",
    row: "-",
    seat: "-",
    entrance: "A",
  },
];

const TABS: { key: TicketStatus; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "expired", label: "Expired" },
  { key: "transferred", label: "Transferred" },
];

export default function Singapore() {
  const [activeTab, setActiveTab] = useState<TicketStatus>("upcoming");

  const counts: Record<TicketStatus, number> = {
    upcoming: MOCK_TICKETS.filter((t) => t.status === "upcoming").length,
    expired: MOCK_TICKETS.filter((t) => t.status === "expired").length,
    transferred: MOCK_TICKETS.filter((t) => t.status === "transferred").length,
  };

  const visibleTickets = MOCK_TICKETS.filter((t) => t.status === activeTab);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: BG_DARK,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/*
        Media queries can't be expressed with inline styles, so the
        breakpoint-dependent rules (tab sizing/spacing, title size,
        horizontal padding, image size) live here. Everything else
        stays as inline styles for the dark theme colors.
      */}
      <style>{`
        .rn-container {
          max-width: 480px;
          margin: 0 auto;
          padding-bottom: 40px;
        }
        .rn-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid ${BORDER_DARK};
        }
        .rn-title {
          padding: 24px 20px 0;
        }
        .rn-title h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: ${TEXT_WHITE};
        }
        .rn-tabs {
          display: flex;
          gap: 24px;
          padding: 18px 20px 0;
          border-bottom: 1px solid ${BORDER_DARK};
          overflow-x: auto;
          scrollbar-width: none;
        }
        .rn-tabs::-webkit-scrollbar {
          display: none;
        }
        .rn-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 0 12px;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .rn-tab-label {
          font-size: 15px;
        }
        .rn-tab-badge {
          font-size: 12px;
          font-weight: 700;
          border-radius: 10px;
          padding: 1px 8px;
          min-width: 18px;
          text-align: center;
        }
        .rn-list {
          padding: 20px;
        }
        .rn-card {
          background: ${CARD_DARKER};
          border: 1px solid ${BORDER_DARK};
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .rn-summary-row {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
        }
        .rn-event-img {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .rn-event-info {
          flex: 1;
          min-width: 0;
        }
        .rn-event-name {
          font-size: 15px;
          font-weight: 700;
          color: ${TEXT_WHITE};
          line-height: 1.3;
          margin-bottom: 6px;
          overflow-wrap: break-word;
        }
        .rn-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: ${TEXT_GRAY};
          margin-bottom: 3px;
          min-width: 0;
        }
        .rn-meta-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }
        .rn-transfer-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: ${CARD_DARK};
          border: 1px solid ${BORDER_DARK};
          border-radius: 8px;
          padding: 10px 0;
          color: ${TEXT_WHITE};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 14px;
        }
        .rn-ticket-block {
          border: 1px solid ${BORDER_DARK};
          border-radius: 8px;
          overflow: hidden;
        }
        .rn-ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: ${CARD_DARK};
          padding: 10px 14px;
          gap: 8px;
        }
        .rn-ticket-header-title {
          font-size: 14px;
          font-weight: 700;
          color: ${TEXT_WHITE};
        }
        .rn-ticket-header-type {
          font-size: 11px;
          font-weight: 700;
          color: ${TEXT_GRAY};
          letter-spacing: 0.5px;
          text-align: right;
        }
        .rn-ticket-body {
          padding: 14px;
        }
        .rn-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 16px;
        }
        .rn-detail-label {
          font-size: 11px;
          font-weight: 600;
          color: ${TEXT_GRAY};
          margin-bottom: 4px;
        }
        .rn-detail-value {
          font-size: 14px;
          font-weight: 700;
          color: ${TEXT_WHITE};
          overflow-wrap: break-word;
        }
        .rn-additional {
          border-top: 1px solid ${BORDER_DARK};
          padding-top: 12px;
        }
        .rn-additional-title {
          font-size: 10px;
          font-weight: 700;
          color: ${TEXT_GRAY};
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .rn-empty {
          text-align: center;
          color: ${TEXT_GRAY};
          font-size: 14px;
          padding: 60px 0;
        }

        /* ---- Narrow phones (< 380px) ---- */
        @media (max-width: 380px) {
          .rn-topbar { padding: 14px 16px; }
          .rn-title { padding: 20px 16px 0; }
          .rn-title h1 { font-size: 24px; }
          .rn-tabs { gap: 14px; padding: 14px 16px 0; }
          .rn-tab-label { font-size: 13px; }
          .rn-tab-badge { font-size: 11px; padding: 1px 6px; }
          .rn-list { padding: 14px; }
          .rn-card { padding: 12px; }
          .rn-event-name { font-size: 14px; }
          .rn-event-img { width: 38px; height: 38px; }
          .rn-detail-grid { gap: 4px; }
          .rn-ticket-header-title { font-size: 13px; }
          .rn-ticket-header-type { font-size: 10px; }
        }

        /* ---- Very narrow phones (< 320px) ---- */
        @media (max-width: 320px) {
          .rn-tabs { gap: 10px; }
          .rn-tab-label { font-size: 12px; }
          .rn-detail-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>

      <div className="rn-container">
        {/* ---------------- TOP BAR ---------------- */}
        <div className="rn-topbar">
          {/* ROW/NE stacked wordmark logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.85,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: TEXT_WHITE,
                letterSpacing: 1,
              }}
            >
              ROW
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: TEXT_WHITE,
                letterSpacing: 1,
                alignSelf: "flex-end",
                marginTop: -6,
              }}
            >
              NE
            </span>
          </div>
          <button
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              color: TEXT_WHITE,
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
              flexShrink: 0,
            }}
          >
            ☰
          </button>
        </div>

        {/* ---------------- TITLE ---------------- */}
        <div className="rn-title">
          <h1>My Tickets</h1>
        </div>

        {/* ---------------- TABS ---------------- */}
        <div className="rn-tabs">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="rn-tab"
                style={{
                  borderBottom: isActive
                    ? `2px solid ${TEXT_WHITE}`
                    : "2px solid transparent",
                }}
              >
                <span
                  className="rn-tab-label"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? TEXT_WHITE : TEXT_GRAY,
                  }}
                >
                  {tab.label}
                </span>
                <span
                  className="rn-tab-badge"
                  style={{
                    color: isActive ? BG_DARK : TEXT_GRAY,
                    background: isActive ? TEXT_WHITE : CARD_DARK,
                  }}
                >
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- TICKET LIST ---------------- */}
        <div className="rn-list">
          {visibleTickets.length === 0 ? (
            <div className="rn-empty">No {activeTab} tickets.</div>
          ) : (
            visibleTickets.map((ticket) => (
              <div key={ticket.id} className="rn-card">
                {/* Event summary row */}
                <div className="rn-summary-row">
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventName}
                    className="rn-event-img"
                  />
                  <div className="rn-event-info">
                    <div className="rn-event-name">{ticket.eventName}</div>
                    <div className="rn-meta-row">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <span className="rn-meta-text">{ticket.dateLabel}</span>
                    </div>
                    <div className="rn-meta-row">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="rn-meta-text">{ticket.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Transfer button */}
                <button className="rn-transfer-btn">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="m16 3 4 4-4 4" />
                    <path d="M20 7H4" />
                    <path d="m8 21-4-4 4-4" />
                    <path d="M4 17h16" />
                  </svg>
                  <span>Transfer</span>
                </button>

                {/* Ticket details block */}
                <div className="rn-ticket-block">
                  <div className="rn-ticket-header">
                    <span className="rn-ticket-header-title">Ticket</span>
                    <span className="rn-ticket-header-type">
                      {ticket.ticketType}
                    </span>
                  </div>

                  <div className="rn-ticket-body">
                    <div className="rn-detail-grid">
                      <div>
                        <div className="rn-detail-label">Section</div>
                        <div className="rn-detail-value">
                          {ticket.section}
                        </div>
                      </div>
                      <div>
                        <div className="rn-detail-label">Row</div>
                        <div className="rn-detail-value">{ticket.row}</div>
                      </div>
                      <div>
                        <div className="rn-detail-label">Seat</div>
                        <div className="rn-detail-value">{ticket.seat}</div>
                      </div>
                    </div>

                    <div className="rn-additional">
                      <div className="rn-additional-title">
                        ADDITIONAL DETAILS
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: TEXT_GRAY,
                          marginBottom: 2,
                        }}
                      >
                        Entrance
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: TEXT_WHITE,
                        }}
                      >
                        {ticket.entrance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}