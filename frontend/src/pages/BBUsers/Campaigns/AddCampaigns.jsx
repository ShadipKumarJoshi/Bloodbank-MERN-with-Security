import {
  faEdit,
  faExclamationTriangle,
  faEye,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCampaignApi,
  deleteCampaignApi,
  getAllCampaignByBBApi,
  getRegisteredUsersApi,
} from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";
import InterestedUsers from "./InterestedUsers";

export default function AddCampaigns() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [campaigns, setCampaignss] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [longitude, setLongitude] = useState("");

  const fetchCampaigns = async () => {
    try {
      const response = await getAllCampaignByBBApi(user._id);
      setCampaignss(response.data.allCampaigns);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  const getAllInterestedUsers = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <InterestedUsers
            onClose={onClose}
            interestedUsers={interestedUsers}
          />
        );
      },
    });
  };

  useEffect(() => {
    getRegisteredUsersApi(user._id).then((res) => {
      setInterestedUsers(res.data.registeredUsers);
    });
    fetchCampaigns();
  }, [user._id]);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const [campaignName, setCampaignsName] = useState("");
  const [campaignStartDate, setCampaignsStartDate] = useState("");
  const [campaignEndDate, setCampaignsEndDate] = useState("");
  const [campaignLocation, setCampaignsLocation] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [campaignGoal, setCampaignsGoal] = useState("");
  const [campaignImage, setCampaignsImage] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [campaignDelId, setCampaignDelId] = useState("");

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCampaignsImage(file);
    setImagePreview(URL?.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // making logical form data
    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("campaignStartDate", campaignStartDate);
    formData.append("campaignEndDate", campaignEndDate);
    formData.append("campaignLocation", campaignLocation);
    formData.append("municipality", municipality);
    formData.append("wardNo", wardNo);
    formData.append("campaignGoal", campaignGoal);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("campaignImage", campaignImage);
    formData.append("user", user._id);

    // making Api call
    addCampaignApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
          fetchCampaigns();
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  // delete
  const handleDelete = (id) => {
    deleteCampaignApi(id).then((res) => {
      if (res.data.success == true) {
        toast.success(res.data.message);
        closedeleteModal(true);
        fetchCampaigns();
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
        <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex flex-row items-center justify-between">
            <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
              Campaigns
            </p>
            <div>
              <button
                className="inline-flex sm:ml-3 mt-1 sm:mt-0 items-start justify-start px-6 py-3 bg-[#111111] hover:bg-[#ff0000] text-white focus:outline-none rounded"
                onClick={openModal}
              >
                Add campaigns
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          {/* <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
            <div className="w-full md:w-1/3">
              <BloodGroupLists
                onChange={(e) => setBloodGroupsSearch(e.target.value)}
                value={bloodGroupsSearch}
              />
            </div>
            <div className="w-full md:w-1/3 md:mt-0">
              <DistrictList
                onChange={(e) => setAddressSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 md:mt-0">
              <label
                htmlFor="filterSelect"
                className="block text-sm font-medium my-1 text-gray-700"
              >
                Hospital
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                placeholder="Search campaigns..."
                onChange={(e) => setCampaignssearch(e.target.value)}
              />
            </div>
          </div> */}

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">CampaignImage</th>
                  <th className="font-normal text-left pl-4">Campaign Name</th>
                  <th className="font-normal text-left pl-12">Start Date</th>
                  <th className="font-normal text-left pl-12">End Date</th>
                  <th className="font-normal text-left pl-20">Location</th>
                  <th className="font-normal text-left pl-20">Goal</th>
                  {/* <th className="font-normal text-left pl-20">Raised</th> */}
                  {/* <th className="font-normal text-left pl-20">Donors</th> */}
                  {/* <th className="font-normal text-left pl-20">Donations</th> */}
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
                  <th className="font-normal text-left pl-16">Action</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {campaigns &&
                  campaigns?.map((item) => (
                    <tr
                      key={item._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <img
                              className="w-full h-full"
                              src={item.campaignImageUrl}
                              alt="Thumbnail Image"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item.campaignName}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">
                          {formatDate(item.campaignStartDate)}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">
                          {formatDate(item.campaignEndDate)}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{item.campaignLocation}</p>
                      </td>
                      <td className="pl-20 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">{item.campaignGoal}</p>
                      </td>
                      {/* <td className="pl-20 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">{item.campaignRaised}</p>
                      </td>
                      <td className="pl-20 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">{item.campaignDonors}</p>
                      </td>

                      <td className="pl-20 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">{item.campaignDonations}</p>
                      </td> */}

                      <td className="pl-20 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-7 2xl:px-0">
                        {/* Edit Button */}
                        <Link
                          onClick={() => getAllInterestedUsers(item._id)}
                          title="View Interested Users"
                          className="focus:outline-none py-2 px-4"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                        {/* <Link
                          title="Edit Campaign"
                          className="focus:outline-none py-2 px-4"
                          to={`/update_campaign/${item._id}`}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          />
                        </Link> */}
                        {/* Delete Button */}
                        <button
                          title="Delete Campaign"
                          onClick={() => {
                            opendeleteModal();
                            setCampaignDelId(item._id);
                          }}
                          className="focus:outline-none ml-2 "
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 hover:text-red-700 cursor-pointer "
                          />
                        </button>
                      </td>
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
                                onClick={() => handleDelete(campaignDelId)}
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
                  Add New Campaign
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Campaign Name
                    </label>
                    <input
                      onChange={(e) => setCampaignsName(e.target.value)}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <DistrictList
                      label={"Select the Location"}
                      onChange={(e) => setCampaignsLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Municipality
                    </label>
                    <input
                      onChange={(e) => setMunicipality(e.target.value)}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Ward No.
                    </label>
                    <input
                      onChange={(e) => setWardNo(e.target.value)}
                      type="number"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Start Date
                    </label>
                    <input
                      onChange={(e) => setCampaignsStartDate(e.target.value)}
                      type="date"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      End Date
                    </label>
                    <input
                      onChange={(e) => setCampaignsEndDate(e.target.value)}
                      type="date"
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
                      Campaign Goal
                    </label>
                    <textarea
                      onChange={(e) => setCampaignsGoal(e.target.value)}
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Image
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
                    "Add Campaign"
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
