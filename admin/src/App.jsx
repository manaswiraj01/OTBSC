import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

// Dashboard pages
import Dashboard from "@/pages/Dashboard";
import Places from "@/pages/places/Places";
import Bookings from "@/pages/Bookings";
import Payments from "@/pages/Payments";
import Events from "@/pages/Events";
import Users from "@/pages/Users";

import ProtectedRoute from "@/components/home/ProtectedRoute";
import RefundRequests from "./pages/RefundRequests";
import RefundHistory from "./pages/RefundHistory";
import AddPlace from "./pages/places/AddPlace";
import EditPlace from "./pages/places/EditPlace";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <Home />
              </SignedOut>

              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </>
          }
        />

        {/* Admin layout (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="places">
            <Route index element={<Places />} />
            <Route path="add" element={<AddPlace />} />
            <Route path="edit/:id" element={<EditPlace />} />
          </Route>
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="refund-requests" element={<RefundRequests />} />
          <Route path="refund-history" element={<RefundHistory />} />
          <Route path="events" element={<Events />} />
          <Route path="users" element={<Users />} />

          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
