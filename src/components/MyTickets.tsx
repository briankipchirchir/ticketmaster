import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Proof {
  id: number;
  userName: string;
  userEmail: string;
  tickets: string;
  amount: number;
  eventName: string;
  uploadedAt: string;
  approved: boolean;
  ticketFileUrl?: string;
}

const MyTickets: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingTicket, setViewingTicket] = useState<{ url: string; label: string } | null>(null);

  const navigate = useNavigate();

  // Admin-only guard, same pattern as AdminPage
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, []);

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

  // Only show orders that actually have a ticket file uploaded
  const withTickets = proofs.filter(p => !!p.ticketFileUrl);

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <h2 style={{ margin: 0 }}>My Tickets</h2>
        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 16px",
            background: "#f1f1f1",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ← Back to Proofs
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : withTickets.length === 0 ? (
        <p>No ticket files uploaded yet. Upload one from the Proofs page first.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {withTickets.map(proof => {
            const isPdf = proof.ticketFileUrl!.toLowerCase().endsWith(".pdf");
            return (
              <div
                key={proof.id}
                onClick={() =>
                  setViewingTicket({
                    url: proof.ticketFileUrl as string,
                    label: `${proof.userName} — ${proof.eventName}`,
                  })
                }
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  transition: "transform 0.15s ease",
                  background: "#fff",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  style={{
                    height: "160px",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isPdf ? (
                    <span style={{ fontSize: "40px" }}>📄</span>
                  ) : (
                    <img
                      src={proof.ticketFileUrl}
                      alt={`Ticket for ${proof.userName}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>
                    {proof.eventName}
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#555" }}>
                    {proof.userName}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#999" }}>
                    {proof.userEmail}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: proof.approved ? "#dcfce7" : "#fef3c7",
                      color: proof.approved ? "#16a34a" : "#b45309",
                    }}
                  >
                    {proof.approved ? "Sent" : "Pending"}
                  </span>
                </div>
              </div>
            );
          })}
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
    </div>
  );
};

export default MyTickets;