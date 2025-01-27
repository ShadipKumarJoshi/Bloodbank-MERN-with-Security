import {
  faExclamationCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAdoptionApi, getAllAdoptionReqApi } from "../../apis/Api";

export default function AdoptManagement() {
  const [adoption, setAdoption] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [requestII, setRequestII] = useState("");

  // State for filters
  const [filterName, setFilterName] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterMunicipality, setFilterMunicipality] = useState("");

  const fetchAllAdoption = async () => {
    try {
      await getAllAdoptionReqApi().then((res) => {
        setAdoption(res?.data?.adoptions);
        
      });
    } catch (error) {
      console.error("Error Fetching Adoptions", error);
    }
  };

  useEffect(() => {
    fetchAllAdoption();
  }, [adoption?.length]);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // delete
  const handleDelete = (id) => {
    // make Api call
    deleteAdoptionApi(id).then((res) => {
      if (res.data.success === true) {
        toast.success(res.data.message);
        closedeleteModal(true);
        fetchAllAdoption();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const filteredAdoption = adoption.filter((item) => {
    return (
      (filterName === "" ||
        item.pet.fullName.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterDistrict === "" ||
        item.user.address.toLowerCase().includes(filterDistrict.toLowerCase())) &&
      (filterMunicipality === "" ||
        item.user.address.toLowerCase().includes(filterMunicipality.toLowerCase()))
    );
  });

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex flex-row items-center justify-between">
            <p className="inline-flex sm:ml-3 sm:mt-0 items-start justify-start px-6 py-3 text-black focus:outline-none rounded">
              Adoption Management
            </p>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5">
          <div className="flex w-100 my-4 gap-2">
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              placeholder="Filter by Adoption Name"
              value={filterName}
              onChange={(e) => handleFilterChange(e, setFilterName)}
            />
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              placeholder="Filter by District"
              value={filterDistrict}
              onChange={(e) => handleFilterChange(e, setFilterDistrict)}
            />
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              placeholder="Filter by Municipality"
              value={filterMunicipality}
              onChange={(e) => handleFilterChange(e, setFilterMunicipality)}
            />
          </div>

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Pet Image</th>
                  <th className="font-normal text-left pl-4">Pet Name</th>
                  <th className="font-normal text-left pl-12">Pet Age</th>
                  <th className="font-normal text-left pl-12">
                    User Full Name
                  </th>
                  <th className="font-normal text-left pl-12">User Email</th>
                  <th className="font-normal text-left pl-12">Address</th>
                  <th className="font-normal text-left pl-12">Status</th>
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
                {filteredAdoption &&
                  filteredAdoption.map((item) => (
                    <tr
                      key={item._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <img
                              className="w-full h-full"
                              src={
                                item.pet.petImageUrlOne ??
                                item.pet.petImageUrlFive
                              }
                              alt="Adoption Image"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.pet.fullName}</p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item?.pet?.petAge ?? "N/A"}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item?.user?.fullName}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item?.user?.email}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item?.user?.address}</p>
                      </td>
                      <td className="pl-12">
                        {item?.isAccepted === false ? (
                          <span className="text-red-600">Not Accepted</span>
                        ) : (
                          <span className="text-green-400">Accepted</span>
                        )}
                      </td>
                      <td className="pl-12 overflow-y max-w-[200px] truncate">
                        <p className="font-medium">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="pl-12">
                        {/* Delete Button */}
                        <Link
                          className="focus:outline-none py-2 px-4 bg-[#ff0000] hover:!bg-[#000000] rounded-lg cursor-pointer"
                          onClick={() => {
                            opendeleteModal();
                            setRequestII(item._id);
                          }}
                          title="Delete Item"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            title="Delete Item"
                            className="text-[#ffffff] cursor-pointer"
                          />
                        </Link>

                        {isdeleteModalOpen && (
                          <div
                            className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                            id="my-modal"
                          >
                            <div className="relative mx-auto p-5 border shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                              <h6 className="font-medium w-3/4 mx-auto text-center">
                                <FontAwesomeIcon
                                  className="text-red-500 mr-2"
                                  icon={faExclamationCircle}
                                />
                                Are you sure about that action?
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
                      </td>
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
