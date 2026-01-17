import heroImage from "../assets/singapore.jpeg";
import ticket1 from "../assets/SING1.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";

const TicketsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);

  const tickets = [
    { name: "VIP", price: "$399" },
    { name: "CAT1", price: "$349" },
    { name: "CAT2", price: "$319" },
    { name: "CAT3", price: "$289" },
    { name: "CAT4", price: "$259" },
    { name: "CAT5", price: "$229" },
    { name: "CAT6", price: "$199" },
  ];

  const counterBtn = {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };

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

    // Step 1: Collect name & email
    Swal.fire({
      title: "Enter Ticket Details",
      html: `
        <input id="name" class="swal2-input" placeholder="Full Name" />
        <input id="email" type="email" class="swal2-input" placeholder="Email Address" />
        <p style="font-size:13px;color:#666">Tickets will be sent to this email</p>
      `,
      confirmButtonText: "Continue",
      confirmButtonColor: "#026cdf",
      focusConfirm: false,
      width: "90%",
      customClass: { popup: "swal2-popup-mobile" },
      preConfirm: () => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        if (!name || !email) {
          Swal.showValidationMessage("Please enter name and email");
          return;
        }
        return { name, email };
      },
    }).then((result) => {
      if (!result.isConfirmed || !result.value) return;

      setUserDetails(result.value);

      const ticketSummary = selectedTickets.map(([name, qty]) => `${name} x${qty}`).join(", ");
      const totalAmount = selectedTickets.reduce((sum, [name, qty]) => {
        const price = parseInt(tickets.find(t => t.name === name)!.price.replace("$", ""));
        return sum + price * qty;
      }, 0);

      // Step 2: Payment method
      Swal.fire({
        title: "Choose Payment Method",
        html: `
          <div style="display:flex;flex-direction:column;gap:1rem">
            <button id="paypalBtn" style="
              display:flex;align-items:center;gap:1rem;
              padding:12px;border:none;border-radius:8px;
              background:#003087;color:white;font-weight:600;
              cursor:pointer">
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="30"/>
              Pay with PayPal
            </button>

            <button id="bankBtn" style="
              display:flex;align-items:center;gap:1rem;
              padding:12px;border:none;border-radius:8px;
              background:#16a34a;color:white;font-weight:600;
              cursor:pointer">
              <img src="https://cdn-icons-png.flaticon.com/512/338/338391.png" height="30"/>
              Bank Transfer
            </button>
          </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 360,
        didOpen: () => {
          const showPaymentDetails = (method: "PayPal" | "Bank") => {
            Swal.fire({
              title: `${method} Payment`,
              html: `
                <p><strong>Your Tickets:</strong> ${ticketSummary}</p>
                <p><strong>Total Amount:</strong> $${totalAmount}</p>
                <p><strong>Payment Method:</strong> ${method}</p>
                <p><strong>Email:</strong> ${result.value.name} (${result.value.email})</p>
                ${
                  method === "Bank"
                    ? "<p><strong>Account:</strong> 123456789, Global Bank</p>"
                    : ""
                }
                <input type="file" id="proofInput" accept="image/*" style="margin-top:10px"/>
                <p style="font-size:12px;color:#555">Upload proof of payment here</p>
              `,
              confirmButtonText: "Upload Proof",
              confirmButtonColor: "#026cdf",
              preConfirm: () => {
                const fileInput = document.getElementById("proofInput") as HTMLInputElement;
                if (fileInput?.files && fileInput.files[0]) return fileInput.files[0];
                Swal.showValidationMessage("Please select a file to upload");
                return;
              },
            }).then((uploadResult) => {
              if (uploadResult.isConfirmed && uploadResult.value) {
                setProofOfPayment(uploadResult.value as File);
                Swal.fire({
                  icon: "success",
                  title: "Proof Uploaded",
                  text: "Your proof of payment has been uploaded successfully!",
                  confirmButtonColor: "#026cdf",
                });
              }
            });
          };

          // Attach events
          document.getElementById("paypalBtn")?.addEventListener("click", () => showPaymentDetails("PayPal"));
          document.getElementById("bankBtn")?.addEventListener("click", () => showPaymentDetails("Bank"));
        },
      });
    });

    setIsModalOpen(false);
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
        <div style={{ width: "100%", maxWidth: "800px", position: "relative" }}>
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
            <p style={{ marginTop: "2rem", fontWeight: 600, textAlign: "center" }}>
              Booking for: {userDetails.name} ({userDetails.email})
            </p>
          )}

          {/* Display uploaded proof info */}
          {proofOfPayment && (
            <p style={{ marginTop: "1rem", textAlign: "center", color: "#16a34a" }}>
              Proof of payment uploaded: {proofOfPayment.name}
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
              width: "90%",
              maxWidth: "360px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              fontFamily: "Inter, Arial, sans-serif",
            }}
          >
            <h2 style={{ marginBottom: "1rem", color: "#026cdf", fontSize: "20px", fontWeight: 700, textAlign: "center" }}>
              Select Your Tickets
            </h2>

            {/* Ticket List */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {tickets.map((t) => {
                const count = ticketCounts[t.name] || 0;
                return (
                  <li key={t.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: "13px", color: "#666" }}>{t.price}</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button onClick={() => setTicketCounts((p) => ({ ...p, [t.name]: Math.max(count - 1, 0) }))} style={counterBtn}>−</button>
                      <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 600 }}>{count}</span>
                      <button onClick={() => setTicketCounts((p) => ({ ...p, [t.name]: count + 1 }))} style={{ ...counterBtn, background: "#026cdf", color: "#fff" }}>+</button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Live total */}
            {Object.values(ticketCounts).some(q => q > 0) && (
              <p style={{ fontWeight: 600, marginTop: "1rem", textAlign: "center" }}>
                Total: $
                {Object.entries(ticketCounts)
                  .reduce((sum, [name, qty]) => {
                    const price = parseInt(tickets.find(t => t.name === name)!.price.replace("$", ""));
                    return sum + price * qty;
                  }, 0)}
              </p>
            )}

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <button onClick={handleConfirm} style={{ flex: 1, padding: "12px", background: "#026cdf", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>Confirm</button>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: "12px", background: "#f1f1f1", color: "#333", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
