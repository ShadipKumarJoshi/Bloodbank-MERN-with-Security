import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchSingleHospitalApi, updatehospitalApi } from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";
import e from "cors";

const EditHospital = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  // const [municipality, setMunicipality] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [hospitalContactNumber, setHospitalContactNumber] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [hospitalServices, setHospitalServices] = useState("");
  const [hospitalImage, setHospitalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL
  const [oldimagePreview, setOldImagePreview] = useState(null); // State to hold the image preview URL

  const changeHospitalName = (e) => {
    setHospitalName(e.target.value);
  };

  const changeHospitalAddress = (e) => {
    setHospitalAddress(e.target.value);
  };

  const changeHospitalContact = (e) => {
    setHospitalContactNumber(e.target.value);
  };

  const changeHospitalType = (e) => {
    setHospitalType(e.target.value);
  };
  const changeHospitalServices = (e) => {
    setHospitalServices(e.target.value);
  };

  useEffect(() => {
    fetchSingleHospitalApi(id).then((res) => {
      setHospitalName(res.data.hospital.hospitalName);
      setHospitalAddress(res.data.hospital.hospitalAddress);
      // setMunicipality(res.data.hospital.municipality);
      setWardNo(res.data.hospital.wardNo);
      setHospitalContactNumber(res.data.hospital.hospitalContactNumber);
      setHospitalType(res.data.hospital.hospitalType);
      setHospitalServices(res.data.hospital.hospitalServices);
      setLatitude(res.data.hospital.latitude);
      setLongitude(res.data.hospital.longitude);
      setOldImagePreview(res.data.hospital.hospitalImageUrl);
    });
  }, [id]);

  const updateHopital = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("hospitalName", hospitalName);
    formData.append("hospitalAddress", hospitalAddress);
    // formData.append("municipality", municipality);
    formData.append("wardNo", wardNo);
    formData.append("hospitalContactNumber", hospitalContactNumber);
    formData.append("hospitalType", hospitalType);
    formData.append("hospitalServices", hospitalServices);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("hospitalImage", hospitalImage);

    updatehospitalApi(id, formData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((e) => {
        toast.error(e.message);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setHospitalImage(selectedImage);
    if (selectedImage) {
      setImagePreview(URL?.createObjectURL(selectedImage));
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-0 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <Link
            to={"/admin/dashboard"}
            className="text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </div>
        <form className="space-y-1 m-0">
          <h3 className="mb-4 leading-6 text-gray-900 text-center font-semibold text-2xl">
            Edit Hospital
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Hospital Name
              </label>
              <input
                value={hospitalName}
                onChange={changeHospitalName}
                type="text"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <DistrictList
                dynamicValue={hospitalAddress}
                onChange={changeHospitalAddress}
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-900">
                Municipality
              </label>
              <input
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)} 
                type="text"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Ward No
              </label>
              <input
                value={wardNo}
                onChange={(e) => setWardNo(e.target.value)}
                type="number"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Contact
              </label>
              <input
                value={hospitalContactNumber}
                onChange={changeHospitalContact}
                type="number"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Hospital Type
              </label>
              <input
                value={hospitalType}
                onChange={changeHospitalType}
                type="text"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Latitude
              </label>
              <input
                value={latitude}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
                  const formattedValue = floatValue !== null ? floatValue.toFixed(2) : '';
                  setLatitude(formattedValue);
                }}
                type="number"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Longitude
              </label>
              <input
                value={longitude}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
                  const formattedValue = floatValue !== null ? floatValue.toFixed(2) : '';
                  setLongitude(formattedValue);
                }}
                type="number"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Hospital Description
              </label>
              <textarea
                value={hospitalServices}
                onChange={changeHospitalServices}
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium  text-gray-900">
              Hospital Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
              required
            />
            <div className="flex">
              {oldimagePreview && (
                <img
                  src={oldimagePreview}
                  alt="Event Preview"
                  className="mt-2 w-32 h-32 p-4 object-cover"
                />
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Event Preview"
                  className="mt-2 w-32 h-32 p-4 object-cover"
                />
              )}
            </div>
          </div>
          <button
            onClick={updateHopital}
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Update Hospital"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHospital;
