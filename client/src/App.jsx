import { Routes, Route, Navigate } from 'react-router-dom';
import Body from './components/Body';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
import AboutUsPage from './pages/AboutUsPage';
import FAQs from './pages/FAQs';
import ExplorePage from './pages/ExplorePage';

import { Context } from './context/Context';
import PlaceDetails from './pages/PlaceDetails.jsx';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Policy from './pages/Policy';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';

import ScrollToTop from "./components/ScrollToTop"
import BookingsPage from './pages/BookingsPage';
import HelpPage from './pages/HelpPage';

function App() {
  const { loading, setLoading, fetchUser, userData } = useContext(Context);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      setLoading(false);
      return;
    }
    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/faqs' element={<FAQs />} />
          <Route path='/login' element={!userData ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/profile/edit' element={<ProfilePage />} />
          <Route path='/public/get/place/:id' element={<PlaceDetails />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path='/help' element={<HelpPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
