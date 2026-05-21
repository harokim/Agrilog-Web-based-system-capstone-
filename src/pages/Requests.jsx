import { useState } from "react";
import { useRequests } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";

export default function Requests() {
  const { user } = useAuth();
  const { requests } = useRequests();

  const myRequests = requests.filter(
    (r) => r.clientId === user?.id
  );

  const [form, setForm] = useState({
    association: "",
    details: ""
  });

  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  const handleSubmit = () => {
    if (!form.association || !form.details) {
      alert("Please complete all required fields.");
      return;
    }

    const requestData = {
      association: form.association,
      details: form.details,
      documents: documents.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };

    console.log("Request Submitted:", requestData);

    alert(
      "Request submitted successfully. Backend integration pending."
    );

    setForm({
      association: "",
      details: ""
    });

    setDocuments([]);
  };

  return (
    <div className="page-bg">
      <div className="page-overlay">
        <div className="container">
          <h1>Request Form</h1>

          <div className="card">

            <input
              value={form.association}
              placeholder="Association Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  association: e.target.value
                })
              }
            />

            <textarea
              value={form.details}
              placeholder="Request Details"
              onChange={(e) =>
                setForm({
                  ...form,
                  details: e.target.value
                })
              }
            />

            <div style={{ marginTop: "15px" }}>
              <label>
                <strong>Upload Supporting Documents</strong>
              </label>

              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "block", marginTop: "10px" }}
              />
            </div>

            {documents.length > 0 && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px"
                }}
              >
                <h4>Selected Documents</h4>

                {documents.map((file, index) => (
                  <div key={index}>
                    📄 {file.name}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleSubmit}
              style={{ marginTop: "15px" }}
            >
              Submit Request
            </button>
          </div>

          <div className="card">
            <h3>My Submitted Requests</h3>

            {myRequests.length === 0 ? (
              <p>No requests submitted.</p>
            ) : (
              myRequests.map((r) => (
                <div
                  key={r.id}
                  className="list-item"
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  <strong>{r.id}</strong>
                  <br />

                  Status:
                  {" "}
                  <strong>{r.status}</strong>

                  <br />

                  Missing Documents:
                  {" "}
                  {r.missingDocs?.length
                    ? r.missingDocs.join(", ")
                    : "None"}

                  {r.documents?.length > 0 && (
                    <>
                      <br />
                      <strong>Uploaded Documents:</strong>

                      <ul>
                        {r.documents.map((doc, i) => (
                          <li key={i}>
                            {doc.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}