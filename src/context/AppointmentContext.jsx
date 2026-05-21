import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientId: "client-1",
      date: "2026-04-25",
      time: "10:00 AM",
      title: "Validation Meeting"
    }
  ]);

  const addAppointment = (appt) => {
    setAppointments(prev => [
      ...prev,
      { id: Date.now(), ...appt }
    ]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
