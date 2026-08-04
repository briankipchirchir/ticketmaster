import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ORDERS } from "../data/ticketsData";

const BLUE = "#026cdf";
const LIGHT_BG = "#f5f6f8";
const CARD_WHITE = "#ffffff";
const LABEL_BG = "#f3f4f6";
const BORDER_LIGHT = "#e5e7eb";
const TEXT_DARK = "#111827";
const TEXT_GRAY = "#6b7280";

const SIDEBAR_LINKS = [
  "My Profile",
  "Additional Contact Details",
  "Sign Out",
  "Back to Top",
];

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

// A single "Label bar + content" section, reused for Order Date /
// Purchase Information / Order Status
function InfoSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          background: LABEL_BG,
          color: TEXT_GRAY,
          fontSize: 12,
          fontWeight: 600,
          padding: "8px 16px",
        }}
      >
        {label}
      </div>
      <div style={{ padding: "14px 16px" }}>{children}</div>
    </div>
  );
}

export default function PurchaseHistory() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: LIGHT_BG, display: "flex" }}>
      {/* ---------------- MOBILE TOP BAR ---------------- */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 52,
            background: CARD_WHITE,
            borderBottom: `1px solid ${BORDER_LIGHT}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            zIndex: 20,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
              color: TEXT_DARK,
            }}
          >
            ☰
          </button>
          <span style={{ marginLeft: 12, fontSize: 15, fontWeight: 700, color: TEXT_DARK }}>
            Purchase History
          </span>
        </div>
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      {isMobile ? (
        <>
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 30,
              }}
            />
          )}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: 240,
              background: CARD_WHITE,
              padding: "24px 20px",
              zIndex: 40,
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.25s ease",
              boxShadow: sidebarOpen ? "2px 0 12px rgba(0,0,0,0.15)" : "none",
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
                marginBottom: 16,
                color: TEXT_DARK,
              }}
            >
              ✕ Close
            </button>
            {SIDEBAR_LINKS.map((link) => (
              <div
                key={link}
                onClick={() => setSidebarOpen(false)}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT_DARK,
                  padding: "10px 0",
                  cursor: "pointer",
                  borderBottom: `1px solid ${BORDER_LIGHT}`,
                }}
              >
                {link}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            width: 220,
            flexShrink: 0,
            background: CARD_WHITE,
            borderRight: `1px solid ${BORDER_LIGHT}`,
            padding: "24px 20px",
          }}
        >
          {SIDEBAR_LINKS.map((link) => (
            <div
              key={link}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: TEXT_DARK,
                padding: "10px 0",
                cursor: "pointer",
                borderBottom: `1px solid ${BORDER_LIGHT}`,
              }}
            >
              {link}
            </div>
          ))}
        </div>
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div
        style={{
          flex: 1,
          padding: isMobile ? "16px 12px" : "24px",
          paddingTop: isMobile ? 68 : 24,
          maxWidth: "100vw",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          {ORDERS.map((order, orderIndex) => {
            const primaryItem = order.items[0];
            const orderDateDisplay = order.orderTime.replace("\n", " ");

            return (
              <div
                key={orderIndex}
                style={{
                  background: CARD_WHITE,
                  border: `1px solid ${BORDER_LIGHT}`,
                  borderRadius: 8,
                  marginBottom: 20,
                  overflow: "hidden",
                }}
              >
                <InfoSection label="Order Date">
                  <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_DARK }}>
                    {orderDateDisplay}
                  </span>
                </InfoSection>

                <div style={{ borderTop: `1px solid ${BORDER_LIGHT}` }} />

                <InfoSection label="Purchase Information">
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: TEXT_DARK,
                      whiteSpace: "pre-line",
                      lineHeight: 1.4,
                      marginBottom: 10,
                    }}
                  >
                    {primaryItem.eventName}
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
                    <span>💳</span>
                    <span>Payment</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      marginBottom: 12,
                    }}
                  >
                    <span>🚚</span>
                    <span style={{ color: BLUE, fontWeight: 600 }}>Mobile Ticket</span>
                  </div>
                  <button
                    onClick={() => navigate(`/mobile-ticket/${primaryItem.id}`)}
                    style={{
                      width: "100%",
                      background: BLUE,
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "12px 0",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    View Mobile Ticket
                  </button>
                </InfoSection>

                <div style={{ borderTop: `1px solid ${BORDER_LIGHT}` }} />

                <InfoSection label="Order Status">
                  <div
                    style={{
                      fontSize: 14,
                      color: TEXT_DARK,
                      marginBottom: 14,
                    }}
                  >
                    {order.status}
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/ticket-transfer-flow/${primaryItem.id}`)
                    }
                    style={{
                      width: "100%",
                      background: "#fff",
                      color: BLUE,
                      border: `1px solid ${BLUE}`,
                      borderRadius: 6,
                      padding: "12px 0",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Transfer ↗
                  </button>
                </InfoSection>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}