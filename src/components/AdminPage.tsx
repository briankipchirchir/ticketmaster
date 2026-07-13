import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BTS from "../assets/BTS1.jpeg"; 
import TicketTransferFlow from "./TicketTransferFlow";

interface Proof {
  id: number;
  userName: string;
  userEmail: string;
  tickets: string;
  amount: number;
  fileName: string;
  filePath: string;
  paymentMethod: string;
  eventName: string;
  uploadedAt: string;
  approved: boolean;
  ticketFileUrl?: string; // ← new
}

const AdminPage: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [viewingTicket, setViewingTicket] = useState<{ url: string; label: string } | null>(null);
  const [showTicketFlow, setShowTicketFlow] = useState(false);

  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, []);

  // Fetch proofs
  useEffect(() => {
    fetch("https://ticketmasterb.onrender.com/api/proofs")
      .then(res => res.json())
      .then(data => {
        setProofs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching proofs", err);
        setLoading(false);
      });
  }, []);

  // Delete proof
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Delete proof?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`https://ticketmasterb.onrender.com/api/proofs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProofs(prev => prev.filter(p => p.id !== id));
      Swal.fire("Deleted", "Proof removed successfully", "success");
    } else {
      Swal.fire("Error", "Failed to delete proof", "error");
    }
  };

  // Filter proofs based on search term
  const filteredProofs = proofs.filter(
    p =>
      p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Approve & Send Ticket?",
      text: "This will send the ticket to the client's email",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Yes, Send Ticket",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`https://ticketmasterb.onrender.com/api/proofs/${id}/approve`, {
      method: "POST",
    });

    if (res.ok) {
      setProofs(prev =>
        prev.map(p => p.id === id ? { ...p, approved: true } : p)
      );
      Swal.fire("Sent!", "Ticket has been sent to the client's email", "success");
    } else {
      Swal.fire("Error", "Failed to approve and send ticket", "error");
    }
  };

  // Upload the actual ticket file for an order
  const handleTicketUpload = async (id: number, file: File) => {
    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `https://ticketmasterb.onrender.com/api/proofs/${id}/upload-ticket`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updated = await res.json();
      setProofs(prev => prev.map(p => (p.id === id ? updated : p)));
      Swal.fire("Uploaded", "Ticket file attached to this order", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to upload ticket file", "error");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <h2>Admin – Proof of Payments</h2>
        <button
          onClick={() => navigate("/my-tickets")}
          style={{
            padding: "8px 16px",
            background: "#026cdf",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View My Tickets →
        </button>

        <button
  onClick={() => setShowTicketFlow(true)}
  style={{
    padding: "8px 16px",
    background: "#026cdf",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
  }}
>
  View Ticket Details
</button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or payment method..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "1rem 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {loading ? (
        // Loading Skeletons
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "#eee",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: "16px",
                  background: "#eee",
                  marginBottom: "0.3rem",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: "16px",
                  background: "#eee",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
      ) : filteredProofs.length === 0 ? (
        <p>No proofs uploaded yet.</p>
      ) : (
        // Proofs Grid
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "1rem 0",
          }}
        >
          {filteredProofs.map(proof => (
            <div
              key={proof.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <p><strong>Name:</strong> {proof.userName}</p>
              <p><strong>Email:</strong> {proof.userEmail}</p>
              <p><strong>Tickets:</strong> {proof.tickets}</p>
              <p><strong>Total Paid:</strong> ${proof.amount}</p>
              <p><strong>Payment Method:</strong> {proof.paymentMethod}</p>
              <p><strong>Event:</strong> {proof.eventName}</p>
              <p><strong>Uploaded At:</strong> {new Date(proof.uploadedAt).toLocaleString()}</p>

              {/* Proof Image */}
              <img
                src={proof.filePath}
                alt="Proof"
                onError={e => { e.currentTarget.src = "/placeholder.png"; }}
                style={{
                  maxWidth: "100%",
                  height: "200px",
                  objectFit: "contain",
                  marginTop: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              />

              {/* Download Button */}
              <a
                href={proof.filePath}
                download={proof.fileName}
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "6px 10px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Download Proof
              </a>

              {/* ---- Ticket file upload ---- */}
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: "6px",
                }}
              >
                <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: 600 }}>
                  Ticket file{proof.ticketFileUrl ? " (uploaded)" : ""}
                </p>

                {proof.ticketFileUrl && (
                  <button
                    onClick={() =>
                      setViewingTicket({
                        url: proof.ticketFileUrl as string,
                        label: `${proof.userName} — ${proof.eventName}`,
                      })
                    }
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "13px",
                      color: "#026cdf",
                      background: "none",
                      border: "none",
                      padding: 0,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View current ticket file
                  </button>
                )}

                <input
                  type="file"
                  disabled={uploadingId === proof.id}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleTicketUpload(proof.id, file);
                  }}
                  style={{ width: "100%", fontSize: "13px" }}
                />

                {uploadingId === proof.id && (
                  <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                    Uploading...
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(proof.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                  width: "100%",
                }}
              >
                Delete Proof
              </button>

              {/* Approve Button */}
              <button
                onClick={() => handleApprove(proof.id)}
                disabled={proof.approved}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: proof.approved ? "#6b7280" : "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: proof.approved ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  width: "100%",
                }}
              >
                {proof.approved ? "✓ Ticket Sent" : "✅ Approve & Send Ticket"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Full-screen ticket viewer */}
      {viewingTicket && (
        <div
          onClick={() => setViewingTicket(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 3000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "1000px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "14px" }}>
                {viewingTicket.label}
              </span>
              <button
                onClick={() => setViewingTicket(null)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                ✕ Close
              </button>
            </div>

            {viewingTicket.url.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={viewingTicket.url}
                title="Ticket file"
                style={{
                  width: "100%",
                  height: "80vh",
                  border: "none",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              />
            ) : (
              <img
                src={viewingTicket.url}
                alt="Ticket file full view"
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            )}

            <a
              href={viewingTicket.url}
              download
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                background: "#026cdf",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Download
            </a>
          </div>
        </div>
      )}


      {showTicketFlow && (
  <div style={{ position: "fixed", inset: 0, zIndex: 4000, overflow: "auto" }}>
    <TicketTransferFlow
      eventImage={BTS}
      eventName="BTS WORLD TOUR 'ARIRANG' IN PARIS"
      eventDate="Fri, Jul 17, 2026 · 20:00"
      venue="Stade de France"
      orderNumber="57-75274/INB"
      section="118"
      row="9"
      seatList={[{ id: 17, label: "SEAT 17" }, { id: 18, label: "SEAT 18" }]}
      onClose={() => setShowTicketFlow(false)}
    />
  </div>
)}
    </div>
  );
};

export default AdminPage;