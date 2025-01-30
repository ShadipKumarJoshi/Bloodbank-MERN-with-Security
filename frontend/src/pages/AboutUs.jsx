import React from "react";
import { Link } from "react-router-dom";
import "../style/Aboutus.css";

const AboutUs = () => {
  return (
    <>
      <section className="aboutus-banner">
        <div className="aboutus-container">
          <h1>Blood Bank & E-Donor: About Us</h1>
          <p>Welcome to Blood Bank & E-Donor Platform</p>
        </div>
      </section>
      <section className="first">
        <div className="aboutus-container">
          <h5>Our Mission :</h5>
          <br />
          <p>
            We are driven by a singular mission:
            <br />
            To save lives by connecting generous donors with individuals in need
            of life-saving blood transfusions. We believe that every drop of
            blood counts, and together, we can make a significant impact on
            healthcare outcomes.
          </p>
          <Link className="cta" to={"/"}>
            Discover more ⟩
          </Link>
        </div>
      </section>
      {/* <section className="second">
        <div className="aboutus-container">
          <div className="left-img">
            <img src="../assets/images/contactus.png" alt="Person" />
          </div>
          <div className="right-content">
            <h5>Contact Us </h5>
            <br />
            <p>
              Feedback and Suggestions We value your feedback and suggestions.
              If you have any thoughts on how we can improve our products or
              services, or if you simply want to share your experience with us,
              we'd love to hear from you.
              <br />
              Connect With Us on Social Media Stay updated on the latest news,
              promotions, and announcements by connecting with us on social
              media. Facebook Twitter Instagram We appreciate your communication
              and will do our best to respond to your inquiries promptly. Thank
              you for choosing us!
            </p>
            <Link className="cta" to={"/contact-us"}>
              Contact Us »
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default AboutUs;
