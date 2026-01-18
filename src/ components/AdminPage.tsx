import { useEffect, useState } from "react";

interface Proof {
  id: number;
  userName: string;
  userEmail: string;
  tickets: string;
  amount: number;
  fileName: string;
  filePath: string;
}


const AdminPage: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p style={{ padding: "2rem" }}>Loading proofs...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin – Proof of Payments</h2>

      {proofs.length === 0 && <p>No proofs uploaded yet.</p>}

      <div style={{ display: "grid", gap: "1rem" }}>
        {proofs.map(proof => (
          <div
            key={proof.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <p><strong>Name:</strong> {proof.userName}</p>
            <p><strong>Email:</strong> {proof.userEmail}</p>
            <p><strong>Tickets:</strong> {proof.tickets}</p>
<p><strong>Total Paid:</strong> ${proof.amount}</p>


            <img
              src={`https://ticketmasterb.onrender.com/${proof.filePath}`}
              alt="Proof"
              style={{
                maxWidth: "100%",
                height: "200px",
                objectFit: "contain",
                marginTop: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
