import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

// Dashboard pages
import Dashboard from "@/pages/Dashboard";
import Places from "@/pages/places/Places";
import Bookings from "@/pages/Bookings";
import Events from "@/pages/events/Events";
import Users from "@/pages/Users";

import ProtectedRoute from "@/components/home/ProtectedRoute";
import RefundRequests from "./pages/RefundRequests";
import RefundHistory from "./pages/RefundHistory";
import AddPlace from "./pages/places/AddPlace";
import EditPlace from "./pages/places/EditPlace";
import AddEvent from "./pages/events/AddEvent";
import EditEvent from "./pages/events/EditEvent";
import EventDetails from "./pages/events/EventDetails";
import PlaceDetails from "./pages/places/PlaceDetails";

import { setTokenFunction } from "@/api/axiosInstance";

function App() {
  const { getToken } = useAuth();

  setTokenFunction(getToken);
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
            <Route path=":id" element={<PlaceDetails />} />
            <Route path="edit/:id" element={<EditPlace />} />
          </Route>
          <Route path="bookings" element={<Bookings />} />
          <Route path="refund-requests" element={<RefundRequests />} />
          <Route path="refund-history" element={<RefundHistory />} />
          <Route path="events">
            <Route index element={<Events />} />
            <Route path="add" element={<AddEvent />} />
            <Route path=":id" element={<EventDetails />} />
            <Route path="edit/:id" element={<EditEvent />} />
          </Route>
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;