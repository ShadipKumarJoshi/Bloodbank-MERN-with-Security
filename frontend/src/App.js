import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import { default as Navbars } from "./components/Navbars";
import useTokenExpiryCheck from "./components/TokenExpiryCheck";
import AboutUs from "./pages/AboutUs";
import BBDashBoard from "./pages/BBUsers/BBDashBoard";
import EditCampaigns from "./pages/BBUsers/Campaigns/EditCampaigns";
import InterestedUsers from "./pages/BBUsers/Campaigns/InterestedUsers";
import EditBloodBank from "./pages/BBUsers/EditBloodBank";
import ContactUs from "./pages/ContactUs";
import ForBloodbank from "./pages/ForBloodbank";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import UsersLists from "./pages/UsersLists";
import AdminPanel from "./pages/admin/AdminPanel";
import EditHospital from "./pages/admin/hospitals/EditHospital";
import BloodBanks from "./pages/users/BloodBanks/BloodBanks";
import SingleBloodbank from "./pages/users/BloodBanks/SingleBloodBanks";
import AddBloodRequests from "./pages/users/blood_request/AddBloodRequests";
import EditBloodRequests from "./pages/users/blood_request/EditBloodRequests";
import ReqForBB from "./pages/users/blood_request/ReqForBB";
import SingleBloodRequest from "./pages/users/blood_request/SingleBloodRequest";
import ViewBloodRequest from "./pages/users/blood_request/ViewBloodRequest";
import BeADonor from "./pages/users/donor/BeADonor";
import Users from "./pages/users/donor/Users";
import Hospitals from "./pages/users/hospitals/Hospitals";
import SingleHospital from "./pages/users/hospitals/SingleHospital";
import ForgetPassword from "./pages/users/profile/ForgetPassword";
import History from "./pages/users/profile/History";
import Profile from "./pages/users/profile/Profile";
import UpdatePaasswordAfterReset from "./pages/users/profile/UpdatePaasswordAfterReset";
import AdminRoutes from "./protected/AdminRoutes";
import BloodBankUserRoutes from "./protected/BloodBankUserRoutes";
import UserRoutes from "./protected/UserRoutes";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(user ? user.fullName : "");
  const updateFullName = (newFullName) => {
    setFullName(newFullName);
  };

  return (
    <Router>
      <TokenExpiryWrapper />
      <ToastContainer />
      {!user || (user && !user.isAdmin && !user.isBloodBank) ? (
        <Navbars />
      ) : null}
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/edit-hospital/:id" element={<EditHospital />} />
          <Route path="/edit-bloodbank/:id" element={<EditBloodBank />} />
          {/* <Route path="/admin/dashboard" element={<AdminPanel />} /> */}
        </Route>

        <Route element={<BloodBankUserRoutes />}>
          <Route path="/bb/dashboard" element={<AdminPanel />} />
          <Route path="/maindash" element={<BBDashBoard />} />
          <Route path="/update_campaign/:id" element={<EditCampaigns />} />
          <Route path="/registered_users/:id" element={<InterestedUsers />} />
        </Route>

        {user?.isAdmin ? (
          <>
            <Route path="/*" element={<ErrorPage />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/view_request/:id" element={<SingleBloodRequest />} />
            <Route path="/blood_requests" element={<ViewBloodRequest />} />
            <Route path="/services" element={<Services />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/single-hospital/:id" element={<SingleHospital />} />
            <Route path="/bloodbanks" element={<BloodBanks />} />
            <Route path="/single-bloodbank/:id" element={<SingleBloodbank />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/users-list" element={<UsersLists />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/bloodbank" element={<ForBloodbank />} />
          </>
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<UserRoutes />}>
          <Route path="/view_all_donors" element={<Users />} />
          <Route path="/req_for_bb/:id" element={<ReqForBB />} />
          <Route path="/be-a-donor/:id" element={<BeADonor />} />
          <Route path="/edit-request/:id" element={<EditBloodRequests />} />
          <Route path="/add_blood_requests" element={<AddBloodRequests />} />
          <Route path="/update-password" element={<UpdatePaasswordAfterReset />} />
          <Route
            path="/profile/:id"
            element={<Profile updateFullName={updateFullName} />}
          />
          <Route path="/get_my_request/:id" element={<History />} />
        </Route>
      </Routes>
      {!user || (user && !user.isAdmin && !user.isBloodBank) ? (
        <Footer />
      ) : null}
    </Router>
  );
}
// Wrapper component to ensure useTokenExpiryCheck is called inside the Router context
const TokenExpiryWrapper = () => {
  useTokenExpiryCheck();
  return null;
};

export default App;
