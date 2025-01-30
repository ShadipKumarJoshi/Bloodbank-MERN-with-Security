import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomFaIcons from "../../components/CustomFaIcons";
import "../../style/AdminPanel.css";
import BBDashBoard from "../BBUsers/BBDashBoard";
import BBRequests from "../BBUsers/BBRequests";
import AddCampaigns from "../BBUsers/Campaigns/AddCampaigns";
import Campaigns from "./Campaigns";
import Requests from "./Requests";
import AdminDashboard from "./admin_dashboard/AdminDashboard";
import AddBloodBanks from "./bloodbanks/AddBloodbanks";
import ViewDonors from "./donors/Donors";
import AddHospitals from "./hospitals/AddHospitals";
import AddNews from "./news/AddNews";
import SeeLogs from "./SeeLogs";
function AdminPanel() {
  const storedPage = localStorage.getItem("currentPage");
  // Initialize the current page with the stored value or the default value
  const initialPage = storedPage || "Dashboard";

  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  // Use state to keep track of the current page
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLogoutModalOpen, setLogoutIsModalOpen] = useState(false);
  const openLogoutModal = () => setLogoutIsModalOpen(true);
  const closeLogoutModal = () => setLogoutIsModalOpen(false);

  let content;
  switch (currentPage) {
    case "AdminDashboard":
      {
        users.isAdmin
          ? (content = <AdminDashboard />)
          : (content = <BBDashBoard />);
      }
      break;
    case "Donors":
      content = <ViewDonors />;
      break;

    case "Requests":
      content = <Requests />;
      break;
    case "AddBloodBanks":
      content = <AddBloodBanks />;
      break;
    case "AddHospitals":
      content = <AddHospitals />;
      break;
    case "AddCampaigns":
      {
        users.isBloodBank ? (content = <AddCampaigns />) : (content = null);
      }
      break;
    case "Campaigns":
      {
        users.isAdmin ? (content = <Campaigns />) : (content = null);
      }
      break;
    case "Blood Requests":
      content = <BBRequests />;
      break;
    case "AddNews":
      content = <AddNews />;
      break;
    case "SeeLogs":
      content = <SeeLogs />;
      break;
    default: {
      users.isAdmin
        ? (content = <AdminDashboard />)
        : (content = <BBDashBoard />);
    }
  }
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="adminMainContainer">
        <header className="adminHeader">
          <h1>{users.isAdmin ? "Admin Panel" : "Blood Bank Panel"}</h1>
          {
            // users.isAdmin ? (
            <div className="d-flex flex-row align-items-center gap-3">
              <h6 className="m-0 me-2">Welcome, {users.fullName}</h6>
              <button onClick={openLogoutModal} className="logoutBtn">
                <CustomFaIcons icon={faSignOut} className={"m-0 me-2"} />
              </button>
            </div>
            // ) : (
            // <></>)
          }
        </header>
        <div className="adminWrapper">
          <ul className="adminUl">
            <li
              className={`adminLi ${
                currentPage === "Dashboard" ? "active" : ""
              }`}
            >
              <button onClick={() => setCurrentPage("Dashboard")} tabIndex="1">
                Dashboard
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "Donors" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("Donors")} tabIndex="2">
                Donors
              </button>
            </li>
            {/* {users.isBloodBank ? (
              <li
                className={`adminLi ${
                  currentPage === "Blood Requests" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => setCurrentPage("Blood Requests")}
                  tabIndex="3"
                >
                  Blood Requests
                </button>
              </li>
            ) : null}
            {users.isAdmin ? (
              <li
                className={`adminLi ${
                  currentPage === "AddBloodBanks" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => setCurrentPage("AddBloodBanks")}
                  tabIndex="3"
                >
                  BloodBanks
                </button>
              </li>
            ) : null} */}
            <li
              className={`adminLi ${
                currentPage === "AddHospitals" ? "active" : ""
              }`}
            >
              <button
                onClick={() => setCurrentPage("AddHospitals")}
                tabIndex="4"
              >
                {users.isAdmin ? "AddHospitals" : "View Hospitals"}
              </button>
            </li>
            {users.isAdmin ? (
              <>
                <li
                  className={`adminLi ${
                    currentPage === "AddNews" ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage("AddNews")}
                    tabIndex="5"
                  >
                    News Section
                  </button>
                </li>
                <li
                  className={`adminLi ${
                    currentPage === "Requests" ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage("Requests")}
                    tabIndex="5"
                  >
                    Requests
                  </button>
                </li>
                {/* <li
                  className={`adminLi ${
                    currentPage === "Campaigns" ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage("Campaigns")}
                    tabIndex="5"
                  >
                    Campaigns
                  </button>
                </li> */}
                <li
                  className={`adminLi ${
                    currentPage === "SeeLogs" ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage("SeeLogs")}
                    tabIndex="5"
                  >
                    See Logs
                  </button>
                </li>
              </>
            ) : null}

            {users.isBloodBank ? (
              <li
                className={`adminLi ${
                  currentPage === "AddCampaigns" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => setCurrentPage("AddCampaigns")}
                  tabIndex="5"
                >
                  Add Campaigns
                </button>
              </li>
            ) : null}
          </ul>
          <main>
            {content}

            {isLogoutModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                id="my-modal"
              >
                <div className="relative mx-auto p-4 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                  <h6 className="font-medium w-3/4 mx-auto text-center">
                    <img
                      className="mb-2"
                      src="/assets/images/sure_about_that.jpg"
                      alt=""
                    />
                    Are you sure about that 👁️👁️?
                  </h6>
                  <div className="flex flex-wrap items-center justify-between m-0 w-full">
                    <button
                      onClick={handleLogout}
                      className="w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5"
                    >
                      Yes, Logout !!
                    </button>
                    <button
                      type="submit"
                      className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                      onClick={closeLogoutModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
