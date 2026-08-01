import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllTickets } from "../data/ticketsData";

const BLUE = "#026cdf";
const LIGHT_BG = "#f5f6f8";
const BORDER_LIGHT = "#e5e7eb";
const TEXT_DARK = "#111827";
const TEXT_GRAY = "#6b7280";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

function PinIcon({ size = 13, color = TEXT_GRAY }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ size = 13, color = TEXT_GRAY }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default function TicketTransfer() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const tickets = getAllTickets();

  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Preselect a ticket if the page was opened via a "Transfer" button
  // that passed ?ticketId=...
  useEffect(() => {
    const preselectId = searchParams.get("ticketId");
    if (preselectId) {
      setSelected(new Set([preselectId]));
    }
  }, [searchParams]);

  const toggleTicket = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTransfer = () => {
    if (selected.size === 0) return;
    // No backend wired up yet — this is where a transfer request would
    // be sent. For now just confirm and go back.
    alert(`${selected.size} ticket(s) marked for transfer.`);
    navigate(-1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isMobile ? "#fff" : LIGHT_BG,
        padding: isMobile ? 0 : "2rem 1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 480,
          minHeight: isMobile ? "100vh" : "auto",
          margin: "0 auto",
          background: "#fff",
          borderRadius: isMobile ? 0 : 12,
          boxShadow: isMobile ? "none" : "0 4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 0" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: TEXT_DARK,
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            TICKET TRANSFER
          </div>
          <div style={{ width: 40, height: 3, background: TEXT_DARK, marginBottom: 16 }} />
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: TEXT_DARK,
              marginBottom: 14,
            }}
          >
            Select Tickets to Transfer
          </div>
        </div>

        {/* Ticket list */}
        <div style={{ flex: 1, padding: "0 20px" }}>
          {tickets.map((ticket) => {
            const isChecked = selected.has(ticket.id);
            return (
              <div
                key={ticket.id}
                onClick={() => toggleTicket(ticket.id)}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "16px 0",
                  borderBottom: `1px solid ${BORDER_LIGHT}`,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleTicket(ticket.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 18,
                    height: 18,
                    marginTop: 2,
                    accentColor: BLUE,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: TEXT_DARK,
                      whiteSpace: "pre-line",
                      lineHeight: 1.35,
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
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 3,
                    }}
                  >
                    <CalendarIcon />
                    <span>{ticket.date}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 10,
                    }}
                  >
                    <PinIcon />
                    <span>{ticket.venue}</span>
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: BLUE,
                        marginBottom: 2,
                      }}
                    >
                      Seat Info
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: TEXT_DARK,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {ticket.seatInfoShort}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: BLUE,
                        marginBottom: 2,
                      }}
                    >
                      Ticket Info
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: TEXT_DARK,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {ticket.ticketInfoShort}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer: count + action + watermark */}
        <div style={{ padding: "16px 20px 20px", borderTop: `1px solid ${BORDER_LIGHT}` }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 13, color: TEXT_GRAY }}>
              {selected.size} selected
            </span>
          </div>
          <button
            disabled={selected.size === 0}
            onClick={handleTransfer}
            style={{
              width: "100%",
              background: selected.size ? BLUE : "#e5e7eb",
              color: selected.size ? "#fff" : "#9ca3af",
              border: "none",
              borderRadius: 8,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: selected.size ? "pointer" : "not-allowed",
              marginBottom: 14,
            }}
          >
            Transfer Selected
          </button>
          <div
            style={{
              textAlign: "center",
              fontSize: 11,
              color: TEXT_GRAY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span>🔒</span>
            <span>ticketmaster.sg</span>
          </div>
        </div>
      </div>
    </div>
  );
}