import { useParams, useNavigate } from "react-router-dom";
import TicketTransferFlow from "./TicketTransferFlow";
import { ORDERS, findTicketById } from "../data/ticketsData";

export default function TicketTransferPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const ticket = findTicketById(ticketId);
  const order = ORDERS.find((o) => o.items.some((i) => i.id === ticketId));

  if (!ticket || !order) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#0d0d0f",
          color: "#fff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700 }}>Ticket not found</div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#026cdf",
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

  // TicketTransferFlow expects one seat list for the whole order, so every
  // sibling ticket in this order becomes one selectable seat
  const seatList = order.items.map((item) => ({
    id: item.id,
    label: item.seatInfoShort.split("\n")[0] || item.section,
  }));

  return (
    <TicketTransferFlow
      eventName={ticket.eventName}
      eventDate={ticket.date}
      venue={ticket.venue}
      venueMapLabel={ticket.venue}
      orderNumber={order.orderNo}
      ticketTypeLabel={ticket.ticketCategory}
      section={ticket.section}
      row={ticket.ticketInfoLines[0] ?? ""}
      seatList={seatList}
      onClose={() => navigate("/purchase-history")}
    />
  );
}