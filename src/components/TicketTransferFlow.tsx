import { useState } from "react";

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
  orderNumber?: string;
  section?: string;
  row?: string;
  seatList?: Seat[];
  onClose?: () => void;
}

export default function TicketTransferFlow({
  eventImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  eventName = "BTS WORLD TOUR 'ARIRANG' IN PARIS",
  eventDate = "Fri, Jul 17, 2026, 8:00 PM",
  venue = "Stade de France",
  orderNumber = "57-75274/IMB",
  section = "118",
  row = "9",
  seatList = [
    { id: 17, label: "SEAT 17" },
    { id: 18, label: "SEAT 18" },
      { id: 19, label: "SEAT 19" },
    { id: 20, label: "SEAT 20" },
  ],
  onClose,
}: TicketTransferFlowProps) {
  // "order"        -> ticket list screen
  // "selectTransfer" -> choose which seats to transfer
  // "transferForm"   -> enter recipient + note
  const [screen, setScreen] = useState<"order" | "selectTransfer" | "transferForm">("order");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const toggleSeat = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const openTransfer = () => {
    setSelected([]);
    setSent(false);
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

  const shell = {
    width: 375,
    margin: "0 auto",
    background: BG_DARK,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    position: "relative" as const,
  };

  const backdrop = {
    minHeight: 640,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0",
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

  return (
    <div style={backdrop}>
      <div style={shell}>
        {onClose && (
          <button
            onClick={onClose}
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
        )}

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
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  color: "#fff",
                  fontSize: 20,
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
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
                <span>🎟 x{seatList.length}</span>
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
                }}
              >
                🎫 View Tickets
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
                    General Sale
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
                padding: "10px 0 20px",
              }}
            >
              MORE OPTIONS
            </div>
          </>
        )}

        {/* ---------------- SCREEN 2: SELECT TICKETS TO TRANSFER ---------------- */}
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
                ARMY MEMBERSHIP PRESALE
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

              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
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

        {/* ---------------- SCREEN 3: TRANSFER FORM ---------------- */}
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