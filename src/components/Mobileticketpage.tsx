import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findTicketById } from "../data/ticketsData";

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

function PinIcon({ size = 14, color = TEXT_DARK }: { size?: number; color?: string }) {
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

function CalendarIcon({ size = 14, color = TEXT_DARK }: { size?: number; color?: string }) {
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

export default function MobileTicketPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const ticket = findTicketById(ticketId);
  const isMobile = useIsMobile();

  if (!ticket) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: LIGHT_BG,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_DARK }}>
          Ticket not found
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: TEXT_DARK,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isMobile ? "#fff" : LIGHT_BG,
        padding: isMobile ? 0 : "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 420,
          minHeight: isMobile ? "100vh" : "auto",
          margin: "0 auto",
          background: "#fff",
          borderRadius: isMobile ? 0 : 12,
          boxShadow: isMobile ? "none" : "0 4px 20px rgba(0,0,0,0.08)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Back link */}
        <div style={{ padding: "16px 20px 0" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              color: BLUE,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
              marginBottom: 8,
            }}
          >
            ← Back
          </button>
        </div>

        {/* Header banner */}
        <div style={{ padding: "4px 20px 0" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: TEXT_DARK,
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            MOBILE TICKETS
          </div>
          <div style={{ width: 40, height: 3, background: TEXT_DARK, marginBottom: 14 }} />
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: TEXT_DARK,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Each Mobile Ticket can only be used once. Please keep your
            tickets safe.
          </div>
        </div>

        {/* Repeating brand banner */}
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            background: "linear-gradient(90deg, #4c1d95, #026cdf)",
            padding: "6px 0",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                fontStyle: "italic",
                marginRight: 20,
              }}
            >
              ticketmaster
            </span>
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: TEXT_DARK,
              marginBottom: 10,
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
              color: TEXT_DARK,
              marginBottom: 4,
            }}
          >
            <PinIcon />
            <span>{ticket.venue}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: TEXT_DARK,
              marginBottom: 16,
            }}
          >
            <CalendarIcon />
            <span>{ticket.date}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 0",
              borderTop: `1px solid ${BORDER_LIGHT}`,
              borderBottom: `1px solid ${BORDER_LIGHT}`,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: BLUE,
                display: "inline-block",
              }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
                {ticket.badgeLabel}
              </div>
              <div style={{ fontSize: 13, color: TEXT_DARK }}>{ticket.price}</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: BLUE,
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              TICKET CATEGORY
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
              {ticket.ticketCategory}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                SECTION
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
                {ticket.section}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                TICKET INFO
              </div>
              {ticket.ticketInfoLines.map((line, i) => (
                <div
                  key={i}
                  style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                GATE / DOOR
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
                {ticket.gateDoor}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                LEVEL / TIER
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
                {ticket.levelTier}
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${BORDER_LIGHT}`, paddingTop: 14 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: TEXT_GRAY,
                marginBottom: 4,
              }}
            >
              Attendee Name
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
              {ticket.attendeeName}
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{
              width: "100%",
              marginTop: 20,
              padding: "12px 0",
              background: TEXT_DARK,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}