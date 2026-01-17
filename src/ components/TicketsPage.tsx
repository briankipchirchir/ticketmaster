import heroImage from "../assets/singapore.jpeg";
import ticket1 from "../assets/SING1.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";

const TicketsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

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
    const selectedTickets = Object.entries(ticketCounts).filter(
      ([_, qty]) => qty > 0
    );

    if (selectedTickets.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select a ticket",
        text: "Please choose at least one ticket before confirming",
        confirmButtonColor: "#026cdf",
      });
      return;
    }

    const ticketSummary = selectedTickets
      .map(([name, qty]) => `${name} x${qty}`)
      .join(", ");

    // 🔹 STEP 1: COLLECT NAME & EMAIL
    Swal.fire({
  title: "Enter Ticket Details",
  html: `
    <input id="name" class="swal2-input" placeholder="Full Name" />
    <input id="email" type="email" class="swal2-input" placeholder="Email Address" />
    <p style="font-size:13px;color:#666">
      Tickets will be sent to this email
    </p>
  `,
  confirmButtonText: "Continue",
  confirmButtonColor: "#026cdf",
  focusConfirm: false,
  width: '90%', // ✅ makes it adapt on mobile
  customClass: {
    popup: 'swal2-popup-mobile' // optional for extra CSS
  },
  preConfirm: () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;

    if (!name || !email) {
      Swal.showValidationMessage("Please enter name and email");
      return;
    }

    return { name, email };
  },
});


    setIsModalOpen(false);
  };
  const counterBtn = {
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};


  return (
    <div style={{ paddingTop: "120px" }}>
      {/* Hero */}
      <section
        style={{
          height: "300px",
          background: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${heroImage}) center/cover`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div>
          <h1>Tickets for Seventeen World Tour Singapore</h1>
          <p>Get your tickets below</p>
        </div>
      </section>

      {/* Ticket Image */}
      <section style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "800px", position: "relative" }}>
          <img src={ticket1} style={{ width: "100%", borderRadius: "8px" }} />
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 15px",
              background: "#026cdf",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            GET TICKET
          </button>

           {/* Display booked user info */}
  {userDetails.name && (
    <p style={{ marginTop: "3rem", fontWeight: 600, textAlign: "center", width: "100%" }}>
      Booking for: {userDetails.name} ({userDetails.email})
    </p>
  )}
        </div>
      </section>

     {/* Ticket Modal */}
{isModalOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(3px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "1.75rem",
        borderRadius: "14px",
        width: "360px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h2
        style={{
          marginBottom: "1rem",
          color: "#026cdf",
          fontSize: "20px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Select Your Tickets
      </h2>

      {/* Ticket List */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tickets.map((t) => {
          const count = ticketCounts[t.name] || 0;
          return (
            <li
              key={t.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>{t.price}</div>
              </div>

              {/* Counter */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() =>
                    setTicketCounts((p) => ({
                      ...p,
                      [t.name]: Math.max(count - 1, 0),
                    }))
                  }
                  style={counterBtn}
                >
                  −
                </button>

                <span
                  style={{
                    minWidth: "20px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {count}
                </span>

                <button
                  onClick={() =>
                    setTicketCounts((p) => ({
                      ...p,
                      [t.name]: count + 1,
                    }))
                  }
                  style={{ ...counterBtn, background: "#026cdf", color: "#fff" }}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleConfirm}
          style={{
            flex: 1,
            padding: "12px",
            background: "#026cdf",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Confirm
        </button>

        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            flex: 1,
            padding: "12px",
            background: "#f1f1f1",
            color: "#333",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TicketsPage;
