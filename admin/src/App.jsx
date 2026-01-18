import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

// Dashboard pages
import Dashboard from "@/pages/Dashboard";
import Places from "@/pages/Places";
import Bookings from "@/pages/Bookings";
import Payments from "@/pages/Payments";
import Events from "@/pages/Events";
import Users from "@/pages/Users";

import ProtectedRoute from "@/components/home/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="places" element={<Places />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="events" element={<Events />} />
          <Route path="users" element={<Users />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
