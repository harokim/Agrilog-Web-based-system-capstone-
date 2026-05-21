import { useState } from "react";
import { useMessages } from "../context/MessageContext";

export default function EngineerMessages() {
  const { messages, sendMessage } = useMessages();
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h1>Message Client</h1>

      {messages.map((m, i) => (
        <div key={i} className="card">
          {m.from}: {m.text}
        </div>
      ))}

      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={() => sendMessage("engineer", text)}>Send</button>
    </div>
  );
}
