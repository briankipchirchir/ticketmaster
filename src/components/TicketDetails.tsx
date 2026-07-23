import { useNavigate } from "react-router-dom";
import TicketTransferFlow from "./TicketTransferFlow";
import BTS from "../assets/BTS1.jpeg";

export default function TicketDetails() {
  const navigate = useNavigate();

  return (
    <TicketTransferFlow
      eventImage={BTS}
      eventName="BTS WORLD TOUR 'ARIRANG' IN LOS ANGELES"
      eventDate="SAT, SEP 05, 2026, 08:00 PM"
      venue="SoFi Stadium — Inglewood, CA"
      venueMapLabel="SoFi Stadium"
      orderNumber="52-286815/CA"
      ticketTypeLabel="SOUNDCHECK VIP PACKAGE"
      section="FLR A1"
      row="5"
      seatList={[
        { id: 1, label: "SEAT 1" },
        { id: 2, label: "SEAT 2" },
        { id: 3, label: "SEAT 3" },
        { id: 4, label: "SEAT 4" },
      ]}
      onClose={() => navigate("/admin")}
    />
  );
}