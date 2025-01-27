import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomFaIcons from "../../components/CustomFaIcons";
import "../../style/AdminPanel.css";
import AdminDashBoard from "./admin_dashboard/AdminDashboard";
import Adopt from "./AdoptManagement";
import ContactManagement from "./ContactManagement";
import EventManagenent from "./EventManagement";


function AdminPanel() {
  const storedPage = localStorage.getItem("currentPage");
  // Initialize the current page with the stored value or the default value
  const initialPage = storedPage || "Product";

  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  // Use state to keep track of the current page
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLogoutModalOpen, setLogoutIsModalOpen] = useState(false);
  const openLogoutModal = () => setLogoutIsModalOpen(true);
  const closeLogoutModal = () => setLogoutIsModalOpen(false);

  let content;
  switch (currentPage) {
    
    case "Adopt":
      content = <Adopt />;
      break;
    
    case "Event":
      content = <EventManagenent />;
      break;
    
    case "ContactManagement":
      content = <ContactManagement />;
      break;
    default: {
      content = <AdminDashBoard />;
    }
  }
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="adminMainContainer">
        <header className="adminHeader">
          <div>{users?.isAdmin ? "Admin Panel" : "Organization Panel"}</div>
          {
            <div className="d-flex flex-row align-items-center gap-3">
              <h6 className="m-0 me-2">Welcome, {users?.username}</h6>
              <button onClick={openLogoutModal} className="logoutBtn">
                <CustomFaIcons icon={faSignOut} className={"m-0 me-2"} />
              </button>
            </div>
          }
        </header>
        <div className="adminWrapper">
          <ul className="adminUl z-50">
            <li
              className={`adminLi ${currentPage === "Product" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("Product")} tabIndex="2">
                Product Management
              </button>
            </li>

            <li
              className={`adminLi ${
                currentPage === "Product Category" ? "active" : ""
              }`}
            >
              <button
                onClick={() => setCurrentPage("Product Category")}
                tabIndex="9"
              >
                Product Category
              </button>
            </li>

            <li
              className={`adminLi ${currentPage === "OrderManagement" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("OrderManagement")} tabIndex="3">
                OrderManagement
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "Adopt" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("Adopt")} tabIndex="4">
                Adoption Management
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "DOnation Management" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("DOnation Management")} tabIndex="5">
                Donation Management
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "Event" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("Event")} tabIndex="6">
                Event
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "StoryManagement" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("StoryManagement")} tabIndex="7">
                StoryManagement
              </button>
            </li>
            <li
              className={`adminLi ${currentPage === "ContactManagement" ? "active" : ""}`}
            >
              <button onClick={() => setCurrentPage("ContactManagement")} tabIndex="8">
                Contact Management
              </button>
            </li>
          </ul>
          <main className="mt-4">
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
                    Are you sure to logout ?
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
