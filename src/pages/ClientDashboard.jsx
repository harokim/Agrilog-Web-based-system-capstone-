import { useRequests } from "../context/RequestContext";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";

export default function ClientDashboard() {
  const { user } = useAuth();
  const { requests } = useRequests();
  const { appointments } = useAppointments();

  const myRequests = requests.filter(r => r.clientId === user?.id);
  const myAppointments = appointments.filter(a => a.clientId === user?.id);

  const pending = myRequests.filter(r => r.status === "Pending");
  const approved = myRequests.filter(r => r.status === "Approved");

  return (
    <div className="page-bg">
      <div className="page-overlay">
        <div className="container">
          <h1>Client Dashboard</h1>

        
          <div className="grid">
            <div className="card">
              <h3>Total Requests</h3>
              <p>{myRequests.length}</p>
            </div>

            <div className="card">
              <h3>Pending</h3>
              <p>{pending.length}</p>
            </div>

            <div className="card">
              <h3>Approved</h3>
              <p>{approved.length}</p>
            </div>

            <div className="card">
              <h3>Appointments</h3>
              <p>{myAppointments.length}</p>
            </div>
          </div>

        
          <div className="card">
            <h3>Upcoming Appointments</h3>
            {myAppointments.length === 0 && <p>No appointments yet.</p>}

            {myAppointments.map((a) => (
              <div key={a.id} className="list-item">
                <b>{a.date}</b> — {a.time} — {a.title}
              </div>
            ))}
          </div>

        
          <div className="card">
            <h3>My Requests</h3>

            {myRequests.length === 0 && <p>No requests submitted.</p>}

            {myRequests.map((r) => (
              <div key={r.id} className="list-item">
                <b>{r.id}</b> — {r.status}
                <div className="sub-text">
                  Missing: {r.missingDocs?.join(", ") || "None"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
