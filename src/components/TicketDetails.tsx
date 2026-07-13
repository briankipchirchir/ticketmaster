import { useNavigate } from "react-router-dom";
import TicketTransferFlow from "./TicketTransferFlow";
import BTS from "../assets/BTS1.jpeg";

export default function TicketDetails() {
  const navigate = useNavigate();

  return (
    <TicketTransferFlow
      eventImage={BTS}
      eventName="BTS WORLD TOUR 'ARIRANG' IN PARIS"
      eventDate="Fri, Jul 17, 2026 · 20:00"
      venue="Stade de France"
      orderNumber="57-75274/INB"
      section="118"
      row="9"
      seatList={[{ id: 17, label: "SEAT 17" }, { id: 18, label: "SEAT 18" }]}
      onClose={() => navigate("/admin")}
    />
  );
}