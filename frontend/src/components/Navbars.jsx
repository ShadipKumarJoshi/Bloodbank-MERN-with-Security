import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { toast } from "react-toastify";

const Navbars = ({ fullName }) => {
  const [activeItem, setActiveItem] = useState(null);
  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutIsModalOpen] = useState(false);
  const openLogoutModal = () => setLogoutIsModalOpen(true);
  const closeLogoutModal = () => setLogoutIsModalOpen(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const cancel = (e) => {
    closeLogoutModal();
  };
  const handleLogout = (e) => {
    closeLogoutModal();
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    toast.success("Logged Out Successfully");
  };
  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/":
        setActiveItem(0);
        break;
      case users && !users.isADonor && `/be-a-donor/${users._id}`:
        setActiveItem(1);
        break;
      case "/blood_requests":
        setActiveItem(2);
        break;
      case "/contact-us":
        setActiveItem(5);
        break;
      case "/services":
        setActiveItem(3);
        break;

      case "/about-us":
        setActiveItem(4);
        break;

      case users && "/add_blood_requests":
        setActiveItem(6);
        break;

      default:
        setActiveItem(0);
        break;
    }
  }, [location]);

  if (activeItem === null) {
    return null;
  }

  const loginPage = (e) => {
    navigate("/login");
    window.location.reload();
  };

  const registerPage = (e) => {
    navigate("/register");
    window.location.reload();
  };
  return (
    <>
      <nav style={{ position: "fixed", zIndex: "99", top: "0", left: "0" }}>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <FiMenu />
        </label>
        <label htmlFor="" className="logo text-danger">
          BloodBank
        </label>
        {users && users.isBloodBank ? (
          <>
            <ul className="nav-ul">
              <li className="nav-li">
                <Link
                  to={"/bb/dashboard"}
                  className={activeItem === 0 ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li className="nav-li">
                <Link
                  to={"/blood_requests"}
                  className={activeItem === 2 ? "active" : ""}
                >
                  View Requests
                </Link>
              </li>
              <li className="nav-li">
                <Link
                  to={"/services"}
                  className={activeItem === 3 ? "active" : ""}
                >
                  Our Services
                </Link>
              </li>
              <li className="nav-li">
                <Link
                  to={"/about-us"}
                  className={activeItem === 4 ? "active" : ""}
                >
                  About Us
                </Link>
              </li>
              {/* <li className="nav-li">
                <Link
                  to={"/contact-us"}
                  className={activeItem === 5 ? "active" : ""}
                >
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </>
        ) : (
          <>
            <ul className="nav-ul">
              <li className="nav-li">
                <Link to={"/"} className={activeItem === 0 ? "active" : ""}>
                  Home
                </Link>
              </li>
              {users && !users.isADonor ? (
                <li className="nav-li">
                  <Link
                    to={`/be-a-donor/${users._id}`}
                    className={activeItem === 1 ? "active" : ""}
                  >
                    Be A Donor
                  </Link>
                </li>
              ) : (
                <Outlet />
              )}
              {users && (
                <li className="nav-li">
                  <Link
                    to={"/add_blood_requests"}
                    className={activeItem === 6 ? "active" : ""}
                  >
                    Add Request
                  </Link>
                </li>
              )}
              <li className="nav-li">
                <Link
                  to={"/blood_requests"}
                  className={activeItem === 2 ? "active" : ""}
                >
                  View Requests
                </Link>
              </li>
              <li className="nav-li">
                <Link
                  to={"/services"}
                  className={activeItem === 3 ? "active" : ""}
                >
                  Our Services
                </Link>
              </li>
              <li className="nav-li">
                <Link
                  to={"/about-us"}
                  className={activeItem === 4 ? "active" : ""}
                >
                  About Us
                </Link>
              </li>
              {/* <li className="nav-li">
                <Link
                  to={"/contact-us"}
                  className={activeItem === 5 ? "active" : ""}
                >
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </>
        )}

        {users ? (
          <>
            <div className="profileImg">
              <img
                className="img-account-profile  rounded-circle mb-2"
                src={users.userImageURL}
                style={{ height: "4rem" }}
                alt=""
              />

              <div
                className={`dropdown ${isDropdownOpen ? "show" : ""} bg-white`}
              >
                <button
                  className="dropdown-toggle"
                  type="button"
                  onClick={handleToggleDropdown}
                >
                  Welcome {users.fullName}
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  <li style={{ width: "100%" }}>
                    <Link
                      className="dropdown-item"
                      onClick={handleToggleDropdown}
                      to={`/profile/${users._id}`}
                    >
                      Profile
                    </Link>
                  </li>

                  {users.isAdmin == false ? (
                    <li style={{ width: "100%" }}>
                      <Link
                        className="dropdown-item"
                        onClick={handleToggleDropdown}
                        to={`/get_my_request/${users._id}`}
                      >
                        My Requests
                      </Link>
                    </li>
                  ) : null}
                  <li style={{ width: "100%" }}>
                    <Link className="dropdown-item" onClick={openLogoutModal}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div>
            <button onClick={registerPage} className="btn btn-dark rounded m-2">
              Register
            </button>
            <button onClick={loginPage} className="btn btn-dark rounded m-2">
              Login
            </button>
          </div>
        )}
      </nav>
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-100 overflow-y-auto h-full w-full z-50"
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
                onClick={() => {
                  cancel();
                  handleToggleDropdown();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbars;
