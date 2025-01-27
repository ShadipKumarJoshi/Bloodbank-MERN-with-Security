import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <footer className="bg-[#004AAD] bottom-0 text-white pt-10">
      <div className="mx-5 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <FontAwesomeIcon icon={faEnvelope} style={{ width: '15.02px', height: '15.02px' }} />
          <span style={{ fontSize: '15px' }}>petadapt@gmail.com</span>
        </div>
        <div className="text-center mb-4 md:mb-0 md:w-3/3">
          <nav className="space-x-4 mb-4 md:mb-2 flex justify-center" style={{ paddingLeft: '120px' }}>
            <Link to={"/faq"} className="hover:underline" style={{ fontSize: '20px' }}>
              FAQ
            </Link>
            <Link to={"/terms-and-condition"} className="hover:underline" style={{ fontSize: '20px' }}>
              Terms and Conditions
            </Link>
            <Link to={"/about"} className="hover:underline" style={{ fontSize: '20px' }}>
              About
            </Link>
          </nav>
          <p className="text-sm  md:text-base" style={{ fontSize: '16px', paddingLeft: '120px' }}>
            Petadapt is a platform to connect pets with families and rehome
            the needy furry friends.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPhone} style={{ width: '15.02px', height: '15.02px' }} />
          <span style={{ fontSize: '15px' }}>+977 9813080652 / Dillibazar Kathmandu</span>
        </div>
      </div>
      <div className="bg-[#004AAD] h-16 flex justify-between mt-8 overflow-hidden">
        <span className="w-2/4 relative bottom-[-25px] rounded-r-full bg-[#f24c00]"></span>
        <span className="w-1/3 container relative bottom-[-15px] flex items-start justify-center h-16 space-x-4">
          <img
            src="assets/images/facebook.png"
            alt="fb"
            className="h-7 w-7"
          />
          <img src="assets/images/linked.png" alt="fb" className="h-7 w-7" />
          <img src="assets/images/insta.png" alt="fb" className="h-7 w-7" />
          <img src="assets/images/twitter.png" alt="fb" className="h-7 w-7" />
        </span>
        <span className="w-2/4 relative bottom-[-25px] rounded-l-full bg-[#f24c00]"></span>
      </div>
    </footer>
  );
};

export default Footers;
