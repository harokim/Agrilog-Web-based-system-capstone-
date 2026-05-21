import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";

export default function UserManagement() {
  const { users, deleteUser, user } = useAuth();
  const { appointments } = useAppointments();

  if (user?.role !== "engineer") {
    return <div className="container">Unauthorized</div>;
  }

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="card">
        <h3>Total Users: {users.length}</h3>
      </div>

      {users.map((u) => {
        const userAppointments = appointments.filter(
          (a) => a.clientId === u.id
        );

        return (
          <div key={u.id} className="card">
            <h3>{u.email}</h3>

            <p><b>Role:</b> {u.role}</p>
            <p><b>ID:</b> {u.id}</p>
            <p><b>Appointments:</b> {userAppointments.length}</p>

            {u.role !== "engineer" && (
              <button
                onClick={() => deleteUser(u.id)}
                style={{ background: "red", color: "white" }}
              >
                Delete User
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
