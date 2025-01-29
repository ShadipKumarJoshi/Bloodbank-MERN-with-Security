import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewRequestApi } from "../../../apis/api";
import ShareButtons from "../../../components/ShareButtons";
import "../../../style/viewrequests.css";

const ViewBloodRequest = () => {
  const [bloodRequest, setBloodRequest] = useState({
    critical: [],
    urgent: [],
    normal: [],
  });

  const [show, setShow] = useState(false);
  const [activeDivId, setActiveDivId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [searchByAddress , setSearchHospitalAddress] = useState("");
  const [searchMunicipality , setSearchMunicipality] = useState("");

  useEffect(() => {
    viewRequestApi().then((res) => {
      setBloodRequest(res.data.categorizedData);
    });
  }, []);

  const handleShareClick = (id, event, patientName) => {
    event.preventDefault();
    setShow(true);
    setActiveDivId(id);
    setPatientName(patientName);
  };

  const filterRequests = (requests) => {
    return requests.filter((item) => {
      const matchesSearchTerm = item.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const mathcesHospitalAddress = item.hospitalAddress
      .toLowerCase()
      .includes(searchByAddress.toLowerCase());
      const matchesMunicipality = item.municipality
      .toLowerCase()
      .includes(searchMunicipality.toLowerCase());
      const matchesUrgency =
        !urgencyFilter ||
        item.urgency.toLowerCase() === urgencyFilter.toLowerCase();
      return matchesSearchTerm && matchesUrgency && mathcesHospitalAddress && matchesMunicipality;
    });
  };

  return (
    <>
      <div className="container pt-36" style={{marginLeft: "70px"}}>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by patient name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input w-1/4 border border-gray-300 w-50 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Search by District"
            value={searchByAddress}
            onChange={(e) => setSearchHospitalAddress(e.target.value)}
            className="search-input w-1/4 border border-gray-300 w-50 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Search by Municipality"
            value={searchMunicipality}
            onChange={(e) => setSearchMunicipality(e.target.value)}
            className="search-input w-1/4 border border-gray-300 w-50 p-2 rounded-md"
          />
          <select
            className="w-1/4 border border-gray-300 rounded-md p-2"
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="">Filter By Urgency</option>
            <option value="Critical">Critical</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>
      <div className="critical" style={{ marginTop: "6rem" }}>
        <ul className="cards">
          {filterRequests(bloodRequest.critical).map((item) => (
            <li key={item._id}>
              <a className="card">
                <div className="card_details">
                  <p>
                    <strong>Patient:</strong> {item.patientName}
                  </p>
                  <p>
                    <strong>Blood Type Needed:</strong> {item.patientBloodType}
                  </p>
                  <p>
                    <strong>Units Required:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Urgency Level:</strong> {item.urgency}
                  </p>
                  <p>
                    <strong>Additional Notes:</strong> {item.reason}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {item.hospitalName}
                  </p>
                  <p>
                    <strong>Hospital Address:</strong> {item.hospitalAddress}
                  </p>
                  <p>
                    <strong>Municipality: </strong>{item.municipality}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {item.contactPerson}
                  </p>
                </div>
                <div
                  className="card__overlay"
                  style={{ backgroundColor: "rgb(128, 16, 16)" }}
                >
                  <div
                    className="card__header text-white"
                    style={{ backgroundColor: "rgb(128, 16, 16)" }}
                  >
                    <div className="card__header-text">
                      <h3 className="card__title text-white">
                        <strong>Person To Contact:</strong> {item.contactPerson}
                      </h3>
                      <span className="card__status text-white">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <p className="card__description d-flex justify-content-between gap-2 text-white">
                    <button
                      className="btn btn-primary w-50"
                      onClick={(event) =>
                        handleShareClick(item._id, event, item.patientName)
                      }
                    >
                      Share
                    </button>
                    <Link
                      to={`/view_request/${item._id}`}
                      className="btn btn-success w-50"
                    >
                      View Request
                    </Link>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Urgent Condition Requests */}
      <div className="urgent">
        <ul className="cards">
          {filterRequests(bloodRequest.urgent).map((item) => (
            <li key={item._id}>
              <a className="card">
                <div className="card_details">
                  <p>
                    <strong>Patient:</strong> {item.patientName}
                  </p>
                  <p>
                    <strong>Blood Type Needed:</strong> {item.patientBloodType}
                  </p>
                  <p>
                    <strong>Units Required:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Urgency Level:</strong> {item.urgency}
                  </p>
                  <p>
                    <strong>Additional Notes:</strong> {item.reason}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {item.hospitalName}
                  </p>
                  <p>
                    <strong>Hospital Address:</strong> {item.hospitalAddress}
                  </p>
                  <p>
                    <strong>Municipality: </strong>{item.municipality}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {item.contactPerson}
                  </p>
                </div>
                <div
                  className="card__overlay"
                  style={{ backgroundColor: "#134c79" }}
                >
                  <div
                    className="card__header"
                    style={{ backgroundColor: "#134c79" }}
                  >
                    <div className="card__header-text">
                      <h3 className="card__title text-white">
                        <strong>Person To Contact:</strong> {item.contactPerson}
                      </h3>
                      <span className="card__status text-white">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <p className="card__description d-flex justify-content-between gap-2 text-white">
                    <button
                      className="btn btn-primary w-50"
                      onClick={(event) =>
                        handleShareClick(item._id, event, item.patientName)
                      }
                    >
                      Share
                    </button>
                    <Link
                      to={`/view_request/${item._id}`}
                      className="btn btn-success w-50"
                    >
                      View Request
                    </Link>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="normal">
        <ul className="cards">
          {filterRequests(bloodRequest.normal).map((item) => (
            <li key={item._id}>
              <a className="card">
                <div className="card_details">
                  <p>
                    <strong>Patient:</strong> {item.patientName}
                  </p>
                  <p>
                    <strong>Blood Type Needed:</strong> {item.patientBloodType}
                  </p>
                  <p>
                    <strong>Units Required:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Urgency Level:</strong> {item.urgency}
                  </p>
                  <p>
                    <strong>Additional Notes:</strong> {item.reason}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {item.hospitalName}
                  </p>
                  <p>
                    <strong>Hospital Address:</strong> {item.hospitalAddress}
                  </p>
                  <p>
                    <strong>Municipality: </strong>{item.municipality}
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {item.contactPerson}
                  </p>
                </div>
                <div
                  className="card__overlay text-white"
                  style={{ backgroundColor: "#c39715" }}
                >
                  <div
                    className="card__header"
                    style={{ backgroundColor: "#c39715" }}
                  >
                    <div className="card__header-text">
                      <h3 className="card__title text-white">
                        <strong>Person To Contact:</strong> {item.contactPerson}
                      </h3>
                      <span className="card__status text-white">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <p className="card__description d-flex justify-content-between gap-2 text-white">
                    <button
                      className="btn btn-primary w-50"
                      onClick={(event) =>
                        handleShareClick(item._id, event, item.patientName)
                      }
                    >
                      Share
                    </button>
                    <Link
                      to={`/view_request/${item._id}`}
                      className="btn btn-success w-50"
                    >
                      View Request
                    </Link>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {show && (
        <div
          className="max-h-30 rounded-md shadow-md max-w-md mx-auto transition duration-150 ease-in-out z-10 absolute top-60 right-0 bottom-100 left-0"
          id="modal"
        >
          <div role="alert" className="container mx-auto">
            <button className="btn btn-danger" onClick={() => setShow(!show)}>
              Cancel
            </button>
            <div className="relative py-8 px-8 md:px-16 bg-white dark:border-gray-700 shadow-md rounded border border-gray-400">
              <div className="d-flex flex-row justify-content-around align-items-center p-4">
                <h6>"Share blood request!"</h6>
              </div>
              <ShareButtons id={activeDivId} />
              <div className="flex items-center justify-center w-full py-4">
                <h6>Patient Name : {patientName}</h6>
              </div>
              <div
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                onClick={() => setShow(!show)}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBloodRequest;
