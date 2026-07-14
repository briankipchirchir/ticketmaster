import { useState, type CSSProperties, type ReactNode } from "react";
import tournamentBadge from "../assets/fifa.png";
import cup from "../assets/cup.png"

// ---------------------------------------------------------------------
// HARDCODED DATA — swap this out for real data once you have a backend.
// ---------------------------------------------------------------------
const MATCH = {
  matchNumber: "M101",
  home: "France",
  away: "Spain",
  dateShort: "14 JUL 26", // shown on the small ticket badge
  dateFull: "14.07.2026",
  time: "2:00 PM",
  venue: "Dallas Stadium",
  tournament: "FIFA World Cup 2026",
  ticketsCount: 4,
  category: "Category 1",
  currency: "USD",
  section: "Section 12",
  row: "Row 8",
  seatsNote: "3 seats side by side",
  approved: true, // false -> "not yet ready" state
};

const SEATS = ["Seat 1", "Seat 2", "Seat 3", "Seat 4"];

// ---------------------------------------------------------------------
// STYLES — plain style objects typed as React.CSSProperties. Literal
// string values (flexDirection, overflow, position, etc.) are pinned
// with `as const` so TS doesn't widen them to `string`.
// ---------------------------------------------------------------------
const colors = {
  bg: "#f3f4f6",
  card: "#ffffff",
  text: "#111827",
  subtext: "#6b7280",
  faint: "#9ca3af",
  accent: "#026cdf",
  badgeBg: "#0b0b0f",
  pending: "#fef3c7",
  pendingText: "#b45309",
  sent: "#dcfce7",
  sentText: "#16a34a",
  border: "#e5e7eb",
};

const phoneFrame: CSSProperties = {
  width: 360,
  minHeight: 720,
  background: colors.bg,
  borderRadius: 36,
  border: "10px solid #111",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column" as const,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  position: "relative" as const,
};

const statusBar: CSSProperties = {
  height: 34,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  fontSize: 12,
  fontWeight: 600,
  color: colors.text,
};

const screenBody: CSSProperties = {
  flex: 1,
  padding: "10px 18px 18px",
  overflowY: "auto" as const,
};

const bottomNav: CSSProperties = {
  height: 64,
  background: "#fff",
  borderTop: `1px solid ${colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  fontSize: 11,
  color: colors.faint,
};

// ---------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------
function StatusBar() {
  return (
    <div style={statusBar}>
      <span>10:57</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {/* Cellular signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="6" width="3" height="5" rx="0.5" fill={colors.text} />
          <rect x="4.5" y="4" width="3" height="7" rx="0.5" fill={colors.text} />
          <rect x="9" y="2" width="3" height="9" rx="0.5" fill={colors.text} />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={colors.text} />
        </svg>
        {/* Wi-Fi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path
            d="M7.5 9.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            fill={colors.text}
          />
          <path
            d="M4.3 6.9a4.6 4.6 0 0 1 6.4 0"
            stroke={colors.text}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1.8 4.3a8.1 8.1 0 0 1 11.4 0"
            stroke={colors.text}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        {/* Battery */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect
            x="0.75"
            y="0.75"
            width="19.5"
            height="10.5"
            rx="2.5"
            stroke={colors.text}
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <rect x="2.5" y="2.5" width="16" height="7" rx="1.3" fill={colors.text} />
          <rect
            x="21.5"
            y="4"
            width="1.6"
            height="4"
            rx="0.8"
            fill={colors.text}
            fillOpacity="0.4"
          />
        </svg>
      </span>
    </div>
  );
}

type NavKey = "tickets" | "transactions" | "more";

interface BottomNavProps {
  active: NavKey;
}

function BottomNav({ active }: BottomNavProps) {
  const items: { key: NavKey; label: string; icon: string }[] = [
    { key: "tickets", label: "My tickets", icon: "🎟️" },
    { key: "transactions", label: "Transactions", icon: "⇄" },
    { key: "more", label: "More", icon: "≡" },
  ];
  return (
    <div style={bottomNav}>
      {items.map((it) => (
        <div
          key={it.key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            color: active === it.key ? colors.text : colors.faint,
            fontWeight: active === it.key ? 700 : 500,
          }}
        >
          <span style={{ fontSize: 16 }}>{it.icon}</span>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// --- Screen 1: My ticket(s) list -------------------------------------
interface TicketListScreenProps {
  onOpenTicket: () => void;
}

function TicketListScreen({ onOpenTicket }: TicketListScreenProps) {
  return (
    <>
      <StatusBar />
      <div style={screenBody}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 12px" }}>
          My ticket(s)
        </h1>

        <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                borderBottom: `2px solid ${colors.text}`,
                paddingBottom: 4,
              }}
            >
              Upcoming match(es)
            </span>
            <span
              style={{
                background: colors.text,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                borderRadius: "999px",
                width: 18,
                height: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: colors.faint }}>
            <span style={{ fontSize: 14 }}>Past match(es)</span>
            <span
              style={{
                background: "#e5e7eb",
                color: colors.subtext,
                fontSize: 11,
                fontWeight: 700,
                borderRadius: "999px",
                width: 18,
                height: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </span>
          </div>
        </div>

        {/* App promo banner, mirrors the reference screenshot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: colors.card,
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 14,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: colors.badgeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            <img
  src={cup}
  alt="Kipchirchir Cup"
  style={{
    width: 34,
    height: 34,
    borderRadius: 8,
    objectFit: "cover",
  }}
/>
          </div>
          <div>
           <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>
              {MATCH.tournament}
              <sup style={{ fontSize: 8, fontWeight: 700, marginLeft: 1 }}>TM</sup>{" "}
              App
            </p>
            <p style={{ margin: 0, fontSize: 11, color: colors.subtext }}>
              Your tournament companion to every match
            </p>
          </div>
        </div>

        {/* Ticket card */}
        <div
          onClick={onOpenTicket}
          style={{
            background: colors.card,
            borderRadius: 14,
            overflow: "hidden",
            cursor: "pointer",
            border: `1px solid ${colors.border}`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              position: "relative",
              height: 70,
            }}
          >
            <img
              src={tournamentBadge}
              alt="Kipchirchir Cup 2026"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                marginLeft: "auto",
                textAlign: "right",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                textShadow: "0 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              {MATCH.dateShort.split(" ")[0]}
              <br />
              {MATCH.dateShort.split(" ")[1]}
              <br />
              {MATCH.dateShort.split(" ")[2]}
            </div>
          </div>
          <div style={{ padding: "10px 16px 14px" }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
              {MATCH.matchNumber} {MATCH.home} vs {MATCH.away}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 12, color: colors.subtext }}>{MATCH.venue}</span>
              <span style={{ fontSize: 12, color: colors.subtext }}>
                {MATCH.ticketsCount} 🎟 ›
              </span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="tickets" />
    </>
  );
}

// --- Screen 2: Ticket detail ------------------------------------------
interface TicketDetailScreenProps {
  onBack: () => void;
  onViewTicket: () => void;
  onSend: () => void;
}

function TicketDetailScreen({ onBack, onViewTicket, onSend }: TicketDetailScreenProps) {
  return (
    <>
      <StatusBar />
      <div style={screenBody}>
        <BackButton onClick={onBack} />

        <div
          style={{
            background: colors.card,
            borderRadius: 14,
            border: `1px solid ${colors.border}`,
            padding: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, maxWidth: 240 }}>
              {MATCH.tournament} - Match 102 - {MATCH.home.toUpperCase()} VS {MATCH.away.toUpperCase()}
            </h2>
            <img
              src={tournamentBadge}
              alt="Kipchirchir Cup 2026"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                border: `1px solid ${colors.border}`,
                flexShrink: 0,
              }}
            />
          </div>

                <p style={{ margin: "14px 0 4px", fontSize: 13, color: colors.subtext, display: "flex", alignItems: "center", gap: 6 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {MATCH.dateFull}
          </p>
             <p style={{ margin: "4px 0 16px", fontSize: 13, color: colors.subtext, display: "flex", alignItems: "center", gap: 6 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {MATCH.venue}
          </p>

          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 14 }}>
            {MATCH.ticketsCount} tickets - {MATCH.category} - {MATCH.currency}
          </p>

          <div
            style={{
              background: "#f9fafb",
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 20,
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
              {MATCH.section} - {MATCH.row}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: colors.subtext }}>
              {MATCH.seatsNote}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={onViewTicket}
              style={{
                background: colors.accent,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              View ticket
            </button>
            <button
              onClick={onSend}
              style={{
                background: "#fff",
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Send to someone else
            </button>
          </div>
        </div>
      </div>
      <BottomNav active="tickets" />
    </>
  );
}

// --- Screen 3: Ticket not yet ready ------------------------------------
interface TicketNotReadyScreenProps {
  onBack: () => void;
}

function TicketNotReadyScreen({ onBack }: TicketNotReadyScreenProps) {
  return (
    <>
      <StatusBar />
      <div style={screenBody}>
        <BackButton onClick={onBack} />

        <div
          style={{
            background: colors.card,
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderLeft: `4px solid ${colors.accent}`,
              borderRight: `4px solid ${colors.accent}`,
              padding: "18px 16px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, letterSpacing: 0.3 }}>
              THE TICKET IS NOT YET READY
            </p>
            <p style={{ margin: "4px 0 16px", fontSize: 12, color: colors.subtext }}>
              It will be activated on the day of the match
            </p>
            <div
              
            />
          </div>

          <div style={{ padding: "18px 16px 22px", textAlign: "center" }}>
            <img
              src={tournamentBadge}
              alt="Kipchirchir Cup 2026"
              style={{
                width: 90,
                height: 90,
                borderRadius: 12,
                objectFit: "cover",
                marginBottom: 14,
              }}
            />
            <p style={{ margin: "6px 0", fontWeight: 700, fontSize: 15 }}>
              {MATCH.matchNumber} {MATCH.home} vs {MATCH.away}
            </p>
                 <p style={{ margin: "14px 0 4px", fontSize: 13, color: colors.subtext, display: "flex", alignItems: "center", gap: 6 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {MATCH.dateFull}
          </p>
            <p style={{ margin: "4px 0 16px", fontSize: 13, color: colors.subtext, display: "flex", alignItems: "center", gap: 6 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {MATCH.venue}
          </p>
          </div>
        </div>
      </div>
      <BottomNav active="tickets" />
    </>
  );
}

// --- Screen 4: Send tickets to someone else -----------------------------
interface SendTicketsScreenProps {
  onBack: () => void;
}

function SendTicketsScreen({ onBack }: SendTicketsScreenProps) {
  const [checked, setChecked] = useState<boolean[]>(SEATS.map(() => true));
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (i: number) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <StatusBar />
      <div style={screenBody}>
        <BackButton onClick={onBack} />

        <p style={{ fontSize: 13, color: colors.subtext, margin: "0 0 16px" }}>
          You can send tickets to someone else directly within the app by
          following the steps below.
        </p>

        <div
          style={{
            background: colors.card,
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            padding: "12px 14px",
            marginBottom: 16,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: colors.text,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            4
          </span>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>
              {MATCH.matchNumber} {MATCH.home} vs {MATCH.away}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: colors.subtext }}>
              2026-07-15, 04:00 PM · {MATCH.venue}
            </p>
          </div>
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: colors.faint, letterSpacing: 0.4, margin: "0 0 8px" }}>
          SELECT SEATS TO SEND
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
          {SEATS.map((s, i) => (
            <label
              key={s}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {s}
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                style={{ width: 16, height: 16 }}
              />
            </label>
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: colors.faint, letterSpacing: 0.4, margin: "0 0 8px" }}>
          STEPS TO FOLLOW
        </p>

        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13 }}>
            1. Ticket recipient*
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient's email address"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              fontSize: 13,
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13 }}>
            2. Message
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message (optional)"
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              fontSize: 13,
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        <button
          disabled={!email || !checked.some(Boolean)}
          onClick={() => setSent(true)}
          style={{
            width: "100%",
            background: !email || !checked.some(Boolean) ? "#d1d5db" : colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "13px 0",
            fontWeight: 700,
            fontSize: 14,
            cursor: !email || !checked.some(Boolean) ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>

        {sent && (
          <p style={{ marginTop: 12, fontSize: 12, color: colors.sentText, fontWeight: 700, textAlign: "center" }}>
            Tickets sent to {email} ✓
          </p>
        )}
      </div>
      <BottomNav active="tickets" />
    </>
  );
}

// --- Small shared back button --------------------------------------------
interface BackButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

function BackButton({ onClick, children = "‹ Back" }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        color: colors.accent,
        fontWeight: 600,
        fontSize: 13,
        padding: 0,
        marginBottom: 14,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

// -----------------------------------------------------------------------
// Root component — swaps between the 4 screens. In a real app each of
// these would likely be its own route; here they're one file so you can
// see + tweak the whole flow easily.
// -----------------------------------------------------------------------
type Screen = "list" | "detail" | "notReady" | "send";

export default function KipchirchirCupTickets() {
  const [screen, setScreen] = useState<Screen>("list");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        gap: 16,
      }}
    >
      <div style={phoneFrame}>
        {screen === "list" && <TicketListScreen onOpenTicket={() => setScreen("detail")} />}
        {screen === "detail" && (
          <TicketDetailScreen
            onBack={() => setScreen("list")}
            onViewTicket={() => setScreen(MATCH.approved ? "notReady" : "notReady")}
            onSend={() => setScreen("send")}
          />
        )}
        {screen === "notReady" && <TicketNotReadyScreen onBack={() => setScreen("detail")} />}
        {screen === "send" && <SendTicketsScreen onBack={() => setScreen("detail")} />}
      </div>
      <p style={{ color: "#9ca3af", fontSize: 12 }}>
        Tap the ticket card, then "View ticket" or "Send to someone else" to move through the flow.
      </p>
    </div>
  );
}