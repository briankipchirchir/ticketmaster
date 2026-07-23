import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  venueLat?: number;
  venueLng?: number;
  orderNumber?: string;
  orderDate?: string;
  ticketTypeLabel?: string;
  ticketPrice?: number;
  feesAmount?: number;
  section?: string;
  row?: string;
  seatList?: Seat[];
  onClose?: () => void;
}

// Gradient ring spinner matching the reference loading indicator
function GradientSpinner({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ animation: "tm-spin 0.9s linear infinite" }}
    >
      <defs>
        <linearGradient id="tm-spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#026cdf" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="url(#tm-spinner-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="85 40"
      />
    </svg>
  );
}

// Simple line-art ticket icon, used instead of an emoji so it renders
// consistently across every OS/browser
function TicketIcon({ size = 14, color = TEXT_GRAY }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <path d="M7 14h10" />
      <path d="M7 17h6" />
    </svg>
  );
}

// Standard "share" glyph (three connected nodes) matching common
// Android/iOS share icons, used on the "Share You're Going" button
function ShareIcon({ size = 16, color = "#1c1c1e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="2.6" stroke={color} strokeWidth={1.8} />
      <circle cx="6" cy="12" r="2.6" stroke={color} strokeWidth={1.8} />
      <circle cx="18" cy="19" r="2.6" stroke={color} strokeWidth={1.8} />
      <path d="M8.3 10.7l7.4-4.2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M8.3 13.3l7.4 4.2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

// Raw SVG markup for the venue pin, shared between the plain <MapPinIcon />
// (used elsewhere) and the Leaflet divIcon (which needs an HTML string,
// not a React element) so the two stay visually identical.
const MAP_PIN_SVG = (color: string) => `
  <svg width="34" height="34" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));">
    <path
      d="M12 2C7.6 2 4 5.6 4 10c0 5.7 6.8 11.2 7.1 11.4a1.4 1.4 0 0 0 1.8 0C13.2 21.2 20 15.7 20 10c0-4.4-3.6-8-8-8z"
      fill="${color}"
    />
    <circle cx="12" cy="10" r="3.2" fill="#ffffff" />
  </svg>
`;

// Filled map-pin icon used as a standalone React element (kept for any
// other callers/backwards compatibility)
function MapPinIcon({ size = 34, color = "#e11d2e" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}
    >
      <path
        d="M12 2C7.6 2 4 5.6 4 10c0 5.7 6.8 11.2 7.1 11.4a1.4 1.4 0 0 0 1.8 0C13.2 21.2 20 15.7 20 10c0-4.4-3.6-8-8-8z"
        fill={color}
      />
      <circle cx="12" cy="10" r="3.2" fill="#ffffff" />
    </svg>
  );
}

// Leaflet divIcon built from the same pin artwork, anchored at the bottom
// tip of the pin so it points precisely at the venue coordinates.
const venuePinIcon = L.divIcon({
  html: MAP_PIN_SVG("#e11d2e"),
  className: "", // prevent Leaflet's default icon styles/background from leaking in
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

type Screen =
  | "order"
  | "receipt"
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
  venueLat = 33.9535,
  venueLng = -118.3387,
  orderNumber = "52-286815/CA",
  orderDate = "01/22/26",
  ticketTypeLabel = "SOUNDCHECK VIP PACKAGE",
  ticketPrice = 580,
  feesAmount = 200,
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

  // "You got tickets" + share promo card — reused both inline on the main
  // order screen and inside the full-screen map overlay
  const youGotTicketsCard = (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div style={{ background: "#0d0d0f", padding: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <img
            src={eventImage}
            alt={eventName}
            style={{
              width: 70,
              height: 70,
              objectFit: "cover",
              borderRadius: 6,
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 17,
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
                width: 26,
                height: 2,
                background: TEXT_WHITE,
              }}
            />
          </div>
        </div>
        <div style={{ fontSize: 12, color: TEXT_GRAY, marginTop: 12 }}>
          {eventDate}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: TEXT_WHITE,
            marginTop: 2,
          }}
        >
          {eventName}
        </div>
        <div style={{ fontSize: 12, color: TEXT_GRAY, marginTop: 2 }}>
          {venue}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1c1c1e",
            marginBottom: 4,
          }}
        >
          Post on Social Media
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
          Build hype for the event, and share that you got tickets with
          your friends and family.
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
            padding: "14px 16px",
            fontSize: 14,
            fontWeight: 700,
            color: "#1c1c1e",
            cursor: "pointer",
          }}
        >
          <span>Share You're Going</span>
          <ShareIcon size={16} color="#1c1c1e" />
        </button>
      </div>
    </div>
  );

  return (
    <div style={page}>
      <style>{`
        @keyframes tm-spin { to { transform: rotate(360deg); } }
        .tm-map-preview .leaflet-control-container { display: none; }
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
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <TicketIcon size={13} />
                  x{seatList.length}
                </span>
              </div>
            </div>

            <div style={{ padding: "10px 16px" }}>
              <button
                onClick={() => setScreen("receipt")}
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
                <TicketIcon size={15} color="#fff" />
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
              <div
                style={{
                  position: "relative",
                  height: 140,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#e9e9ee",
                }}
              >
                {/* Real Leaflet/OpenStreetMap tiles. Interaction is disabled
                    here (dragging/zoom/scroll) since this is just a preview
                    card — a transparent click-catcher on top opens the full
                    interactive map overlay instead. */}
                <MapContainer
                  center={[venueLat, venueLng]}
                  zoom={14}
                  style={{ width: "100%", height: "100%" }}
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                  boxZoom={false}
                  keyboard={false}
                  attributionControl={false}
                  className="tm-map-preview"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[venueLat, venueLng]} icon={venuePinIcon} />
                </MapContainer>

                <div
                  onClick={() => setShowMoreOptions(true)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 500,
                    cursor: "pointer",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 12,
                    zIndex: 500,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1c1c1e",
                    background: "rgba(255,255,255,0.85)",
                    padding: "3px 8px",
                    borderRadius: 4,
                    pointerEvents: "none",
                  }}
                >
                  {venueMapLabel}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 500,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 6,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    pointerEvents: "none",
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

              {/* "Get Directions" now shows directly under the map preview
                  on the main order screen (not just after opening the
                  full-screen overlay). Tapping it opens the same overlay. */}
              <button
                onClick={() => setShowMoreOptions(true)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "#f0f0f2",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1c1c1e",
                  cursor: "pointer",
                }}
              >
                Get Directions
              </button>
            </div>

            {/* ---------------- YOU GOT TICKETS / SHARE CARD (always visible) ---------------- */}
            <div style={{ padding: "0 16px 20px" }}>{youGotTicketsCard}</div>

            {/* Full-screen map / "you got tickets" overlay, rendered via portal
                so it truly covers the whole viewport regardless of ancestors */}
            {showMoreOptions &&
              createPortal(
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 6000,
                    background: "#fff",
                    overflowY: "auto",
                  }}
                >
                  {/* Fully interactive map: real pan/zoom, starts centered
                      and zoomed on the venue */}
                  <div
                    style={{
                      position: "relative",
                      height: 220,
                      background: "#e9e9ee",
                    }}
                  >
                    <MapContainer
                      center={[venueLat, venueLng]}
                      zoom={15}
                      style={{ width: "100%", height: "100%" }}
                      attributionControl={true}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[venueLat, venueLng]} icon={venuePinIcon} />
                    </MapContainer>

                    <button
                      onClick={() => setShowMoreOptions(false)}
                      aria-label="Close map"
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        zIndex: 500,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      background: "#f0f0f2",
                      border: "none",
                      borderBottom: "1px solid #e5e5e5",
                      padding: "14px 0",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1c1c1e",
                      cursor: "pointer",
                    }}
                  >
                    Get Directions
                  </button>

                  {youGotTicketsCard}
                </div>,
                document.body
              )}

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

        {/* ---------------- SCREEN 1b: RECEIPT ---------------- */}
        {screen === "receipt" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <button
                onClick={() => setScreen("order")}
                style={{
                  background: "none",
                  border: "none",
                  color: TEXT_WHITE,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>‹</span> Back
              </button>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_WHITE }}>
                Receipt
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_WHITE }}>
                Help
              </span>
            </div>

            <div style={{ padding: "0 20px 30px" }}>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_WHITE }}>
                  Order #{orderNumber}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    color: TEXT_GRAY,
                    marginTop: 4,
                  }}
                >
                  ORDER DATE: {orderDate}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${BORDER_DARK}`, paddingTop: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_WHITE, marginBottom: 4 }}>
                  {eventName}
                </div>
                <div style={{ fontSize: 13, color: TEXT_GRAY }}>{venue}</div>
                <div style={{ fontSize: 13, color: TEXT_GRAY }}>{eventDate}</div>
              </div>

              <div style={{ borderTop: `1px solid ${BORDER_DARK}`, paddingTop: 16, marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE, marginBottom: 10 }}>
                  Tickets
                </div>
                {seatList.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: TEXT_WHITE }}>
                        {ticketTypeLabel}
                      </div>
                      <div style={{ fontSize: 11, color: TEXT_GRAY, marginTop: 2 }}>
                        Section {section} Row {row} Seat {s.id}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TEXT_WHITE }}>
                      ${ticketPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: CARD_DARK,
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_WHITE }}>
                  Subtotal
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_WHITE }}>
                  ${(ticketPrice * seatList.length).toFixed(2)}
                </span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT_WHITE, marginBottom: 8 }}>
                  Delivery
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: TEXT_GRAY,
                    marginBottom: 4,
                  }}
                >
                  <span>Mobile App Only</span>
                  <span>FREE</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: TEXT_GRAY,
                  }}
                >
                  <span>Fees</span>
                  <span>${feesAmount.toFixed(2)}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: CARD_DARK,
                  borderRadius: 6,
                  padding: "12px 14px",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_WHITE }}>
                  Total
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: TEXT_WHITE }}>
                  ${(ticketPrice * seatList.length + feesAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 2: AUTH LOADING ---------------- */}
        {screen === "authLoading" && (
          <div>
            {authHeader}
            <div
              style={{
                background: BG_DARK,
                minHeight: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GradientSpinner size={40} />
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
                <span style={{ fontSize: 12, color: TEXT_GRAY, display: "flex", alignItems: "center", gap: 4 }}>
                  <TicketIcon size={12} />
                  {seatList.length} tickets
                </span>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
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
                        gap: 8,
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
                          background: BLUE,
                          color: "#fff",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          border: `2px solid ${isSelected ? BLUE : BORDER_DARK}`,
                          background: isSelected ? BLUE : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isSelected && (
                          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
                            ✓
                          </span>
                        )}
                      </span>
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