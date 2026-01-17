import heroImage from "../assets/singapore.jpeg";
import ticket1 from "../assets/SING1.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";

const TicketsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});

  const tickets = [
    { name: "VIP", price: "$399" },
    { name: "CAT1", price: "$349" },
    { name: "CAT2", price: "$319" },
    { name: "CAT3", price: "$289" },
    { name: "CAT4", price: "$259" },
    { name: "CAT5", price: "$229" },
    { name: "CAT6", price: "$199" },
  ];

  const handleConfirm = () => {
    const selectedTickets = Object.entries(ticketCounts).filter(([_, qty]) => qty > 0);
    if (selectedTickets.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select a ticket",
        text: "Please choose at least one ticket before confirming",
        confirmButtonColor: "#026cdf",
      });
      return;
    }

    const ticketSummary = selectedTickets.map(([name, qty]) => `${name} x${qty}`).join(", ");

    Swal.fire({
      icon: "success",
      title: "Tickets Selected!",
      text: `You selected: ${ticketSummary}`,
      confirmButtonColor: "#026cdf",
    }).then(() => {
      // Payment method modal
      Swal.fire({
        title: "Choose Payment Method",
        html: `
          <div style="display:flex; flex-direction:column; gap:1rem; text-align:left;">
            <button id="paypalBtn" style="
              display:flex; align-items:center; gap:1rem; width:100%; padding:12px; border:none; border-radius:8px; 
              background:#003087; color:white; font-weight:600; cursor:pointer;">
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" style="height:30px;">
              Pay with PayPal
            </button>
            <button id="bankBtn" style="
              display:flex; align-items:center; gap:1rem; width:100%; padding:12px; border:none; border-radius:8px; 
              background:#16a34a; color:white; font-weight:600; cursor:pointer;">
              <img src="https://cdn-icons-png.flaticon.com/512/338/338391.png" alt="Bank" style="height:30px;">
              Bank Transfer
            </button>
          </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 360,
        background: "#f9f9f9",
        backdrop: true,
      }).then(() => {
        const paypalBtn = document.getElementById("paypalBtn");
        const bankBtn = document.getElementById("bankBtn");

        paypalBtn?.addEventListener("click", () => {
          Swal.fire({
            icon: "success",
            title: "PayPal Selected",
            text: "You will be redirected to PayPal for payment.",
            confirmButtonColor: "#003087",
          });
        });

        bankBtn?.addEventListener("click", () => {
          Swal.fire({
            icon: "info",
            title: "Bank Transfer Selected",
            html: `
              <p>Please transfer the amount to:</p>
              <p><strong>Account Name:</strong> TicketMaster Ltd</p>
              <p><strong>Account Number:</strong> 123456789</p>
              <p><strong>Bank:</strong> Global Bank</p>
              <p>Use your ticket name as reference.</p>
            `,
            confirmButtonColor: "#16a34a",
          });
        });
      });
    });

    setIsModalOpen(false);
  };

  return (
    <div style={{ paddingTop: "120px" }}>
      {/* Hero Section */}
      <section
        style={{
          height: "300px",
          backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Tickets for Seventeen World Tour Singapore</h1>
          <p>Get your tickets below</p>
        </div>
      </section>

      {/* Ticket Image */}
      <section
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "800px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <img
            src={ticket1}
            alt="Ticket 1"
            style={{ width: "100%", display: "block" }}
          />
          <button
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 15px",
              backgroundColor: "#026cdf",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              opacity: 0.95,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            GET TICKET
          </button>
        </div>
      </section>

      {/* Ticket Selection Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "12px",
              width: "360px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <h2 style={{ marginBottom: "1rem", color: "#026cdf" }}>
              Select Your Tickets
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tickets.map((ticket) => {
                const count = ticketCounts[ticket.name] || 0;
                return (
                  <li
                    key={ticket.name}
                    style={{
                      margin: "8px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "left" }}>
                      {ticket.name} - {ticket.price}
                    </span>
                    <button
                      style={{ padding: "4px 8px" }}
                      onClick={() =>
                        setTicketCounts((prev) => ({
                          ...prev,
                          [ticket.name]: Math.max((prev[ticket.name] || 0) - 1, 0),
                        }))
                      }
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      style={{ padding: "4px 8px" }}
                      onClick={() =>
                        setTicketCounts((prev) => ({
                          ...prev,
                          [ticket.name]: (prev[ticket.name] || 0) + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  flex: 1,
                  marginRight: "0.5rem",
                  padding: "10px 0",
                  backgroundColor: "#026cdf",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                style={{
                  flex: 1,
                  marginLeft: "0.5rem",
                  padding: "10px 0",
                  backgroundColor: "#f1f1f1",
                  color: "#111",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
