import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footers from "./components/Footers";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/admin/AdminPanel";
import Adopt from "./pages/Adopt";
import AllEvents from "./pages/AllEvents";
import Faq from "./pages/Faq";
import LandingPage from "./pages/LandingPage";
import LoginModal from "./pages/Login";
import NewPassword from "./pages/ResetPassword";
import PasswordForgot from "./pages/PasswordForgot";
import UpdatedPasswords from "./pages/ChangePassword";
import TermsAndConditions from "./pages/Terms";
import MyPetRequests from "./pages/user/MyPetRequest";
import Profile from "./pages/user/Profile";
import useTokenExpiryCheck from "./components/TokenExpire";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <Router>
      <TokenExpiryWrapper />
      <ToastContainer />
      {user?.isAdmin ? null : <Navbar />}

      <Routes>
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms-and-condition" element={<TermsAndConditions />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<AllEvents />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/pet-req/:id" element={<MyPetRequests />} />
        <Route path="/reset_password/:token" element={<NewPassword />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/changePassword/:id" element={<UpdatedPasswords />} />
        <Route path="/passwordForget" element={< PasswordForgot />} />
        <Route path="/after-expired" element={< PasswordForgot />} />


      </Routes>
      {user?.isAdmin ? null : <Footers />}
    </Router>
  );
}

const TokenExpiryWrapper = () => {
  useTokenExpiryCheck();
  return null;
};
export default App;