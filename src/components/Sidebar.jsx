import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <div
      className={`sidebar ${open ? "open" : "closed"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h3 className="logo">MABEO</h3>

      <Link to="/calendar">Calendar</Link>
    


      {user.role === "client" && (
        <>
          <Link to="/client">Dashboard</Link>
          <Link to="/client-messages">Messages</Link>
          <Link to="/requests">Requests</Link>
        </>
      )}

      {user.role === "engineer" && (
        <>
          <Link to="/users">User Management</Link>
          <Link to="/engineer">Dashboard</Link>
          <Link to="/engineer-requests">Client Requests</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/engineer-messages">Messages</Link>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
