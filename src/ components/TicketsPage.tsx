
import decadeImage from "../assets/Decade.jpeg";
import williHero from "../assets/BTS.jpeg";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";

import kualarImage from "../assets/kualar.jpeg"
import singaporeImage from "../assets/Singapore.jpeg"

const EVENTS = {
  seventeen: {
    title: "The Decade 10th Anniversary Singapore",
    heroImage:decadeImage,
    ticketImage: decadeImage,
    tickets: [
      { name: "VIP Standing", price: "$280" },
      { name: "Vip Seated", price: "$250" },
      { name: "CAT1", price: "$238" },
      { name: "CAT2", price: "$228" },
      { name: "CAT3", price: "$220" },
      { name: "CAT4", price: "$200" },
      { name: "CAT5", price: "$120" },
      { name: "CAT6 Restricted view", price: "$180" },
      { name: "CAT7", price: "$100" },
    ],
  },
  willi: {
    title: "BTS World Tour",
    heroImage: williHero,
    ticketImage: williHero,
    tickets: [
      { name: "Pitch / Floor VIP", price: "$600" },
      { name: "Lower Bowl – Section 505/510", price: "$570" },
      { name: "Lower Bowl – Section 510/519", price: "$455" },
      { name: "Lower Bowl – Section 323/324", price: "$450" },
      { name: "Mid Bowl – Section 322/325", price: "$439" },
      { name: "Upper Bowl – Section 322/522", price: "$322" },
      { name: "Upper Bowl – Section 530", price: "$245" },
      { name: "Upper Bowl – Section 453/514", price: "$200" },
    ],
  },
    kualar: {
    title: "The Decade 10th Anniversary Singapore",
    heroImage:kualarImage,
    ticketImage: kualarImage,
    tickets: [
      { name: "VIP Standing", price: "RM700" },
      { name: "CAT1 Front Standing", price: "RM600" },
      { name: "CAT2 Standing ", price: "RM400" },
      { name: "CAT3 Premium Seating (Upper Level)", price: "RM450" },
      { name: "CAT4 Seating(Upper Level)", price: "RM250" },
    ],
  },
    singa: {
    title: "Together As One Fan Con Singapore",
    heroImage:singaporeImage,
    ticketImage: singaporeImage,
    tickets: [
      { name: "ZONE A", price: "SGD290" },
      { name: "ZONE B", price: "SGD200" },
      { name: "ZONE C", price: "SGD130" },
      { name: "ZONE D", price: "SGD89" },
     
    ],
  }
};

const TicketsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);

  const { eventId } = useParams<{ eventId: keyof typeof EVENTS }>();
  const location = useLocation();
  const state = location.state as { selectedStop?: { city: string; country: string; date: string } } | undefined;
  const selectedStop = state?.selectedStop;

  const event = EVENTS[eventId || "seventeen"];
  const tickets = event.tickets;

  const counterBtn = {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

 const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
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

  Swal.fire({
    title: `<span style="color:#026cdf">Enter Ticket Details</span>`,
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
        <input id="name" class="swal2-input" placeholder="Full Name" style="width:280px; max-width:90%; font-size:14px; padding:10px; box-sizing:border-box;" />
        <input id="email" type="email" class="swal2-input" placeholder="Email Address" style="width:280px; max-width:90%; font-size:14px; padding:10px; box-sizing:border-box;" />
        <p style="font-size:13px;color:#666; margin:0;">Tickets will be sent to this email</p>
      </div>
    `,
    confirmButtonText: "Continue",
    confirmButtonColor: "#026cdf",
    focusConfirm: false,
    width: "350px",
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

    // ✅ Fixed: uses parsePrice instead of .replace("$", "")
    const totalAmount = selectedTickets.reduce((sum, [name, qty]) => {
      const price = parsePrice(tickets.find(t => t.name === name)!.price);
      return sum + price * qty;
    }, 0);

    // Detect currency symbol from first ticket price
    const firstPrice = tickets[0]?.price || "$";
    const currencySymbol = firstPrice.startsWith("RM") ? "RM" : "$";

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
          <button id="btcBtn" style="
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
            justify-content:center;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" height="24" alt="BTC"/>
            Pay with Bitcoin (BTC)
          </button>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      width: "90%",
      didOpen: () => {
        const showPaymentDetails = (method: "PayPal" | "Bank" | "BTC") => {
          let title = method === "BTC" ? "Bitcoin Payment" : `${method} Payment`;
          let paymentIcon = "";
          let extraInfo = "";

          if (method === "PayPal") {
            paymentIcon = "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg";
            extraInfo = `<p><strong>PayPal Email Account to pay to:</strong> patriciakithao@gmail.com</p>`;
          } else if (method === "Bank") {
            paymentIcon = "https://cdn-icons-png.flaticon.com/512/338/338391.png";
            extraInfo = "<p><strong>Account:</strong> USE PAYPAL OR BTC</p>";
          } else if (method === "BTC") {
            paymentIcon = "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg";
            extraInfo = `
              <p><strong>BTC Address:</strong> <span id="btcAddress" style="user-select:all;">bc1qj45p6z2pehsjhvak42e5q4jzrlugta4vsah0up</span></p>
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
              <p><strong>Event:</strong> ${event.title}</p>
              <p><strong>Your Tickets:</strong> ${ticketSummary}</p>
              <p style="font-weight:600;font-size:16px;color:green;">
                <strong>Total Amount:</strong> ${currencySymbol}${totalAmount}
              </p>
              <p><strong>Name:</strong> ${result.value.name} (${result.value.email})</p>
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
                formData.append("paymentMethod", method);
                formData.append("eventName", event.title); // ✅ event name included

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
                text: "Your proof of payment has been uploaded successfully. Your ticket will be sent to your email after verification!",
                confirmButtonColor: "#026cdf",
              });
            }
          });
        };

        document.getElementById("paypalBtn")?.addEventListener("click", () => showPaymentDetails("PayPal"));
        document.getElementById("bankBtn")?.addEventListener("click", () => showPaymentDetails("Bank"));
        document.getElementById("btcBtn")?.addEventListener("click", () => showPaymentDetails("BTC"));
      },
    });
  });

  setIsModalOpen(false);
};

  return (
    <div style={{ paddingTop: "100px", fontFamily: "Inter, Arial, sans-serif" }}>
      
      {/* Hero Section */}
      <section
        style={{
          minHeight: "50vh",
          background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${event.heroImage}) center/cover`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(24px, 6vw, 40px)", marginBottom: "0.5rem" }}>
            Tickets for {event.title}
          </h1>
          <p style={{ fontSize: "clamp(14px, 4vw, 18px)" }}>
            {selectedStop ? `${selectedStop.city}, ${selectedStop.country} (${selectedStop.date})` : "Get your tickets below"}
          </p>
        </div>
      </section>

      {/* Ticket Image + Button */}
      <section style={{ padding: "2rem 1rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px", position: "relative" }}>
          <img
            src={event.ticketImage}
            alt={event.title}
            style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "14px 24px",
              background: "#026cdf",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(2,108,223,0.4)",
              transition: "all 0.2s ease",
            }}
          >
            GET TICKET
          </button>

          {/* Booking info */}
          {userDetails.name && (
            <p style={{ marginTop: "1.5rem", fontWeight: 600, textAlign: "center" }}>
              Booking for: {userDetails.name} ({userDetails.email})
            </p>
          )}
          {proofOfPayment && (
            <p style={{ marginTop: "0.5rem", textAlign: "center", color: "#16a34a" }}>
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
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
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
                      padding: "12px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: "14px", color: "#666" }}>{t.price}</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() =>
                          setTicketCounts((p) => ({ ...p, [t.name]: Math.max(count - 1, 0) }))
                        }
                        style={counterBtn}
                      >
                        −
                      </button>
                      <span style={{ minWidth: "24px", textAlign: "center", fontWeight: 600 }}>{count}</span>
                      <button
                        onClick={() => setTicketCounts((p) => ({ ...p, [t.name]: count + 1 }))}
                        style={{ ...counterBtn, background: "#026cdf", color: "#fff" }}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

           {/* Live total */}
{Object.values(ticketCounts).some((q) => q > 0) && (
  <p style={{ fontWeight: 600, marginTop: "1rem", textAlign: "center" }}>
    Total: {tickets[0]?.price.startsWith("RM") ? "RM" : "$"}
    {Object.entries(ticketCounts).reduce((sum, [name, qty]) => {
      const price = parsePrice(tickets.find((t) => t.name === name)!.price); // ✅ fixed
      return sum + price * qty;
    }, 0)}
  </p>
)}

            {/* Modal Buttons */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                onClick={handleConfirm}
                style={{
                  padding: "14px",
                  background: "#026cdf",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "14px",
                  background: "#f1f1f1",
                  color: "#333",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
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
