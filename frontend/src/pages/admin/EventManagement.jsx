import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createEventApi, getAllEventsApi } from "../../apis/Api";

export default function EventManagement() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImageOneUrl, setEventImageOneUrl] = useState("");
  const [previewOne, setPreviewOne] = useState(null);
  const [previewTwo, setPreviewTwo] = useState(null);
  const [eventImageTwoUrl, setEventImageTwoUrl] = useState("");
  const [eventFileUrl, setEventFileUrl] = useState("");

  const [filterTitle, setFilterTitle] = useState("");
  const [filterOrganizedBy, setFilterOrganizedBy] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const changeEventTitle = (e) => {
    setEventTitle(e.target.value);
  };

  const changeEventContent = (e) => {
    setEventContent(e.target.value);
  };

  const changeEventDate = (e) => {
    setEventDate(e.target.value);
  };

  const handleImageOneUpload = (event) => {
    const file = event.target.files[0];
    setEventImageOneUrl(file);
    setPreviewOne(URL?.createObjectURL(file));
  };

  const handleImageTwoUpload = (event) => {
    const file = event.target.files[0];
    setEventImageTwoUrl(file);
    setPreviewTwo(URL?.createObjectURL(file));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setEventFileUrl(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // making logical form data
    const formData = new FormData();
    formData.append("eventTitle", eventTitle);
    formData.append("eventContent", eventContent);
    formData.append("organizedBy", organizedBy);
    formData.append("eventDate", eventDate);
    formData.append("eventImageOneUrl", eventImageOneUrl);
    formData.append("eventImageTwoUrl", eventImageTwoUrl);
    formData.append("eventFileUrl", eventFileUrl);

    // making Api call
    createEventApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
          fetchEvents();
        }
      })
      .catch((e) => {
        toast.error("Server Error");
    
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchEvents = async () => {
    try {
      const response = await getAllEventsApi();
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error Fetching Events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const filterEvents = () => {
    return events.filter((event) => {
      return (
        (filterTitle === "" || event.eventTitle.toLowerCase().includes(filterTitle.toLowerCase())) &&
        (filterOrganizedBy === "" || event.organizedBy.toLowerCase().includes(filterOrganizedBy.toLowerCase())) &&
        (filterDate === "" || formatDate(event.eventDate).includes(filterDate))
      );
    });
  };

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex flex-row items-center justify-between">
            <p className="inline-flex sm:ml-3 sm:mt-0 items-start justify-start px-6 py-3 text-black focus:outline-none rounded">
              Events
            </p>
            <div>
              <button
                className="inline-flex sm:ml-3 mt-1 sm:mt-0 items-start justify-start px-6 py-3 bg-[#FF8534] hover:bg-[#F24E1E] text-white focus:outline-none rounded"
                onClick={openModal}
              >
                Add Events
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
            <div className="flex w-100 my-4 gap-2">
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                type="text"
                name="filterTitle"
                placeholder="Filter by Event Title"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                type="text"
                name="filterOrganizedBy"
                placeholder="Filter by Organized By"
                value={filterOrganizedBy}
                onChange={(e) => setFilterOrganizedBy(e.target.value)}
              />
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                type="text"
                name="filterDate"
                placeholder="Filter by Event Date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Event Image One</th>
                  <th className="font-normal text-left pl-4">Event Image Two</th>
                  <th className="font-normal text-left pl-4">Event Title</th>
                  <th className="font-normal text-left pl-4">Organized By</th>
                  <th className="font-normal text-left pl-12">Start Date</th>
                  <th className="font-normal text-left pl-12">Event Details</th>
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
                {filterEvents().map((item) => (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={item.eventImageOneUrl}
                            alt="Thumbnail Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={item.eventImageTwoUrl}
                            alt="Thumbnail Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.eventTitle}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.organizedBy}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">
                        {formatDate(item.eventDate)}
                      </p>
                    </td>
                    <td className="pl-20 overflow-y max-w-[200px] truncate">
                      <p className="font-medium">{item.eventContent}</p>
                    </td>
                    <td className="pl-20 overflow-y max-w-[200px] truncate">
                      <p className="font-medium">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="pl-16">
                      {/* Add your action buttons here */}
                    </td>
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
                <h3 className="leading-6 text-gray-900 text-center font-semibold text-2xl">
                  Add new Event
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Event Title
                    </label>
                    <input
                      onChange={changeEventTitle}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Organized By
                    </label>
                    <input
                      onChange={(e) => setOrganizedBy(e.target.value)}
                      type="text"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Event Date
                    </label>
                    <input
                      onChange={changeEventDate}
                      type="date"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Event Description
                  </label>
                  <textarea
                    onChange={changeEventContent}
                    className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Event Image One
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleImageOneUpload}
                    required
                  />
                  {previewOne && (
                    <div className="mt-4">
                      <img src={previewOne} className="w-20 h-20 rounded-md" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Event Image Two
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleImageTwoUpload}
                    required
                  />
                  {previewTwo && (
                    <div className="mt-4">
                      <img src={previewTwo} className="w-20 h-20 rounded-md" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Event File
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileUpload}
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full text-white bg-[#FF8534] hover:bg-[#F24E1E] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Add Event"
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
