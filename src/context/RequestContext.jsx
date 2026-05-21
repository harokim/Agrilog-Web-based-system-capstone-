import { createContext, useContext, useState } from "react";

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([
    {
      id: "REQ-001",
      clientId: "client-1",
      association: "IA Sample",
      status: "Pending",
      missingDocs: ["Annex C", "Proof of Land"],
      createdAt: "2026-04-20",
      notes: "Initial submission"
    }
  ]);


  const createRequest = (data) => {
    const newRequest = {
      id: "REQ-" + Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      ...data
    };

    setRequests((prev) => [newRequest, ...prev]);
  };


  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };


  const addNote = (id, note) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, notes: note } : r
      )
    );
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        createRequest,
        updateStatus,
        addNote
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export const useRequests = () => {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequests must be used within RequestProvider");
  return ctx;
};
