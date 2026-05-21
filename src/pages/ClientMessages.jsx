import { useState } from "react";
import { useMessages } from "../context/MessageContext";

export default function ClientMessages() {
  const { messages, sendMessage } = useMessages();
  const [text, setText] = useState("");

  return (
    <div className="page-bg">
      <div className="page-overlay">
        <div className="container">
          <h1>Messages</h1>

          <div className="card message-box">
            {messages.map((m, i) => (
              <div key={i} className="msg">
                <b>{m.from}:</b> {m.text}
              </div>
            ))}
          </div>

          <textarea
            placeholder="Type message..."
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={() => sendMessage("client", text)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
