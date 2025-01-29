import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { getRegisteredUsersApi, viewCampaignApi } from "../../apis/api";
import InterestedUsers from "../BBUsers/Campaigns/InterestedUsers";

export default function Campaigns() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [campaigns, setCampaignss] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [longitude, setLongitude] = useState("");

  const fetchCampaigns = async () => {
    try {
      const response = await viewCampaignApi();
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

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex flex-row items-center justify-between">
            <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
              Campaigns
            </p>
            <div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">CampaignImage</th>
                  <th className="font-normal text-left pl-4">Campaign Name</th>
                  <th className="font-normal text-left pl-4">Added By</th>
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
                  {/* <th className="font-normal text-left pl-16">Action</th> */}
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
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item.user.fullName}
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
                      {/* <td className="px-7 2xl:px-0">
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
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
