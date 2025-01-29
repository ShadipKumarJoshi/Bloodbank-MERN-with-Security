import {
  faCalendar,
  faCalendarDay,
  faCheck,
  faCircleInfo,
  faDroplet,
  faExclamationCircle,
  faHospital,
  faInfo,
  faMapLocationDot,
  faPhone,
  faPhoneAlt,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import { getSingleRequestApi } from "../../../apis/api";
import CustomFaIcons from "../../../components/CustomFaIcons";
import "../../../style/Hospitals.css";
import "../../../style/ViewSingleRequest.css";

const RequestDetails = () => {
  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState("");

  useEffect(() => {
    getSingleRequestApi(id).then((res) => {
      setRequestDetails(res.data.requestblood);
    });
  }, [id]);

  if (!requestDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="viewreqContainer">
        <div className="w3-row-padding">
          <div className="w3-half">
            <div className="w3-display-container">
              <img
                className="hospital-img"
                src="https://th.bing.com/th/id/OIP.CRACOhG4JMd5LZFiPxwtMQHaFj?rs=1&pid=ImgDetMain"
                style={{ width: "100%", height: "420px" }}
                alt="hospital image"
              />
            </div>

            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h2
                className="w3-text-grey w3-padding-16"
                style={{ display: "flex", alignItems: "center" }}
              >
                <label>
                  <img
                    className="hospital-img"
                    src="../assets/icon/blood-bank.png"
                    alt=""
                    style={{ height: "5rem" }}
                    srcset=""
                  />
                </label>
                Hospital Information
              </h2>
              <div className="w3-container">
                <h5 className="w3-opacity">
                  <b>Hospital Name</b>
                </h5>
                <h6 className="w3-text text-primary">
                  <CustomFaIcons icon={faHospital} className={"m-0 me-2"} />
                  {requestDetails.hospitalName}
                </h6>
                <hr />
              </div>
              <div className="w3-container">
                <h5 className="w3-opacity">
                  <b>Hospital Address</b>
                </h5>
                <h6 className="w3-text text-primary ">
                  <CustomFaIcons
                    icon={faMapLocationDot}
                    className={"m-0 me-2"}
                  />
                  {requestDetails.hospitalAddress}
                </h6>
                <hr />
              </div>
              <div className="w3-container">
                <h5 className="w3-opacity">
                  <b>Hospital Phone Number</b>
                </h5>
                <h6 className="w3-text-teal">
                  <CustomFaIcons icon={faPhone} className={"m-0 me-2"} />
                  {requestDetails.phoneNumber}
                </h6>
                <hr />
              </div>

              <div className="w3-container">
                <h5 className="w3-opacity">
                  <b>Person To Contact</b>
                </h5>
                <h6 className="w3-text-orange">
                  <CustomFaIcons icon={faUserAlt} className={"m-0 me-2"} />
                  {requestDetails.contactPerson}
                </h6>
                <hr />
              </div>
              <div className="w3-container">
                <h5 className="w3-opacity">
                  <b>Request Uploaded By: </b>
                </h5>
                <h6 className="w3-text-teal">
                  <CustomFaIcons icon={faPhoneAlt} className={"m-0 me-2"} />
                  {requestDetails.userId.fullName}
                </h6>
                <hr />
                <br />
              </div>
            </div>
          </div>
          <div className="w3-half">
            <div className="w3-white w3-text-grey w3-card-4">
              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2
                  className="w3-text-red font-bold w3-padding-16"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>
                    <img
                      className="hospital-img"
                      src="../assets/icon/blood-bag.png"
                      alt="img"
                      style={{ height: "5rem" }}
                    />
                  </label>
                  <label className="ms-1">Blood Request Details</label>
                </h2>
                <div className="w3-container">
                  <h2 className="w3-opacity">
                    <b>Patient's Name</b>
                  </h2>
                  <h4 className="w3-text text-primary">
                    <CustomFaIcons icon={faUser} className={"m-0 me-2"} />
                    <label className="ms-2" htmlFor="">
                      {requestDetails.patientName}
                    </label>
                  </h4>
                  <hr />
                  <h2 className="w3-opacity">
                    <b>Required Blood</b>
                  </h2>
                  <h4 className="w3-text text-danger">
                    <CustomFaIcons icon={faDroplet} className={"m-0 me-2"} />
                    <label className="ms-2" htmlFor="">
                      {requestDetails.patientBloodType}
                    </label>
                  </h4>
                  <hr />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Patient's Age</b>
                  </h5>
                  <h6 className="w3-text-orange">
                    <CustomFaIcons
                      icon={faCalendarDay}
                      className={"m-0 me-2"}
                    />
                    {requestDetails.patientAge}
                  </h6>
                  <hr />
                </div>

                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Date Required </b>
                  </h5>
                  <h6 className="w3-text-orange">
                    <CustomFaIcons icon={faCalendar} className={"m-0 me-2"} />
                    {requestDetails.date}
                  </h6>
                  <hr />
                </div>

                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Amount Required</b>
                  </h5>
                  <h6 className="w3-text-orange">
                    <CustomFaIcons icon={faCheck} className={"m-0 me-2"} />
                    {requestDetails.quantity}
                  </h6>
                  <hr />
                </div>
              </div>
              <div className="w3-container">
                <h2
                  className="w3-text-grey w3-padding-16 mb-0"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>
                    <img
                      className="hospital-img"
                      src="../assets/icon/info.png"
                      alt=""
                      style={{ height: "5rem" }}
                      srcset=""
                    />
                  </label>
                  Other Information
                </h2>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Specific Components Required</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <CustomFaIcons icon={faInfo} className={"m-0 me-2"} />
                    {requestDetails.components}
                  </h6>
                  <hr />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Reasons for the necessity of the blood</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <CustomFaIcons icon={faCircleInfo} className={"m-0 me-2"} />
                    {requestDetails.reason}
                  </h6>
                  <hr />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Precautions to be taken</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <CustomFaIcons
                      icon={faExclamationCircle}
                      className={"m-0 me-2"}
                    />
                    {requestDetails.anyPrecautions}
                  </h6>
                  <hr />
                </div>
                <br />
              </div>
            </div>
          </div>
          <div
            className=" w3-container req-map-wrapper mt-4 mb-8"
            key={requestDetails._id}
          >
            <div className="row my-5">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
              <Link className="text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" to={"https://maps.app.goo.gl/dmhpATKubPv4BAZw7"}>
                Google Map
              </Link>
            </div>
          </div>
            <h3 className="map-h3">
              Location of the {requestDetails.hospitalName} hospital
            </h3>
            <MapContainer
              className="req-map-container"
              center={[requestDetails.latitude, requestDetails.longitude]}
              zoom={25}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[requestDetails.longitude, requestDetails.latitude]}
              >
                <Popup>
                  <div>
                    <h3>{requestDetails.hospitalName}</h3>
                    <p>{requestDetails.hospitalAddress}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
