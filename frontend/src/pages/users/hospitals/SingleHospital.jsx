import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import { fetchSingleHospitalApi } from "../../../apis/api";

const SingleHospital = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    fetchSingleHospitalApi(id).then((res) => {
      setHospital(res.data.hospital);
    });
  }, [id]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="container-fluid p-5 mt-5">
          <div className="row mb-4">
            <div className="col-md-6 p-0">
              <img
                src={hospital.hospitalImageUrl}
                className="img-fluid rounded-4 h-100"
                alt="Hospital Image"
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{hospital.hospitalName}</h2>
                  <p className="card-text">{hospital.hospitalAddress}</p>
                  <p className="card-text">
                    Phone: {hospital.hospitalContactNumber}
                  </p>
                  <p className="card-text"> {hospital.hospitalType}</p>
                  <p className="card-text"> {hospital.hospitalServices}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="row my-5">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
              <Link className="text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" to={"https://maps.app.goo.gl/dmhpATKubPv4BAZw7"}>
                Google Map
              </Link>
            </div>
          </div>
            <div className="col-12 p-0">
              <MapContainer
                className="req-map-container"
                center={[hospital.latitude, hospital.longitude]}
                zoom={25}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[hospital.latitude, hospital.longitude]}>
                  <Tooltip>
                    <div>
                      <h3>{hospital.hospitalName}</h3>
                      <p>{hospital.hospitalAddress}</p>
                    </div>
                  </Tooltip>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHospital;
