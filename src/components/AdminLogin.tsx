import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@ticketmaster.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Simple session flag
      sessionStorage.setItem("isAdmin", "true");

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        confirmButtonColor: "#026cdf",
      }).then(() => {
        navigate("/admin");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Access denied",
        confirmButtonColor: "#026cdf",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#026cdf" }}>
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#026cdf",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default AdminLogin;
