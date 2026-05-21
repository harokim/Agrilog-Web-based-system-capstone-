import { useRequests } from "../context/RequestContext";
import { useAppointments } from "../context/AppointmentContext";

export default function EngineerDashboard() {
  const { requests } = useRequests();
  const { appointments } = useAppointments();

  const pending = requests.filter(r => r.status === "Pending");
  const approved = requests.filter(r => r.status === "Approved");
  const rejected = requests.filter(r => r.status === "Rejected");

  const recent = requests
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container">
      <h1>Engineer Dashboard</h1>

      <div className="grid">
        <div className="card">Total: {requests.length}</div>
        <div className="card">Pending: {pending.length}</div>
        <div className="card">Approved: {approved.length}</div>
        <div className="card">Rejected: {rejected.length}</div>
      </div>

      <div className="card">
        <h3>Appointments</h3>
        {appointments.map(a => (
          <div key={a.id}>
            {a.date} - {a.time} - {a.title}
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Needs Review</h3>
        {pending.map(r => (
          <div key={r.id}>
            {r.id} - {r.association}
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        {recent.map(r => (
          <div key={r.id}>
            {r.id} — {r.status}
          </div>
        ))}
      </div>
    </div>
  );
}
