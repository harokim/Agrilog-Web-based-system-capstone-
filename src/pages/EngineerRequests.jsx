import { useRequests } from "../context/RequestContext";

export default function EngineerRequests() {
  const { requests, updateStatus, addNote } = useRequests();

  return (
    <div className="container">
      <h1>Engineer Request Panel</h1>

      {requests.map((r) => (
        <div key={r.id} className="card">
          <h3>{r.id}</h3>

          <p><b>Client:</b> {r.clientId}</p>
          <p><b>Association:</b> {r.association}</p>
          <p><b>Status:</b> {r.status}</p>
          <p><b>Missing Docs:</b> {r.missingDocs.join(", ")}</p>
          <p><b>Notes:</b> {r.notes}</p>

        
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => updateStatus(r.id, "Approved")}>
              Approve
            </button>

            <button onClick={() => updateStatus(r.id, "Rejected")}>
              Reject
            </button>

            <button onClick={() => updateStatus(r.id, "Pending")}>
              Pending
            </button>
          </div>

        
          <input
            placeholder="Add note"
            onBlur={(e) => addNote(r.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
