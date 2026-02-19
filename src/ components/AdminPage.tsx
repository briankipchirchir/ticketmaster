import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Proof {
  id: number;
  userName: string;
  userEmail: string;
  tickets: string;
  amount: number;
  fileName: string;
  filePath: string;
  paymentMethod: string; 
  eventName: string;        // ← new
  uploadedAt: string;
  approved: boolean;
}

const AdminPage: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin – Proof of Payments</h2>

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
    </div>
  );
};

export default AdminPage;
