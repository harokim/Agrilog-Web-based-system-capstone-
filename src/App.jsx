import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import ClientSignup from "./pages/ClientSignup";

import ClientDashboard from "./pages/ClientDashboard";
import EngineerDashboard from "./pages/EngineerDashboard";

import Requests from "./pages/Requests";
import EngineerRequests from "./pages/EngineerRequests";

import Calendar from "./pages/Calendar";
import Appointments from "./pages/Appointments";
import UserManagement from "./pages/UserManagement";

import ClientMessages from "./pages/ClientMessages";
import EngineerMessages from "./pages/EngineerMessages";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
    
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<ClientSignup />} />

   
      <Route
        path="/client"
        element={
          <ProtectedRoute role="client">
            <Layout>
              <ClientDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/requests"
        element={
          <ProtectedRoute role="client">
            <Layout>
              <Requests />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/client-messages"
        element={
          <ProtectedRoute role="client">
            <Layout>
              <ClientMessages />
            </Layout>
          </ProtectedRoute>
        }
      />

    
      <Route
        path="/engineer"
        element={
          <ProtectedRoute role="engineer">
            <Layout>
              <EngineerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/engineer-requests"
        element={
          <ProtectedRoute role="engineer">
            <Layout>
              <EngineerRequests />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute role="engineer">
            <Layout>
              <Appointments />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/engineer-messages"
        element={
          <ProtectedRoute role="engineer">
            <Layout>
              <EngineerMessages />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <ProtectedRoute role="engineer">
         <Layout>
            <UserManagement />
         </Layout>
      </ProtectedRoute>
       }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Layout>
              <Calendar />
            </Layout>
          </ProtectedRoute>
        }
      />

    
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
