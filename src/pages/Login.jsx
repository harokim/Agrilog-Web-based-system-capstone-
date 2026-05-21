import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import bg from "../assets/login-bg.jpg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const role = email.toLowerCase().includes("engineer")
      ? "engineer"
      : "client";

    login(email, password);

    navigate(role === "engineer" ? "/engineer" : "/client", {
      replace: true
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontFamily: "Arial"
      }}
    >
    
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)"
        }}
      />

    
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: 340,
          padding: 25,
          borderRadius: 12,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          MABEO
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>

      
        <div
          onClick={() => navigate("/signup")}
          style={{
            marginTop: 12,
            fontSize: 12,
            textAlign: "center",
            cursor: "pointer",
            opacity: 0.7,
            textDecoration: "underline"
          }}
        >
          New user registration access
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "none",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#00c853",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
