import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import bingbangImg from "../assets/bingbang.png";

const BLUE = "#026cdf";
const BG_DARK = "#0d0d0f";
const CARD_DARK = "#1c1c1e";
const BORDER_DARK = "#2c2c2e";
const TEXT_WHITE = "#ffffff";
const TEXT_GRAY = "#8e8e93";

type OrderTab = "purchased" | "downloaded";

interface TicketOrder {
  id: string;
  thumbnail: string;
  thumbnailLabel: string;
  eventName: string;
  shortEventName: string;
  venue: string;
  dateLabel: string;
  ticketCount: number;
  purchasedAt: string;
  orderNumber: string;
  tab: OrderTab;
}

const MOCK_ORDERS: TicketOrder[] = [
  {
    id: "1",
    thumbnail: bingbangImg,
    thumbnailLabel: "빅뱅 콘서트\nIN 고양",
    eventName: "쿠팡플레이와 함께하는 BIGBANG 2026 WORLD TOUR IN GOYANG",
    shortEventName: "[Play&Stay] BIGBANG 2026 WORLD TOUR IN...",
    venue: "GOYANG STADIUM",
    dateLabel: "2026/8/1 (Fri) 7:30pm",
    ticketCount: 2,
    purchasedAt: "2026/7/16",
    orderNumber: "57-75274/INB",
    tab: "purchased",
  },
  {
    id: "2",
    thumbnail: bingbangImg,
    thumbnailLabel: "빅뱅 콘서트\nIN 고양",
    eventName: "쿠팡플레이와 함께하는 BIGBANG 2026 WORLD TOUR IN GOYANG",
    shortEventName: "[Play&Stay] BIGBANG 2026 WORLD TOUR IN...",
    venue: "GOYANG STADIUM",
    dateLabel: "2026/8/23 (Sun) 7:00pm",
    ticketCount: 1,
    purchasedAt: "2026/7/13",
    orderNumber: "57-75188/KLM",
    tab: "purchased",
  },
  {
    id: "3",
    thumbnail: bingbangImg,
    thumbnailLabel: "빅뱅 콘서트\nIN 고양",
    eventName: "쿠팡플레이와 함께하는 BIGBANG 2026 WORLD TOUR IN GOYANG",
    shortEventName: "[Play&Stay] BIGBANG 2026 WORLD TOUR IN...",
    venue: "GOYANG STADIUM",
    dateLabel: "2026/8/22 (Sat) 7:30pm",
    ticketCount: 1,
    purchasedAt: "2026/7/2",
    orderNumber: "57-75012/QRS",
    tab: "purchased",
  },
];

export default function MyTicketOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderTab>("purchased");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(null);

  const visibleOrders = MOCK_ORDERS.filter((o) => o.tab === activeTab);
  const viewingOrder = MOCK_ORDERS.find((o) => o.id === viewingOrderId) ?? null;

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
        {/* ---------------- HEADER ---------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 20px",
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
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            ←
          </button>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: TEXT_WHITE,
            }}
          >
            My Ticket
          </h1>
        </div>

        {/* ---------------- TABS ---------------- */}
        <div
          style={{
            display: "flex",
            gap: 28,
            padding: "0 20px",
            borderBottom: `1px solid ${BORDER_DARK}`,
          }}
        >
          {(["purchased", "downloaded"] as OrderTab[]).map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
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
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- ORDER LIST ---------------- */}
        <div style={{ padding: "8px 20px 0" }}>
          {visibleOrders.length === 0 ? (
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
            visibleOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "18px 0",
                  borderBottom: `1px solid ${BORDER_DARK}`,
                  position: "relative",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: 92,
                    height: 92,
                    borderRadius: 8,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: CARD_DARK,
                  }}
                >
                  <img
                    src={order.thumbnail}
                    alt={order.eventName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: 6,
                      right: 6,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {order.thumbnailLabel}
                  </div>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: TEXT_WHITE,
                      lineHeight: 1.35,
                      marginBottom: 4,
                      paddingRight: 24,
                    }}
                  >
                    {order.eventName}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: BLUE,
                      marginBottom: 6,
                    }}
                  >
                    {order.dateLabel}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 2,
                    }}
                  >
                    Purchased {order.ticketCount} ticket
                    {order.ticketCount > 1 ? "s" : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TEXT_GRAY,
                      marginBottom: 2,
                    }}
                  >
                    Purchased at {order.purchasedAt}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_GRAY }}>
                    Order #{order.orderNumber}
                  </div>
                </div>

                {/* Overflow menu */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === order.id ? null : order.id)
                    }
                    aria-label="More options"
                    style={{
                      background: "none",
                      border: "none",
                      color: TEXT_WHITE,
                      fontSize: 18,
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    ⋮
                  </button>

                  {openMenuId === order.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: 28,
                        right: 0,
                        background: CARD_DARK,
                        border: `1px solid ${BORDER_DARK}`,
                        borderRadius: 8,
                        minWidth: 140,
                        zIndex: 10,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      }}
                    >
                      <button
                        onClick={() => {
                          setViewingOrderId(order.id);
                          setOpenMenuId(null);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          color: TEXT_WHITE,
                          fontSize: 13,
                          padding: "10px 14px",
                          cursor: "pointer",
                        }}
                      >
                        View order
                      </button>
                      <button
                        onClick={() => setOpenMenuId(null)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          color: TEXT_WHITE,
                          fontSize: 13,
                          padding: "10px 14px",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {viewingOrder &&
        createPortal(
          <div
            onClick={() => setViewingOrderId(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 5000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 400,
                background: "#ffffff",
                borderRadius: 16,
                padding: "20px 20px 24px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}
                >
                  Concerts
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#4f46e5",
                    background: "#eef2ff",
                    borderRadius: 20,
                    padding: "5px 14px",
                  }}
                >
                  Confirmed
                </span>
              </div>

              {/* Thumbnail + name */}
              <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
                <img
                  src={viewingOrder.thumbnail}
                  alt={viewingOrder.eventName}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.35,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {viewingOrder.shortEventName}
                </div>
              </div>

              {/* Details rows */}
              <div style={{ borderTop: "1px solid #e5e7eb" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    Venue
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#111827",
                      textAlign: "right",
                    }}
                  >
                    {viewingOrder.venue}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    Number of tickets
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {viewingOrder.ticketCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    Date
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {viewingOrder.dateLabel}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setViewingOrderId(null)}
                style={{
                  width: "100%",
                  marginTop: 16,
                  padding: "12px 0",
                  background: "#111827",
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
          </div>,
          document.body
        )}
    </div>
  );
}