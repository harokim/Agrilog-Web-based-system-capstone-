import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";

import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { MessageProvider } from "./context/MessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RequestProvider>
          <AppointmentProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </AppointmentProvider>
        </RequestProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
