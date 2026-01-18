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
}


const AdminPage: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const handleDelete = async (id: number) => {
  const confirm = await Swal.fire({
    title: "Delete proof?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
  });

  if (!confirm.isConfirmed) return;

  const res = await fetch(
    `https://ticketmasterb.onrender.com/api/proofs/${id}`,
    { method: "DELETE" }
  );

  if (res.ok) {
    setProofs(prev => prev.filter(p => p.id !== id));
    Swal.fire("Deleted", "Proof removed successfully", "success");
  } else {
    Swal.fire("Error", "Failed to delete proof", "error");
  }
};


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
  }}
>
  Delete Proof
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
