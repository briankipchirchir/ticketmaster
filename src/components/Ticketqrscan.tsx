import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BLUE = "#026cdf";
const NAVY_DARK = "#0f1730";
const NAVY_CARD = "#131c3d";
const BG_DARK = "#0d0d0f";
const BORDER_DARK = "#26305a";
const TEXT_WHITE = "#ffffff";
const TEXT_GRAY = "#9099b8";

const REFRESH_SECONDS = 60;

interface TicketQRScanProps {
  eventName?: string;
  eventDateVenue?: string;
  ticketCount?: number;
  holderName?: string;
  section?: string;
  row?: string;
  seat?: string;
  ticketTypeLeft?: string;
  ticketTypeRight?: string;
  pageIndex?: number;
  pageTotal?: number;
}

export default function TicketQRScan({
  eventName = "BIGBANG - Admissions",
  eventDateVenue = "SAT, Sep 5, 2026 - 8:00 PM PDT | Oakland-Alameda",
  ticketCount = 2,
  holderName = "Brian Kip",
  section = "113",
  row = "2",
  seat = "4",
  ticketTypeLeft = "General Admission",
  ticketTypeRight = "Admissions",
  pageIndex = 1,
  pageTotal = 2,
}: TicketQRScanProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tickets" | "info">("tickets");
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECONDS);
  const [qrSeed, setQrSeed] = useState(0);

  // Refresh the QR code every 60 seconds, same anti-screenshot behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setQrSeed((s) => s + 1);
          return REFRESH_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setQrSeed((s) => s + 1);
    setSecondsLeft(REFRESH_SECONDS);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: BG_DARK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div
          style={{
            background: NAVY_CARD,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* ---------------- HEADER ---------------- */}
          <div
            style={{
              padding: "16px 16px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => navigate(-1)}
                aria-label="Back"
                style={{
                  background: "none",
                  border: "none",
                  color: TEXT_WHITE,
                  fontSize: 20,
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                ‹
              </button>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: TEXT_WHITE,
                  }}
                >
                  {eventName}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: TEXT_GRAY,
                    marginTop: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {eventDateVenue}
                </div>
              </div>
              <button
                aria-label="Info"
                style={{
                  background: "none",
                  border: `1px solid ${BORDER_DARK}`,
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  color: TEXT_WHITE,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                i
              </button>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                marginTop: 16,
                borderBottom: `1px solid ${BORDER_DARK}`,
              }}
            >
              <button
                onClick={() => setActiveTab("tickets")}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  padding: "0 0 10px",
                  cursor: "pointer",
                  borderBottom:
                    activeTab === "tickets"
                      ? `2px solid ${BLUE}`
                      : "2px solid transparent",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: activeTab === "tickets" ? BLUE : TEXT_GRAY,
                  }}
                >
                  Tickets ({ticketCount})
                </span>
              </button>
              <button
                onClick={() => setActiveTab("info")}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  padding: "0 0 10px",
                  cursor: "pointer",
                  borderBottom:
                    activeTab === "info"
                      ? `2px solid ${BLUE}`
                      : "2px solid transparent",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: activeTab === "info" ? BLUE : TEXT_GRAY,
                  }}
                >
                  Event Info
                </span>
              </button>
            </div>
          </div>

          {activeTab === "tickets" ? (
            <>
              {/* ---------------- QR PANEL ---------------- */}
              <div
                style={{
                  position: "relative",
                  background: NAVY_DARK,
                  padding: "28px 20px 22px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                {/* Repeating watermark, using the app's own name instead of a third-party brand */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    opacity: 0.06,
                    fontSize: 12,
                    fontWeight: 800,
                    color: TEXT_WHITE,
                    transform: "rotate(-20deg) scale(1.4)",
                    pointerEvents: "none",
                  }}
                >
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} style={{ padding: "10px 0" }}>
                      axs
                    </span>
                  ))}
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: TEXT_WHITE,
                      marginBottom: 20,
                    }}
                  >
                    Scan For Entry
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    {/* QR code placeholder */}
                    <div
                      style={{
                        position: "relative",
                        width: 180,
                        height: 180,
                        background: "#fff",
                        borderRadius: 12,
                        border: `3px solid ${BLUE}`,
                        padding: 10,
                        boxSizing: "border-box",
                      }}
                    >
                      <FauxQrCode seed={qrSeed} />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: TEXT_GRAY,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                          border: "3px solid #fff",
                        }}
                      >
                        axs
                      </div>
                    </div>

                    <button
                      onClick={handleManualRefresh}
                      aria-label="Refresh QR code"
                      style={{
                        background: "none",
                        border: "none",
                        color: TEXT_GRAY,
                        fontSize: 22,
                        cursor: "pointer",
                        padding: 4,
                      }}
                    >
                      ↻
                    </button>
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 15,
                      fontWeight: 700,
                      color: TEXT_WHITE,
                    }}
                  >
                    {holderName}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      fontWeight: 700,
                      color: TEXT_WHITE,
                    }}
                  >
                    axs Mobile ID
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 11,
                      color: TEXT_GRAY,
                      lineHeight: 1.5,
                    }}
                  >
                    Screenshots won't work,
                    <br />
                    your code refreshes in {secondsLeft}s.
                  </div>
                </div>
              </div>

              {/* ---------------- TRANSFER / SELL ---------------- */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 16px 0",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    background: BLUE,
                    color: "#fff",
                    border: "none",
                    borderRadius: 24,
                    padding: "12px 0",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Transfer
                </button>
                <button
                  style={{
                    flex: 1,
                    background: BLUE,
                    color: "#fff",
                    border: "none",
                    borderRadius: 24,
                    padding: "12px 0",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sell
                </button>
              </div>

              {/* ---------------- SEAT DETAILS ---------------- */}
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    border: `1px solid ${BORDER_DARK}`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: TEXT_GRAY,
                      }}
                    >
                      {ticketTypeLeft}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: TEXT_GRAY,
                      }}
                    >
                      {ticketTypeRight}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      borderTop: `1px solid ${BORDER_DARK}`,
                      padding: "14px",
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
                        SEC
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: TEXT_WHITE,
                        }}
                      >
                        {section}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: TEXT_GRAY,
                          marginBottom: 4,
                        }}
                      >
                        ROW
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: TEXT_WHITE,
                        }}
                      >
                        {row}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: TEXT_GRAY,
                          marginBottom: 4,
                        }}
                      >
                        SEAT
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: TEXT_WHITE,
                        }}
                      >
                        {seat}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: "24px 16px", color: TEXT_GRAY, fontSize: 13 }}>
              Event info goes here.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div
          style={{
            textAlign: "center",
            color: TEXT_GRAY,
            fontSize: 13,
            marginTop: 14,
          }}
        >
          {pageIndex} of {pageTotal}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a deterministic-but-random-looking QR-style grid so the code
 * visibly "changes" whenever `seed` changes (mimicking the refresh
 * behavior), without needing a real QR-encoding library.
 */
function FauxQrCode({ seed }: { seed: number }) {
  const size = 21;
  const cells: boolean[] = [];
  let rand = seed * 9301 + 49297;
  for (let i = 0; i < size * size; i++) {
    rand = (rand * 9301 + 49297) % 233280;
    cells.push(rand / 233280 > 0.5);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: "100%",
        height: "100%",
      }}
    >
      {cells.map((filled, i) => (
        <div
          key={i}
          style={{
            background: filled ? "#000" : "transparent",
          }}
        />
      ))}
    </div>
  );
}