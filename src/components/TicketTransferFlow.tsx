import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BLUE = "#026cdf";
const BG_DARK = "#0d0d0f";
const CARD_DARK = "#1c1c1e";
const BORDER_DARK = "#2c2c2e";
const TEXT_WHITE = "#ffffff";
const TEXT_GRAY = "#8e8e93";

interface Seat {
  id: number | string;
  label: string;
}

interface TicketTransferFlowProps {
  eventImage?: string;
  eventName?: string;
  eventDate?: string;
  venue?: string;
  venueMapLabel?: string;
  orderNumber?: string;
  ticketTypeLabel?: string;
  section?: string;
  row?: string;
  seatList?: Seat[];
  onClose?: () => void;
}

type Screen =
  | "order"
  | "authLoading"
  | "authCode"
  | "selectTransfer"
  | "transferForm";

export default function TicketTransferFlow({
  eventImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  eventName = "BTS WORLD TOUR 'ARIRANG' IN LOS ANGELES",
  eventDate = "SAT, SEP 05, 2026, 08:00 PM",
  venue = "SoFi Stadium — Inglewood, CA",
  venueMapLabel = "SoFi Stadium",
  orderNumber = "52-286815/CA",
  ticketTypeLabel = "SOUNDCHECK VIP PACKAGE",
  section = "FLR A1",
  row = "4",
  seatList = [
    { id: 1, label: "SEAT 1" },
    { id: 2, label: "SEAT 2" },
    { id: 3, label: "SEAT 3" },
    { id: 4, label: "SEAT 4" },
  ],
  onClose,
}: TicketTransferFlowProps) {
  const navigate = useNavigate();

  const [screen, setScreen] = useState<Screen>("order");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const toggleSeat = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Transfer now starts with an authentication step before seat selection
  const openTransfer = () => {
    setSelected([]);
    setSent(false);
    setOtpCode("");
    setScreen("authLoading");
  };

  // Auto-advance from the loading spinner to the code entry screen
  useEffect(() => {
    if (screen === "authLoading") {
      const timer = setTimeout(() => setScreen("authCode"), 1600);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleCancelAuth = () => {
    setScreen("order");
  };

  const handleConfirmCode = () => {
    if (!otpCode) return;
    setScreen("selectTransfer");
  };

  const closeTransfer = () => {
    setScreen("order");
    setSelected([]);
    setEmailOrPhone("");
    setNote("");
    setSent(false);
  };

  const handleSend = () => {
    if (!emailOrPhone) return;
    setSent(true);
  };

  const page = {
    minHeight: "100vh",
    width: "100%",
    background: BG_DARK,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    position: "relative" as const,
  };

  const shell = {
    maxWidth: 480,
    margin: "0 auto",
    background: BG_DARK,
    minHeight: "100vh",
    position: "relative" as const,
  };

  const tabBar = (
    <div style={{ display: "flex", borderBottom: `1px solid ${BORDER_DARK}` }}>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          padding: "10px 0",
          fontSize: 14,
          fontWeight: 600,
          color: TEXT_WHITE,
          borderBottom: `2px solid ${TEXT_WHITE}`,
        }}
      >
        Tickets
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          padding: "10px 0",
          fontSize: 14,
          fontWeight: 500,
          color: TEXT_GRAY,
        }}
      >
        Extras
      </div>
    </div>
  );

  // Small header used on the two authentication screens (matches the
  // blurred event photo + blue "Cancel / Authentication" bar)
  const authHeader = (
    <>
      <div style={{ position: "relative", height: 80 }}>
        <img
          src={eventImage}
          alt={eventName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.5)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: BLUE,
          padding: "14px 16px",
        }}
      >
        <button
          onClick={handleCancelAuth}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 14,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Cancel
        </button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
          Authentication
        </span>
        <span style={{ width: 40 }} />
      </div>
    </>
  );

  return (
    <div style={page}>
      <style>{`
        @keyframes tm-spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={shell}>
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 20,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          ✕
        </button>

        {/* ---------------- SCREEN 1: ORDER / TICKET LIST ---------------- */}
        {screen === "order" && (
          <>
            <div style={{ position: "relative", height: 210 }}>
              <img
                src={eventImage}
                alt={eventName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  color: "#fff",
                  fontSize: 20,
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                }}
              >
                ←
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                }}
              >
                Help
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.65)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 12px",
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                }}
              >
                {eventDate}
              </div>
            </div>

            <div style={{ padding: "12px 16px 4px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_WHITE, lineHeight: 1.3 }}>
                {eventName}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 4,
                  fontSize: 13,
                  color: TEXT_GRAY,
                }}
              >
                <span>{venue}</span>
                <span>🎟️ x{seatList.length}</span>
              </div>
            </div>

            <div style={{ padding: "10px 16px" }}>
              <button
                style={{
                  width: "100%",
                  background: BLUE,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span>🎟️</span>
                <span>View Tickets</span>
              </button>
            </div>

            {tabBar}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px 4px",
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE }}>
                  Order #{orderNumber}
                </div>
                <div style={{ fontSize: 12, color: TEXT_GRAY, marginTop: 2 }}>
                  x{seatList.length} Tickets
                </div>
              </div>
              <span style={{ fontSize: 18, color: TEXT_WHITE }}>⋮</span>
            </div>

            <div style={{ padding: "8px 16px 4px" }}>
              {seatList.map((s) => (
                <div key={s.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_GRAY, marginBottom: 6 }}>
                    {ticketTypeLabel}
                  </div>
                  <div
                    style={{
                      background: CARD_DARK,
                      border: `1px solid ${BORDER_DARK}`,
                      borderRadius: 8,
                      padding: "10px 14px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_GRAY, letterSpacing: 0.3 }}>
                        SECTION
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE, marginTop: 2 }}>
                        {section}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_GRAY, letterSpacing: 0.3 }}>
                        ROW
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE, marginTop: 2 }}>
                        {row}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_GRAY, letterSpacing: 0.3 }}>
                        SEAT
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE, marginTop: 2 }}>
                        {s.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                padding: "6px 16px 4px",
              }}
            >
              <button
                onClick={openTransfer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: "6px 18px",
                }}
              >
                <span style={{ fontSize: 16, color: BLUE }}>↗</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: BLUE }}>Transfer</span>
              </button>
              <div style={{ width: 1, height: 30, background: BORDER_DARK }} />
              <button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: "6px 18px",
                }}
              >
                <span style={{ fontSize: 16, color: TEXT_GRAY }}>↻</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: TEXT_GRAY }}>Sell</span>
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.5,
                color: TEXT_GRAY,
                padding: "10px 0 8px",
              }}
            >
              MORE OPTIONS
            </div>

            {/* ---------------- MAP / MORE OPTIONS CARD ---------------- */}
            <div style={{ padding: "0 16px 20px" }}>
              {!showMoreOptions ? (
                <div
                  onClick={() => setShowMoreOptions(true)}
                  style={{
                    position: "relative",
                    height: 140,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    background:
                      "repeating-linear-gradient(45deg, #e9e9ee, #e9e9ee 10px, #dfdfe6 10px, #dfdfe6 20px)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1c1c1e",
                      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                    }}
                  >
                    {venueMapLabel}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        background: "#fff",
                        color: "#1c1c1e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      +
                    </span>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        background: "#fff",
                        color: "#1c1c1e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                      }}
                    >
                      −
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {/* Expanded map with pin + close */}
                  <div
                    style={{
                      position: "relative",
                      height: 160,
                      background:
                        "repeating-linear-gradient(45deg, #e9e9ee, #e9e9ee 10px, #dfdfe6 10px, #dfdfe6 20px)",
                    }}
                  >
                    <button
                      onClick={() => setShowMoreOptions(false)}
                      aria-label="Close map"
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        border: "none",
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      ✕
                    </button>
                    <div
                      style={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -100%)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 22 }}>📍</div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#1c1c1e",
                          background: "#fff",
                          padding: "2px 6px",
                          borderRadius: 4,
                          marginTop: -4,
                        }}
                      >
                        Inglewood
                      </div>
                    </div>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      background: "#f0f0f2",
                      border: "none",
                      borderBottom: "1px solid #e5e5e5",
                      padding: "12px 0",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1c1c1e",
                      cursor: "pointer",
                    }}
                  >
                    Get Directions
                  </button>

                  {/* You got tickets promo */}
                  <div style={{ background: "#0d0d0f", padding: 14 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <img
                        src={eventImage}
                        alt={eventName}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: "cover",
                          borderRadius: 6,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: TEXT_WHITE,
                            marginBottom: 4,
                          }}
                        >
                          YOU GOT
                          <br />
                          TICKETS!
                        </div>
                        <div
                          style={{
                            width: 24,
                            height: 2,
                            background: TEXT_WHITE,
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: TEXT_GRAY,
                        marginTop: 10,
                      }}
                    >
                      {eventDate}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: TEXT_WHITE,
                        marginTop: 2,
                      }}
                    >
                      {eventName}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT_GRAY, marginTop: 2 }}>
                      {venue}
                    </div>
                  </div>

                  <div style={{ padding: 14 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1c1c1e",
                        marginBottom: 4,
                      }}
                    >
                      Post on Social Media
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
                      Build hype for the event, and share that you got
                      tickets with your friends and family.
                    </div>
                    <button
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#f0f0f2",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 14px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1c1c1e",
                        cursor: "pointer",
                      }}
                    >
                      <span>Share You're Going</span>
                      <span>⤴</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Spacer so content isn't hidden behind the sticky footer */}
            <div style={{ height: 64 }} />

            {/* ---------------- STICKY TRANSFER / SELL FOOTER ---------------- */}
            <div
              style={{
                position: "fixed",
                bottom: 16,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                zIndex: 30,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#fff",
                  borderRadius: 24,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  overflow: "hidden",
                  pointerEvents: "auto",
                }}
              >
                <button
                  onClick={openTransfer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    border: "none",
                    borderRight: "1px solid #eee",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 14, color: BLUE }}>↗</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: BLUE }}>
                    Transfer
                  </span>
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    border: "none",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#1c1c1e" }}>↻</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e" }}>
                    Sell
                  </span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* ---------------- SCREEN 2: AUTH LOADING ---------------- */}
        {screen === "authLoading" && (
          <div>
            {authHeader}
            <div
              style={{
                background: "#fff",
                minHeight: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `3px solid #e5e7eb`,
                  borderTopColor: BLUE,
                  animation: "tm-spin 0.8s linear infinite",
                }}
              />
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 2b: AUTH CODE ENTRY ---------------- */}
        {screen === "authCode" && (
          <div>
            {authHeader}
            <div style={{ background: "#fff", minHeight: 420, padding: "24px 20px" }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.3,
                  marginBottom: 14,
                }}
              >
                Authenticate Your Account
              </div>
              <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 20, lineHeight: 1.5 }}>
                A one-time code has been sent to <strong>*****8923</strong>.
                Please enter your code below to continue.
              </div>

              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                One-Time Code
              </label>
              <input
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  padding: "10px 12px",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              />
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 20 }}>
                It may take a minute to receive your code.
              </div>

              <button
                disabled={!otpCode}
                onClick={handleConfirmCode}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: 6,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: otpCode ? "pointer" : "not-allowed",
                  background: otpCode ? BLUE : "#e5e7eb",
                  color: otpCode ? "#fff" : "#9ca3af",
                }}
              >
                Confirm Code
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 3: SELECT TICKETS TO TRANSFER ---------------- */}
        {screen === "selectTransfer" && (
          <div>
            <div style={{ position: "relative", height: 90 }}>
              <img
                src={eventImage}
                alt={eventName}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }}
              />
              <div
                onClick={() => setScreen("order")}
                style={{ position: "absolute", top: 10, left: 12, color: "#fff", fontSize: 18, cursor: "pointer" }}
              >
                ←
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 34,
                  right: 34,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {eventName}
              </div>
            </div>

            {tabBar}

            <div style={{ padding: "12px 16px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE }}>
                    Order #{orderNumber}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_GRAY, marginTop: 2 }}>
                    x{seatList.length} Tickets
                  </div>
                </div>
                <span style={{ fontSize: 18, color: TEXT_WHITE }}>⋮</span>
              </div>

              <div
                style={{
                  background: CARD_DARK,
                  color: TEXT_GRAY,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "6px 10px",
                  borderRadius: 4,
                  marginTop: 12,
                  display: "inline-block",
                }}
              >
                {ticketTypeLabel}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  fontSize: 11,
                  color: TEXT_GRAY,
                  fontWeight: 600,
                  margin: "10px 0 30px",
                }}
              >
                <span>SECTION</span>
                <span>ROW</span>
                <span>SEAT</span>
              </div>
            </div>

            {/* bottom sheet */}
            <div style={{ borderTop: `1px solid ${BORDER_DARK}`, padding: "14px 16px 16px" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: TEXT_WHITE,
                  marginBottom: 12,
                }}
              >
                SELECT TICKETS TO TRANSFER
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  background: CARD_DARK,
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: 12,
                  color: TEXT_GRAY,
                  marginBottom: 16,
                }}
              >
                <span>ⓘ</span>
                <span>Only transfer tickets to people you know and trust to ensure everyone stays safe</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE }}>
                  Sec {section}, Row {row}
                </span>
                <span style={{ fontSize: 12, color: TEXT_GRAY }}>◆ {seatList.length} tickets</span>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {seatList.map((s) => {
                  const isSelected = selected.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSeat(s.id)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 4,
                          background: isSelected ? BLUE : CARD_DARK,
                          color: isSelected ? "#fff" : TEXT_WHITE,
                          border: `1px solid ${isSelected ? BLUE : BORDER_DARK}`,
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 6,
                          border: `1px solid ${isSelected ? BLUE : BORDER_DARK}`,
                          background: isSelected ? BLUE : CARD_DARK,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: TEXT_GRAY }}>{selected.length} Selected</span>
                <button
                  disabled={selected.length === 0}
                  onClick={() => setScreen("transferForm")}
                  style={{
                    border: "none",
                    background: "none",
                    color: selected.length ? BLUE : TEXT_GRAY,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: selected.length ? "pointer" : "not-allowed",
                  }}
                >
                  TRANSFER TO &gt;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 4: TRANSFER FORM ---------------- */}
        {screen === "transferForm" && (
          <div style={{ padding: "16px 20px 20px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_WHITE }}>Tickets sent</div>
                <div style={{ fontSize: 13, color: TEXT_GRAY, marginTop: 6 }}>
                  {emailOrPhone} will get an email to accept the transfer.
                </div>
                <button
                  onClick={closeTransfer}
                  style={{
                    marginTop: 20,
                    border: "none",
                    background: BLUE,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "10px 20px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    color: TEXT_WHITE,
                    marginBottom: 14,
                  }}
                >
                  TRANSFER TICKETS
                </div>

                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE }}>
                  {selected.length} Tickets Selected
                </div>
                <div style={{ fontSize: 13, color: TEXT_GRAY, marginBottom: 18 }}>
                  Sec {section} Row {row} Seat{" "}
                  {seatList.filter((s) => selected.includes(s.id)).map((s) => s.id).join(", ")}
                </div>

                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: TEXT_WHITE, marginBottom: 6 }}>
                  Email or Mobile Number
                </label>
                <input
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Email or Mobile Number"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: `1px solid ${BORDER_DARK}`,
                    background: CARD_DARK,
                    color: TEXT_WHITE,
                    borderRadius: 6,
                    padding: "10px 12px",
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                />

                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: TEXT_WHITE, marginBottom: 6 }}>
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note"
                  rows={3}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: `1px solid ${BORDER_DARK}`,
                    background: CARD_DARK,
                    color: TEXT_WHITE,
                    borderRadius: 6,
                    padding: "10px 12px",
                    fontSize: 13,
                    marginBottom: 12,
                    resize: "none",
                    fontFamily: "inherit",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    onClick={() => setScreen("selectTransfer")}
                    style={{ border: "none", background: "none", color: BLUE, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                  >
                    &lt; BACK
                  </button>
                  <button
                    disabled={!emailOrPhone}
                    onClick={handleSend}
                    style={{
                      border: "none",
                      background: emailOrPhone ? BLUE : BORDER_DARK,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 12,
                      padding: "10px 16px",
                      borderRadius: 6,
                      cursor: emailOrPhone ? "pointer" : "not-allowed",
                    }}
                  >
                    TRANSFER {selected.length} TICKETS
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}