import "leaflet/dist/leaflet.css";
import "../../../style/BloodBank.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallBloodBankApi } from "../../../apis/api";

const BloodBanks = () => {
  const [bloodbankData, setBloodbankData] = useState([]);

  useEffect(() => {
    getallBloodBankApi().then((res) => {
      if (res.data.success) {
        setBloodbankData(res?.data?.bloodBank);
      }
    });
  }, []);

  return (
    <>
      <div className="bloodbank-wrapper">
        <h1 className="text-center text-primary">List of all BloodBanks</h1>
        <div className="bloodbank-container">
          {bloodbankData?.map((bloodbank) => (
            <Link
              className="bloodbank-card text-decoration-none"
              key={bloodbank._id}
              to={`/single-bloodbank/${bloodbank._id}`}
            >
              <img
                className="image-container"
                src={bloodbank.userImageURL}
                alt={bloodbank.bbName}
                style={{ height: "20rem",width:"100%", objectFit: "cover"}}
              />
              <div className="d-flex flex-row gap-4 justify-content-between">
                <h3 className="map-h3">{bloodbank.bbName}</h3>
                <h3 className="map-h3">{bloodbank.bbAddress}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BloodBanks;
