import "leaflet/dist/leaflet.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHospitalsApi } from "../../../apis/api";
import CustomCircularProgress from "../../../components/CustomCircularProgress";
import "../../../style/Hospitals.css";

const Hospitals = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHospitalsApi().then((res) => {
      setIsLoading(true);
      if (res.data.success && res.data.hospital.length > 0) {
        setHospitalData(res.data.hospital);
      }
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="hospital-wrapper">
        <h1 className="text-center text-red-800">List of all the Hospitals</h1>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
        {hospitalData.map((hospital) => (
          <Link
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            key={hospital._id}
            to={`/single-hospital/${hospital._id}`}
          >
            {isLoading ? (
              <img
                src={
                  hospital.hospitalImageUrl ??
                  "https://www.brookings.edu/wp-content/uploads/2017/05/hospital002.jpg"
                }
                alt="Hospital"
                className="w-full h-48 object-cover"
                width="300"
                height="200"
                style={{ aspectRatio: "300 / 200", objectFit: "cover" }}
              />
            ) : (
              <CustomCircularProgress />
            )}
            <div className="p-4">
              <h3 className="text-lg text text-gray-800 font-bold mb-2 !no-underline">
                {hospital.hospitalName}
              </h3>
              <p className="text-gray-500 mb-2 !no-underline">{hospital.hospitalAddress}</p>
              <p className="text-gray-700 line-clamp-3 !no-underline">
                {hospital.hospitalServices}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Hospitals;
