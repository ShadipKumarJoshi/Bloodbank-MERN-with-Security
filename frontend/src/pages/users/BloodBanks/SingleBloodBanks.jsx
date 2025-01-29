import {
  faCalendar,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import "leaflet/dist/leaflet.css";  
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchSingleBloodBankApi,
  getAllCampaignByBBApi,
  registerForCampaignApi,
} from "../../../apis/api";
import BloodGroupLists from "../../../components/BloodGroupsList";

const SingleBloodbank = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [bloodbank, setBloodbank] = useState("");
  const [campaign, setCampaign] = useState([]);
  const [fetchedBg, setFetchedBG] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // making logical form data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("bloodGroup", bloodGroup);
    formData.append("campaigns", id);

    // making Api call
    registerForCampaignApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
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

  useEffect(() => {
    fetchSingleBloodBankApi(id).then((res) => {
      setBloodbank(res.data.bloodbank);
      const bg = res.data.bloodbank.availableBloodGroups;
      const combinedString = bg[0];
      const splitValues = combinedString.split(",");
      setFetchedBG(splitValues);
    });
  }, [id]);

  const fetchCampaigns = async () => {
    try {
      const response = await getAllCampaignByBBApi(id);
      setCampaign(response.data.allCampaigns);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Add leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const [currentIndexevent, setCurrentIndexevent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexevent((prevIndex) => (prevIndex + 1) % campaign.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndexevent, campaign.length]);

  if (!bloodbank) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="container-fluid p-5 mt-5">
          <section className="relative m-0 p-5">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                <div className="img">
                  <div className="img-box h-full max-lg:mx-auto ">
                    <img
                      src={bloodbank.userImageURL}
                      alt="red Tropical Printed Shirt image"
                      className="max-lg:mx-auto lg:ml-auto h-full"
                    />
                  </div>
                </div>
                <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                  <div className="data w-full max-w-xl">
                    <p className="text-lg font-medium leading-8 text-red-800 mb-4">
                      BloodBank&nbsp;🩸&nbsp;
                    </p>
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                      {bloodbank.bbName}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                      <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                        Address : {bloodbank.bbAddress}
                      </h6>
                      <div className="flex items-center gap-2">
                        <span className=" font-bold leading-7 text-green-600 text-lg ">
                          Contact No. : {bloodbank.bbContact}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-base font-normal mb-4">
                      {bloodbank.specialInstructions}
                    </p>

                    <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                      Availbale Blood Groups :
                    </p>
                    <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                      {bloodbank?.availableBloodGroups ? (
                        <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                          {fetchedBg?.map((bloodGroup) => (
                            <button className="bg-red-800 text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-white border border-red-800 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-red-400 hover:!text-gray-900 hover:border-gray-3000">
                              {bloodGroup}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="w-full">No Available Blood Groups</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                      <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                        Operating Hours: {bloodbank.operatingHours}
                      </p>
                    </div>
                    <p className="text-gray-800 text-lg mb-4">
                      Our Services: {bloodbank.serviceOffered}
                    </p>
                    <div className="flex items-center gap-3">
                      {users ? (
                        <Link
                          className="text-center w-full px-4 py-4 rounded-lg bg-gray-900 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-red-800 hover:shadow-red-800"
                          to={`/req_for_bb/${bloodbank._id}`}
                        >
                          Request Blood
                        </Link>
                      ) : (
                        <Link
                          to={"/login"}
                          className="text-center w-full px-4 py-4 rounded-lg bg-gray-900 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-red-800 hover:shadow-red-800"
                        >
                          Please Login to Request Blood
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <p className="text-gray-900 text-base font-normal mb-5">
            {bloodbank.additionalNotes}
          </p>
          <div className="bg-white py-12 w-full">
            <div className="container mx-auto px-6">
              <div className="flex flex-col w-full md:w-1/4 mx-auto">
                <h2 className="text-4xl font-bold text-center text-red-700 mb-8 mt-2">
                  Upcoming Campaigns
                  <div className="border-2 border-solid border-red-700 mt-2"></div>
                </h2>
              </div>
              <div className="relative w-full mx-auto justify-center items-center overflow-hidden">
                <div className="flex gap-8 mb-1">
                  {campaign &&
                    campaign.map((eachCamp, index) => (
                      <div
                        key={index}
                        className="md:w-[450px] w-[95%] flex-shrink-0 md:ml-8 shadow-lg rounded-lg p-4 text-left flex flex-col justify-start items-start gap-4"
                        style={{
                          transform: `translateX(calc(${0.01 * index}% - ${
                            index * 4
                          }px - ${currentIndexevent * (100 + 4)}%))`,
                          transition: "transform 1s ease-in-out",
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${eachCamp.campaignImageUrl})`, 
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          color: "white",
                        }}
                      >
                        <div className="relative">
                          <span className="bg-red-700 text-white py-1 px-3 rounded-br-lg capitalize">
                            Free
                          </span>
                        </div>
                        <div className="w-full overflow-hidden px-6 py-4">
                          <div className="font-bold text-2xl mb-2">
                            {eachCamp.campaignName}
                          </div>
                          <p className="text-white text-base">
                            {" "}
                            {/* Set text color to white */}
                            {eachCamp.campaignGoal}
                          </p>
                        </div>
                        <div className="flex justify-between w-full px-4 py-4">
                          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white">
                            {" "}
                            {/* Set text color to white */}
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="mr-2 text-white"
                            />
                            <span className="text-green-100">
                              {formatDate(eachCamp.campaignStartDate)}
                            </span>
                            {"  --  "}
                            <span className="text-red-100">
                              {formatDate(eachCamp.campaignEndDate)}
                            </span>
                          </span>
                          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white capitalize">
                            {" "}
                            {/* Set text color to white */}
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="mr-2"
                            />
                            {eachCamp.campaignLocation}
                          </span>
                        </div>
                        <div className="flex ml-auto pr-6 pb-6">
                          {
                            <Link
                              onClick={openModal}
                              className="bg-red-700 text-white py-2 px-4 rounded md:ml-auto"
                            >
                              Register
                            </Link>
                          }
                        </div>
                      </div>
                    ))}
                    {campaign.length === 0 && <p className="w-full text-center">No Campaigns Available !!!</p>}
                </div>
              </div>
            </div>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 p-44 overflow-y-auto h-full w-full"
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
                      Register For This Campaign
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Full Name
                        </label>
                        <input
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <BloodGroupLists
                          label={"Select your BloodGroup"}
                          onChange={(e) => setBloodGroup(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Number
                        </label>
                        <input
                          onChange={(e) => setNumber(e.target.value)}
                          type="number"
                          className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      {/* <div>
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
                  </div> */}
                      {/* <div>
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
                  </div> */}
                      {/* <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Campaign Goal
                    </label>
                    <textarea
                      onChange={(e) => setCampaignsGoal(e.target.value)}
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      rows="4"
                      required
                    ></textarea>
                  </div> */}
                    </div>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isLoading}
                      className="text-center px-4 py-4 rounded-lg bg-gray-900 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-red-800 hover:shadow-red-800"
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Register tor this Campaign"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="row my-5">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
              <Link className="text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" to={"https://maps.app.goo.gl/dmhpATKubPv4BAZw7"}>
                Google Map
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12 p-0">
              <MapContainer
                className="req-map-container"
                // center={[bloodbank.latitude, bloodbank.longitude]}
                zoom={25}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker 
                // position={[bloodbank.latitude, bloodbank.longitude]}
                >
                  <Popup>
                    <div>
                      <h3>{bloodbank.bbName}</h3>
                      <p>{bloodbank.bbAddress}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBloodbank;
