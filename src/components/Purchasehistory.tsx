import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ORDERS } from "../data/ticketsData";

const BLUE = "#026cdf";
const LIGHT_BG = "#f5f6f8";
const CARD_WHITE = "#ffffff";
const HEADER_DARK = "#1a1a1a";
const BORDER_LIGHT = "#e5e7eb";
const TEXT_DARK = "#111827";
const TEXT_GRAY = "#6b7280";
const RED_TOTAL = "#dc2626";

const SIDEBAR_LINKS = [
  "My Profile",
  "Additional Contact Details",
  "Sign Out",
  "Back to Top",
];

export default function PurchaseHistory() {
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(
    new Set(ORDERS.map((_, i) => i))
  );
  const navigate = useNavigate();

  const toggleOrder = (index: number) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: LIGHT_BG, display: "flex" }}>
      {/* ---------------- SIDEBAR ---------------- */}
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

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div style={{ flex: 1, padding: "24px", overflowX: "auto" }}>
        {ORDERS.map((order, orderIndex) => {
          const isExpanded = expandedOrders.has(orderIndex);
          return (
            <div
              key={orderIndex}
              style={{
                background: CARD_WHITE,
                border: `1px solid ${BORDER_LIGHT}`,
                borderRadius: 6,
                marginBottom: 20,
                minWidth: 700,
              }}
            >
              {/* Order header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr 1fr",
                }}
              >
                <div
                  style={{
                    background: HEADER_DARK,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 14px",
                    borderRight: "1px solid #333",
                  }}
                >
                  Order No.
                </div>
                <div
                  style={{
                    background: HEADER_DARK,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 14px",
                    borderRight: "1px solid #333",
                  }}
                >
                  Order Time
                </div>
                <div
                  style={{
                    background: HEADER_DARK,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 14px",
                    borderRight: "1px solid #333",
                  }}
                >
                  Purchase Information
                </div>
                <div
                  style={{
                    background: HEADER_DARK,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 14px",
                  }}
                >
                  Order Status
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr 1fr",
                  borderBottom: `1px solid ${BORDER_LIGHT}`,
                }}
              >
                <div
                  style={{
                    padding: "16px 14px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: TEXT_DARK,
                    borderRight: `1px solid ${BORDER_LIGHT}`,
                  }}
                >
                  {order.orderNo}
                </div>
                <div
                  style={{
                    padding: "16px 14px",
                    fontSize: 13,
                    color: TEXT_DARK,
                    whiteSpace: "pre-line",
                    borderRight: `1px solid ${BORDER_LIGHT}`,
                  }}
                >
                  {order.orderTime}
                </div>
                <div
                  style={{
                    padding: "16px 14px",
                    borderRight: `1px solid ${BORDER_LIGHT}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: TEXT_DARK,
                      marginBottom: 6,
                    }}
                  >
                    {order.items[0].eventName}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 2,
                    }}
                  >
                    💳 Payment
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 10,
                    }}
                  >
                    📱 Mobile Ticket
                  </div>
                  <button
                    onClick={() => navigate(`/mobile-ticket/${order.items[0].id}`)}
                    style={{
                      background: BLUE,
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "8px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    View Mobile Ticket
                  </button>
                </div>
                <div style={{ padding: "16px 14px" }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: TEXT_DARK,
                      marginBottom: 12,
                    }}
                  >
                    {order.status}
                  </div>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      background: "#fff",
                      color: TEXT_DARK,
                      border: `1px solid ${BORDER_LIGHT}`,
                      borderRadius: 4,
                      padding: "8px 0",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginBottom: 8,
                    }}
                  >
                    Transfer ↗
                  </button>
                  <button
                    onClick={() => toggleOrder(orderIndex)}
                    style={{
                      display: "block",
                      width: "100%",
                      background: "#fff",
                      color: TEXT_DARK,
                      border: `1px solid ${BORDER_LIGHT}`,
                      borderRadius: 4,
                      padding: "8px 0",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isExpanded ? "Hide Details −" : "Show Details +"}
                  </button>
                </div>
              </div>

              {/* Expandable item breakdown */}
              {isExpanded && (
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                      background: LIGHT_BG,
                    }}
                  >
                    {["Item", "Seat Info", "Ticket Info", "Booking Fee", "Subtotal"].map(
                      (h) => (
                        <div
                          key={h}
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: TEXT_DARK,
                            padding: "10px 14px",
                            borderBottom: `1px solid ${BORDER_LIGHT}`,
                          }}
                        >
                          {h}
                        </div>
                      )
                    )}
                  </div>

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                        borderBottom: `1px solid ${BORDER_LIGHT}`,
                      }}
                    >
                      <div style={{ padding: "14px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: TEXT_DARK,
                            marginBottom: 4,
                          }}
                        >
                          {item.eventName}
                        </div>
                        <div style={{ fontSize: 12, color: TEXT_GRAY }}>
                          📅 {item.date}
                        </div>
                        <div style={{ fontSize: 12, color: TEXT_GRAY }}>
                          📍 {item.venue}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "14px",
                          fontSize: 12,
                          color: TEXT_DARK,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.seatInfoShort}
                      </div>
                      <div
                        style={{
                          padding: "14px",
                          fontSize: 12,
                          color: TEXT_DARK,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.ticketInfoShort}
                      </div>
                      <div
                        style={{
                          padding: "14px",
                          fontSize: 12,
                          color: TEXT_DARK,
                        }}
                      >
                        {item.bookingFee}
                      </div>
                      <div
                        style={{
                          padding: "14px",
                          fontSize: 12,
                          fontWeight: 700,
                          color: TEXT_DARK,
                        }}
                      >
                        {item.subtotal}
                      </div>
                    </div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 40,
                      padding: "10px 14px",
                      borderBottom: `1px solid ${BORDER_LIGHT}`,
                    }}
                  >
                    <span style={{ fontSize: 12, color: TEXT_GRAY }}>
                      Ticket Qty.
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>
                      {order.items.reduce((sum, i) => sum + i.qty, 0)} ticket(s)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 40,
                      padding: "10px 14px",
                    }}
                  >
                    <span style={{ fontSize: 12, color: TEXT_GRAY }}>Total</span>
                    <span
                      style={{ fontSize: 13, fontWeight: 700, color: RED_TOTAL }}
                    >
                      {order.items[0].subtotal}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}