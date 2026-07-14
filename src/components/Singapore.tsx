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
    section: "GENERAL STANDING",
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
      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
        {/* ---------------- TOP BAR ---------------- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 20px",
            borderBottom: `1px solid ${BORDER_DARK}`,
          }}
        >
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
            }}
          >
            ☰
          </button>
        </div>

        {/* ---------------- TITLE ---------------- */}
        <div style={{ padding: "24px 20px 0" }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: TEXT_WHITE,
            }}
          >
            My Tickets
          </h1>
        </div>

        {/* ---------------- TABS ---------------- */}
        <div
          style={{
            display: "flex",
            gap: 24,
            padding: "18px 20px 0",
            borderBottom: `1px solid ${BORDER_DARK}`,
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0 12px",
                  borderBottom: isActive
                    ? `2px solid ${TEXT_WHITE}`
                    : "2px solid transparent",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? TEXT_WHITE : TEXT_GRAY,
                  }}
                >
                  {tab.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? BG_DARK : TEXT_GRAY,
                    background: isActive ? TEXT_WHITE : CARD_DARK,
                    borderRadius: 10,
                    padding: "1px 8px",
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- TICKET LIST ---------------- */}
        <div style={{ padding: "20px" }}>
          {visibleTickets.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: TEXT_GRAY,
                fontSize: 14,
                padding: "60px 0",
              }}
            >
              No {activeTab} tickets.
            </div>
          ) : (
            visibleTickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{
                  background: CARD_DARKER,
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                {/* Event summary row */}
                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventName}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: TEXT_WHITE,
                        lineHeight: 1.3,
                        marginBottom: 6,
                      }}
                    >
                      {ticket.eventName}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        color: TEXT_GRAY,
                        marginBottom: 3,
                      }}
                    >
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
                      <span>{ticket.dateLabel}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        color: TEXT_GRAY,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
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
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ticket.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transfer button */}
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: CARD_DARK,
                    border: `1px solid ${BORDER_DARK}`,
                    borderRadius: 8,
                    padding: "10px 0",
                    color: TEXT_WHITE,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: 14,
                  }}
                >
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
                <div
                  style={{
                    border: `1px solid ${BORDER_DARK}`,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: CARD_DARK,
                      padding: "10px 14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: TEXT_WHITE,
                      }}
                    >
                      Ticket
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: TEXT_GRAY,
                        letterSpacing: 0.5,
                      }}
                    >
                      {ticket.ticketType}
                    </span>
                  </div>

                  <div style={{ padding: "14px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: TEXT_GRAY,
                            marginBottom: 4,
                          }}
                        >
                          Section
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: TEXT_WHITE,
                          }}
                        >
                          {ticket.section}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: TEXT_GRAY,
                            marginBottom: 4,
                          }}
                        >
                          Row
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: TEXT_WHITE,
                          }}
                        >
                          {ticket.row}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: TEXT_GRAY,
                            marginBottom: 4,
                          }}
                        >
                          Seat
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: TEXT_WHITE,
                          }}
                        >
                          {ticket.seat}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: `1px solid ${BORDER_DARK}`,
                        paddingTop: 12,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: TEXT_GRAY,
                          letterSpacing: 0.5,
                          marginBottom: 6,
                        }}
                      >
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