import {
  faEdit,
  faExclamationTriangle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createHospitalApi,
  deletehospitalApi,
  getallhospitalsApi,
} from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";

export default function AddHospitals() {
  const users = JSON.parse(localStorage.getItem("user"));

  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [addressSearch, setAddressSearch] = useState("");
  const [bloodGroupsSearch, setBloodGroupsSearch] = useState("");
  const [hospitalSearch, sethospitalSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [filteredHospitals, setFilteredhospitals] = useState([]);
  const [filters, setFilters] = useState({
    hospitalName: "",
    hospitalAddress: "",
    // municipality: "",
  });

  const fetchHospitals = async () => {
    try {
      const response = await getallhospitalsApi(
        addressSearch,
        bloodGroupsSearch,
        hospitalSearch,
        sortBy,
        sortOrder
      );
      setHospitals(response.data.hospital);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [addressSearch, bloodGroupsSearch, hospitalSearch, sortBy, sortOrder]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  useEffect(() => {
    const filtered = hospitals.filter((hospital) => {
      return (
        (filters.hospitalName === "" ||
          hospital.hospitalName
            .toLowerCase()
            .includes(filters.hospitalName.toLowerCase())) &&
        (filters.hospitalAddress === "" ||
          hospital.hospitalAddress
            .toLowerCase()
            .includes(filters.hospitalAddress.toLowerCase())) 
        //  && (filters.municipality === "" ||
        //   hospital.municipality
        //     .toLowerCase()
        //     .includes(filters.municipality.toLowerCase()))
      );
    });
    setFilteredhospitals(filtered);
  }, [filters, hospitals]);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  // const [municipality, setMunicipality] = useState("");
  // const [wardNo, setWardNo] = useState("");
  const [hospitalContactNumber, setHospitalContactNumber] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [hospitalServices, setHospitalServices] = useState("");
  const [hospitalImage, setHospitalImage] = useState(null);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [requestII, setRequestII] = useState("");

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setHospitalImage(file);
    setImagePreview(URL?.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // making logical form data
    const formData = new FormData();
    formData.append("hospitalName", hospitalName);
    formData.append("hospitalAddress", hospitalAddress);
    // formData.append("municipality", municipality);
    // formData.append("wardNo", wardNo);
    formData.append("hospitalContactNumber", hospitalContactNumber);
    formData.append("hospitalType", hospitalType);
    formData.append("hospitalServices", hospitalServices);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("hospitalImage", hospitalImage);

    // making Api call
    createHospitalApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
          fetchHospitals();
        }
      })
      .catch((e) => {
        toast.error("Server Error");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // delete
  const handleDelete = (id) => {
    deletehospitalApi(id).then((res) => {
      if (res.data.success == true) {
        closedeleteModal(true);
        toast.success(res.data.message);
        fetchHospitals();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full sm:px-6">
        {users.isAdmin ? (
          <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex flex-row items-center justify-between">
              <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
                Hospitals
              </p>
              <div>
                <button
                  className="inline-flex sm:ml-3 mt-1 sm:mt-0 items-start justify-start px-6 py-3 bg-[#111111] hover:bg-[#ff0000] text-white focus:outline-none rounded"
                  onClick={openModal}
                >
                  Add Hospitals
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
            <div className="flex w-100 my-4 gap-2">
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="hospitalName"
                placeholder="Filter by Hospital Name"
                value={filters.hospitalName}
                onChange={handleFilterChange}
              />
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="hospitalAddress"
                placeholder="Filter by Hospital District"
                value={filters.hospitalAddress}
                onChange={handleFilterChange}
              />
              {/* <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="municipality"
                placeholder="Filter by Municipality"
                value={filters.municipality}
                onChange={handleFilterChange}
              /> */}
            </div>
          </div>

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Hospital Image</th>
                  <th className="font-normal text-left pl-4">Hospital Name</th>
                  <th className="font-normal text-left pl-12">District</th>
                  {/* <th className="font-normal text-left pl-12">Municipality</th> */}
                  {/* <th className="font-normal text-left pl-12">Ward No.</th> */}
                  <th className="font-normal text-left pl-12">Contact</th>
                  <th className="font-normal text-left pl-20">Hospital Type</th>
                  <th className="font-normal text-left pl-20">
                    Hospital Service
                  </th>
                  <th className="font-normal text-left pl-12">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="focus:outline-none"
                    >
                      Created Date
                      {sortBy === "createdAt" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </button>
                  </th>
                  {users.isBloodBank ? null : (
                    <th className="font-normal text-left pl-16">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="w-full">
                {filteredHospitals.map((item) => (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={item.hospitalImageUrl}
                            alt="Thumbnail Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.hospitalName}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.hospitalAddress}</p>
                    </td>
                    {/* <td className="pl-12">
                      <p className="font-medium">{item.municipality}</p>
                    </td> */}
                    {/* <td className="pl-12">
                      <p className="font-medium">{item.wardNo}</p>
                    </td> */}
                    <td className="pl-20">
                      <p className="font-medium">
                        {item.hospitalContactNumber}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{item.hospitalType}</p>
                    </td>
                    <td className="pl-20 overflow-y max-w-[200px] truncate">
                      <p className="font-medium">{item.hospitalServices}</p>
                    </td>
                    <td className="pl-20 overflow-y max-w-[200px] truncate">
                      <p className="font-medium">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    {users.isBloodBank ? null : (
                      <td className="px-7 2xl:px-0">
                        {/* Edit Button */}
                        <Link
                          className="focus:outline-none py-2 px-4"
                          to={`/edit-hospital/${item._id}`}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          />
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            opendeleteModal();
                            setRequestII(item._id);
                          }}
                          className="focus:outline-none ml-2 "
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 hover:text-red-700 cursor-pointer "
                          />
                        </button>
                      </td>
                    )}
                    {isdeleteModalOpen && (
                      <div
                        className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                        id="my-modal"
                      >
                        <div className="relative mx-auto p-5 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                          <h6 className="font-medium w-3/4 mx-auto text-center">
                            <FontAwesomeIcon
                              className="me-4"
                              icon={faExclamationTriangle}
                            />
                            <img
                              src="../assets/images/sure_about_that.jpg"
                              alt=""
                            />
                            Are you sure about that 👁️👁️?
                          </h6>
                          <div className="flex flex-wrap items-center justify-between mx-auto w-full">
                            <button
                              onClick={() => handleDelete(requestII)}
                              className="w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5"
                            >
                              Delete
                            </button>
                            <button
                              type="submit"
                              className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                              onClick={closedeleteModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          >
            <div className="relative top-3 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
              {/* Close button */}
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={closeModal}
                  className="text-black bg-red-500 hover:bg-red-700 rounded-lg text-sm p-2"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <form className="space-y-6">
                <h3 className=" leading-6 text-gray-900 text-center font-semibold text-2xl">
                  Add New Hospital
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Hospital Name
                    </label>
                    <input
                      onChange={changeHospitalName}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <DistrictList onChange={changeHospitalAddress} />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Municipality
                    </label>
                    <input
                      onChange={(e) => setMunicipality(e.target.value)}
                      type="text"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div> */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Ward No.
                    </label>
                    <input
                      onChange={(e) => setWardNo(e.target.value)}
                      type="number"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Contact
                    </label>
                    <input
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const floatValue = inputValue
                          ? parseFloat(inputValue)
                          : null;
                        const formattedValue =
                          floatValue !== null ? floatValue.toFixed(2) : "";
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const floatValue = inputValue
                          ? parseFloat(inputValue)
                          : null;
                        const formattedValue =
                          floatValue !== null ? floatValue.toFixed(2) : "";
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
                    onChange={handleImageUpload}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img src={imagePreview} className="w-full rounded-md" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Add Hospital"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
