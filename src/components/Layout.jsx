import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      {user && <Sidebar />}

      <div className="app-content">
        <div className="page-bg">
          <div className="page-overlay">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
