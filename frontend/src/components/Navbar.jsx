import {
  faCartArrowDown,
  faPersonCircleQuestion,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginModal from "../pages/Login";
import RegisterModal from "../pages/Register";

const navigation = [
  { name: "Adopt", href: "/adopt", current: false },
  { name: "Event", href: "/event", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfully");
  };
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-gray-300 fixed w-full z-50"
      style={{ fontFamily: "Poppins" }}
    >
      {({ open }) => (
        <>
          <div className="relative mx-auto w-full max-w-screen-xl h-24 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="absolute left-0 top-[12px] flex-shrink-0">
              <Link to="/home">
                <img
                  className="h-16 w-auto"
                  src="/assets/logo/logo.png"
                  alt="logo here"
                />
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-12 absolute left-36 top-[28px]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "text-[#1d1f8d] font-semibold"
                      : "text-gray-800 hover:text-[#1d1f8d]",
                    "px-3 py-2 text-lg font-medium"
                  )}
                  style={{
                    fontSize: "20px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4 absolute right-0 top-[28px]">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Menu as="div" className="relative">
                    <MenuButton className="flex rounded-full bg-orange text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img
                        className="rounded-circle"
                        src={user?.userImageUrl || "/assets/images/profile.png"}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to={`/profile/${user._id}`}
                              className={classNames(
                                active ? "bg-[#FFA500]" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to={`/pet-req/${user._id}`}
                              className={classNames(
                                active ? "bg-[#FFA500]" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Pet Requests
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to={`/changePassword/${user._id}`}
                              className={classNames(
                                active ? "bg-[#FFA500]" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Reset Password
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? "bg-[#FFA500]" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                  <div className="ml-2">
                    <span className="block text-sm font-medium text-gray-900">
                      Welcome!!
                    </span>
                    <span className="block text-sm font-medium text-gray-500">
                      {user?.fullName}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={openLoginModal}
                    className="bg-white text-black border border-solid border-gray-300 px-4 py-2 rounded-lg"
                    style={{
                      color: "#000",
                      border: "2px solid #000",
                      fontSize: "15px",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      fontFamily: "Poppins",
                      padding: "8px 20px",
                      textAlign: "center",
                      textDecoration: "none",
                      transition:
                        "background-color 500ms ease, border 500ms ease, color 500ms ease",
                      width: "115px",
                      height: "41px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      left: "10px",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#FFA500";
                      e.target.style.border = "none";
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.border = "2px solid #000";
                      e.target.style.color = "#000000";
                    }}
                  >
                    Login
                  </button>
                  <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={closeLoginModal}
                    onOpenSignup={openSignupModal}
                  />
                  <RegisterModal
                    isOpen={isSignupModalOpen}
                    onClose={closeSignupModal}
                    onOpenLogin={openLoginModal}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center md:hidden absolute top-7 right-4">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-200 text-black"
                      : "text-gray-800 hover:bg-gray-100 hover:text-black",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="px-4 pt-2 pb-3 space-y-1">
              {user ? (
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to={`/profile/${user._id}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to={`/changePassword/${user._id}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Reset Password
                  </Disclosure.Button>
                  <Disclosure.Button
                    onClick={logout}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Logout
                  </Disclosure.Button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Disclosure.Button
                    onClick={openLoginModal}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/donate"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Donor
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
