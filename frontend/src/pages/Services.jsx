import React from "react";
import "../style/Services.css";

const Services = () => {
  return (
    <>
      <div className="services">
        <header className="services-header">
          <h1 className="service-h1">eBlood Donor App</h1>
        </header>
        <section className="service-section">
          <div className="service-item">
            <h2 className="service-h2">
              User Registration, Login, and Authentication
            </h2>
            <img style={{height: "25rem"}}
              src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-red-hand-care-love-warm-blood-donation-poster-background-material-image_180048.jpg"
              alt="User Registration"
            />
            <p className="service-p">
              Users can create profiles, securely login, and the website
              authenticates their identity while logging in.
            </p>
          </div>

          <div className="service-item">
            <h2 className="service-h2">Register as a Donor</h2>
            <img
              src="https://wallpapercave.com/wp/wp7898008.jpg"
              alt="Register as a Donor"
            />
            <p className="service-p">
              This is optional for users who want to donate blood to the
              required users.
            </p>
          </div>

          <div className="service-item">
            <h2 className="service-h2">Blood Banks and Ambulance</h2>
            <img
              src="../assets/images/amb.png"
              alt="Blood Banks and Ambulance"
            />
            <p className="service-p">
              This website will contain all the possible blood banks and
              ambulance services information.
            </p>
          </div>

          <div className="service-item">
            <h2 className="service-h2">Location-Based Services</h2>
            <img
              src="../assets/images/location.png"
              alt="Location-Based Services"
            />
            <p className="service-p">
              This website can use location data to identify nearby blood banks,
              donation events, and potential donors.
            </p>
          </div>

          <div className="service-item">
            <h2 className="service-h2">Search and Matching</h2>
            <img src="../assets/images/amb.png" alt="Search and Matching" />
            <p className="service-p">
              Users will be able to search for matches based on location, blood
              type, and availability.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
