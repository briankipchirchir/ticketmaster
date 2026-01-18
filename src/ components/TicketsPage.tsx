import heroImage from "../assets/singapore.jpeg";
import ticket1 from "../assets/SING1.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";
import williHero from "../assets/willi.jpeg";
import { useParams } from "react-router-dom";


const EVENTS = {
  seventeen: {
    title: "Seventeen World Tour Singapore",
    heroImage: heroImage,
    ticketImage: ticket1,
    tickets: [
      { name: "VIP", price: "$379" },
      { name: "CAT1", price: "$329" },
      { name: "CAT2", price: "$299" },
      { name: "CAT3", price: "$269" },
      { name: "CAT4", price: "$239" },
      { name: "CAT5", price: "$209" },
      { name: "CAT6", price: "$179" },
    ],
  },

  willi: {
    title: "WILLIAMEST – 1st Fan Meeting “Echo Resonance”",
    heroImage: williHero,
    ticketImage: williHero,
    tickets: [
      { name: "VIP", price: "$320" },
      { name: "CAT1", price: "$250" },
      { name: "CAT2", price: "$200" },
      { name: "CAT3", price: "$99" },
    ],
  },
};


const TicketsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const { eventId } = useParams<{ eventId: keyof typeof EVENTS }>();
const event = EVENTS[eventId || "seventeen"];


  // const tickets = [
  //   { name: "VIP", price: "$379" },
  //   { name: "CAT1", price: "$329" },
  //   { name: "CAT2", price: "$299" },
  //   { name: "CAT3", price: "$269" },
  //   { name: "CAT4", price: "$239" },
  //   { name: "CAT5", price: "$209" },
  //   { name: "CAT6", price: "$179" },
  // ];

  const tickets = event.tickets;


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
        <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;">
          <input id="name" class="swal2-input" placeholder="Full Name" style="width:100%; box-sizing:border-box; font-size:14px; padding:10px;" />
          <input id="email" type="email" class="swal2-input" placeholder="Email Address" style="width:100%; box-sizing:border-box; font-size:14px; padding:10px;" />
          <p style="font-size:13px;color:#666; margin:0;">Tickets will be sent to this email</p>
        </div>
      `,
      confirmButtonText: "Continue",
      confirmButtonColor: "#026cdf",
      focusConfirm: false,
      width: "90%",
      customClass: { popup: "swal2-popup-mobile" },
      preConfirm: () => {
        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
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
              cursor:pointer; width:100%;">
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="30"/>
              Pay with PayPal
            </button>

            <button id="bankBtn" style="
              display:flex;align-items:center;gap:1rem;
              padding:12px;border:none;border-radius:8px;
              background:#16a34a;color:white;font-weight:600;
              cursor:pointer; width:100%;">
              <img src="https://cdn-icons-png.flaticon.com/512/338/338391.png" height="30"/>
              Bank Transfer
            </button>

          <button
  id="btcBtn"
  style="
    margin-bottom:10px;
    width:100%;
    padding:12px;
    background:#f7931a;
    color:white;
    border:none;
    border-radius:8px;
    font-weight:600;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:center;
  "
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
    height="24"
    alt="BTC"
  />
  Pay with Bitcoin (BTC)
</button>

          </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: "90%",
       didOpen: () => {
  const showPaymentDetails = (method: "PayPal" | "Bank" | "BTC") => {
    // Determine payment info
    let title = method === "BTC" ? "Bitcoin Payment" : `${method} Payment`;
    let paymentIcon = "";
    let extraInfo = "";

    if (method === "PayPal") {
      paymentIcon = "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg";
      extraInfo = `<p><strong>PayPal Email Account to pay to:</strong>jeffclark5050@gmail.com</p>`;
    } else if (method === "Bank") {
      paymentIcon = "https://cdn-icons-png.flaticon.com/512/338/338391.png";
      extraInfo = "<p><strong>Account:</strong>USE PAYPAL OR BTC</p>";
    } else if (method === "BTC") {
      paymentIcon = "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"; // BTC logo
      extraInfo = `<p><strong>BTC Address:</strong> <span id="btcAddress" style="user-select: all;">bc1qj45p6z2pehsjhvak42e5q4jzrlugta4vsah0up</span></p>
                   <button id="copyBtc" style="padding:6px 12px;background:#f7931a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;margin-top:5px;">Copy Address</button>
                   <p style="font-size:12px;color:#555;margin-top:5px;">Send BTC to this address</p>`;
    }

    Swal.fire({
      title: `<span style="color:#026cdf">${title}</span>`,
      html: `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <img src="${paymentIcon}" height="40" />
          <span style="font-weight:600;font-size:16px">${method}</span>
        </div>
        <p><strong>Your Tickets:</strong> ${ticketSummary}</p>
        <p style="font-weight:600;font-size:16px;color:green;"><strong>Total Amount:</strong> $${totalAmount}</p>
        <p><strong>Email :</strong> ${result.value.name} (${result.value.email})</p>
        ${extraInfo}
        <input type="file" id="proofInput" accept="image/*" style="margin-top:10px;width:100%;" />
        <p style="font-size:12px;color:#555">After paying, upload proof of payment here</p>
      `,
      confirmButtonText: "Upload Proof",
      confirmButtonColor: "#026cdf",
      width: "90%",
      didOpen: () => {
        if (method === "BTC") {
          document.getElementById("copyBtc")?.addEventListener("click", (e) => {
            e.preventDefault(); 
            e.stopPropagation();
            const btcEl = document.getElementById("btcAddress");
            if (btcEl) navigator.clipboard.writeText(btcEl.textContent || "");
            Swal.fire({
              icon: "success",
              title: "Copied!",
              text: "BTC address copied to clipboard",
              confirmButtonColor: "#026cdf",
            });
          });
        }
      },
      preConfirm: async () => {
        const fileInput = document.getElementById("proofInput") as HTMLInputElement;
        if (fileInput?.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          const formData = new FormData();
          formData.append("name", result.value.name);
          formData.append("email", result.value.email);
          formData.append("tickets", ticketSummary);
          formData.append("amount", totalAmount.toString());
          formData.append("file", file);

          try {
            const res = await fetch("https://ticketmasterb.onrender.com/api/proof", {
              method: "POST",
              body: formData,
            });
            if (!res.ok) throw new Error("Upload failed");
            await res.json();
            return file;
          } catch (err) {
            Swal.showValidationMessage("Failed to upload proof. Try again.");
          }
        } else {
          Swal.showValidationMessage("Please select a file to upload");
        }
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

  // Attach click events
  document.getElementById("paypalBtn")?.addEventListener("click", () => showPaymentDetails("PayPal"));
  document.getElementById("bankBtn")?.addEventListener("click", () => showPaymentDetails("Bank"));
  document.getElementById("btcBtn")?.addEventListener("click", () => showPaymentDetails("BTC"));
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
          <h1>Tickets for {event.title}</h1>

          <p>Get your tickets below</p>
        </div>
      </section>

      {/* Ticket Image */}
      <section style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px", position: "relative" }}>
          <img src={event.ticketImage} style={{ width: "100%", borderRadius: "8px" }} />
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
              maxHeight: "90vh",
              overflowY: "auto",
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
