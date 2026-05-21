import { createContext, useContext, useState } from "react";

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const sendMessage = (from, text) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from, text }
    ]);
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessages = () => useContext(MessageContext);
