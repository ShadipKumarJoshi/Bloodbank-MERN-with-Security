import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  fetchAllUsersApi,
  getAllCampaignByBBApi,
  getallhospitalsApi,
} from "../../apis/api";

const BBDashBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [campaignss, setCampaignss] = useState([]);
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const fetchCampaigns = async () => {
    try {
      const response = await getAllCampaignByBBApi(user._id);
      setCampaignss(response?.data?.allCampaigns);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    fetchAllUsersApi()
      .then((res) => {
        setUsers(res.data.userListForBloodBank);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  let availableDonrs = users?.filter((user) => user.isAvailable === true);

  const fetchHospitals = async () => {
    try {
      const response = await getallhospitalsApi();
      setHospitals(response?.data?.allHospitals);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };
  useEffect(() => {
    fetchHospitals();
  }, []);

  const totalHospitals = hospitals?.length ?? 0;

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
      setCurrentIndexevent((prevIndex) => (prevIndex + 1) % campaignss.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndexevent, campaignss.length]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <section className="bg-white dark:bg-gray-800 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">
              Blood Bank Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 text-red-500"
                  >
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
                  </svg>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {users?.length}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Registered Donors
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 text-red-500"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {availableDonrs.length}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Availbale Donors
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 text-red-500"
                  >
                    <path d="m12 14 4-4"></path>
                    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                  </svg>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {totalHospitals}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Hospitals
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 text-red-500"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {campaignss.length}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upcoming Blood Drives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {campaignss && (
          <section className="bg-white dark:bg-gray-800 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">
                Upcoming Blood Drives
              </h2>
              <div className="bg-white py-12 w-full">
                <div className="container mx-auto px-6">
                  <div className="relative w-full mx-auto justify-center items-center overflow-hidden">
                    <div className="flex gap-8 mb-1">
                      {campaignss.map((eachCamp, index) => (
                        <div
                          key={index}
                          className="md:w-[450px] w-[95%] flex-shrink-0 md:ml-8 shadow-lg rounded-lg p-4 text-left flex flex-col justify-start items-start gap-4"
                          style={{
                            transform: `translateX(calc(${0.01 * index}% - ${
                              index * 4
                            }px - ${currentIndexevent * (100 + 4)}%))`,
                            transition: "transform 1s ease-in-out",
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${eachCamp.campaignImageUrl})`, // Added semi-transparent overlay
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BBDashBoard;
