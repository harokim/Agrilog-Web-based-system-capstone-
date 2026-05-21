import { useAppointments } from "../context/AppointmentContext";
import { useState } from "react";

export default function Calendar() {
  const { appointments } = useAppointments();
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-bg">
      <div className="page-overlay">
        <div className="container">
          <h1>Calendar</h1>

          <div className="grid">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="card clickable"
                onClick={() => setSelected(a)}
              >
                <b>{a.date}</b>
                <div>{a.time}</div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="card">
              <h3>Appointment Details</h3>
              <p>{selected.title}</p>
              <p>{selected.date} - {selected.time}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
