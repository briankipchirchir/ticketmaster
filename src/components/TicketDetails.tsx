import { useNavigate } from "react-router-dom";
import TicketTransferFlow from "./TicketTransferFlow";
import BTS from "../assets/BTS1.jpeg";

export default function TicketDetails() {
  const navigate = useNavigate();

  return (
    <TicketTransferFlow
      eventImage={BTS}
      eventName="BTS WORLD TOUR 'ARIRANG' IN LOS ANGELES"
      eventDate="Tue, SEP 01, 2026, 08:00 PM"
      venue="SoFi Stadium — Inglewood, CA"
      venueMapLabel="SoFi Stadium"
      orderNumber="52-286815/CA"
      ticketTypeLabel="SOUNDCHECK VIP PACKAGE"
      section="B3"
      row="1"
      seatList={[
        { id: 7, label: "SEAT 7" },
        // { id: 16, label: "SEAT 16" },
        // { id: 3, label: "SEAT 3" },
        // { id: 4, label: "SEAT 4" },
      ]}
      onClose={() => navigate("/admin")}
    />
  );
}