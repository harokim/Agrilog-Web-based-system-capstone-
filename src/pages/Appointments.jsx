import { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";

export default function Appointments() {
  const { user } = useAuth();
  const { appointments, addAppointment } = useAppointments();

  const [form, setForm] = useState({
    clientId: "",
    requestId: "",
    date: "",
    time: "",
    title: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.clientId || !form.date || !form.time || !form.title) {
      alert("Please fill all required fields");
      return;
    }

    addAppointment({
      ...form,
      createdBy: user?.id
    });

    setForm({
      clientId: "",
      requestId: "",
      date: "",
      time: "",
      title: ""
    });
  };

  return (
    <div className="container">
      <h1>Appointments</h1>

      <div className="appointment-page">
      
        <div className="appointment-form">
          <h2>Create Appointment</h2>

          <input
            name="clientId"
            placeholder="Client ID"
            value={form.clientId}
            onChange={handleChange}
          />

          <input
            name="requestId"
            placeholder="Request ID (optional)"
            value={form.requestId}
            onChange={handleChange}
          />

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
          />

          <input
            name="title"
            placeholder="Title (e.g. Validation Meeting)"
            value={form.title}
            onChange={handleChange}
          />

          <button onClick={handleAdd}>
            Add Appointment
          </button>
        </div>

        
        <div className="appointment-list">
          <h2>All Appointments</h2>

          {appointments.length === 0 && (
            <p>No appointments scheduled.</p>
          )}

          {appointments.map((a) => (
            <div className="appointment-card" key={a.id}>
              <strong>{a.title}</strong>
              <div>Date: {a.date}</div>
              <div>Time: {a.time}</div>
              <div>Client: {a.clientId}</div>

              {a.requestId && (
                <div>Request: {a.requestId}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
