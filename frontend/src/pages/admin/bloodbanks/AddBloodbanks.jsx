import {
  faExclamationCircle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBloodBankApi,
  deleteBloodBankApi,
  getallBloodBankApi,
} from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";
import MultiSelectBG from "../../../components/MultiSeletctBG";

export default function AddBloodBanks() {
  // useEffect for fetching all the products and showing in table
  const [bloodBank, setBloodBank] = useState([]);

  const [bbAddressSearch, setbbAddressSearch] = useState("");
  const [bloodGroupsSearch, setBGsearch] = useState("");
  const [bbNameSearch, setBBNameSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bbImage, setBloodBankImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestII, setRequestII] = useState("");

  const [filteredBloodBank, setfilteredBloodBank] = useState([]);
  const [filters, setFilters] = useState({
    bbName: "",
    bbAddress: "",
    municipality: "",
  });

  const fetchBloodBanks = async () => {
    try {
      const response = await getallBloodBankApi(
        bbAddressSearch,
        bloodGroupsSearch,
        bbNameSearch,
        sortBy,
        sortOrder
      );

      setBloodBank(response?.data?.bloodBanks);
    } catch (error) {
      console.error("Error Fetching BloodBanks", error);
    }
  };

  useEffect(() => {
    fetchBloodBanks();
  }, [bbAddressSearch, bbNameSearch, bloodGroupsSearch, sortBy, sortOrder]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = bloodBank.filter((hospital) => {
      return (
        (filters.bbName === "" ||
          hospital.bbName
            .toLowerCase()
            .includes(filters.bbName.toLowerCase())) &&
        (filters.bbAddress === "" ||
          hospital.bbAddress
            .toLowerCase()
            .includes(filters.bbAddress.toLowerCase())) &&
        (filters.municipality === "" ||
          hospital.municipality
            .toLowerCase()
            .includes(filters.municipality.toLowerCase()))
      );
    });
    setfilteredBloodBank(filtered);
  }, [filters, bloodBank]);

  const [bbName, setbbName] = useState("");
  const [bbAddress, setbbAddress] = useState("");
  const [bbContact, setbbContact] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [serviceOffered, setServiceOffered] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [availableBloodGroups, setAvailableBloodGroups] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const searchbyname = (e) => {
    setBBNameSearch(e.target.value);
  };

  const changebbName = (e) => {
    setbbName(e.target.value);
  };

  const changebbAddress = (e) => {
    setbbAddress(e.target.value);
  };

  const changebbContact = (e) => {
    setbbContact(e.target.value);
  };

  const changeOperatingHours = (e) => {
    setOperatingHours(e.target.value);
  };
  const changeAvailableBloodGroups = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setAvailableBloodGroups(selectedValues);
  };
  const changeSocialMediaLinks = (e) => {
    setSocialMediaLinks(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; //files not file
    setBloodBankImage(file);
    setImagePreview(URL?.createObjectURL(file));
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append("bName", bbName);
    formData.append("bAddress", bbAddress);
    formData.append("bContact", bbContact);
    formData.append("oHours", operatingHours);
    formData.append("bgavailable", availableBloodGroups);
    formData.append("serviceOffered", serviceOffered);
    formData.append("specialInstructions", specialInstructions);
    formData.append("additionalNotes", additionalNotes);
    formData.append("socialLinks", socialMediaLinks);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("bbImage", bbImage);

    createBloodBankApi(formData)
      .then((res) => {
        // console.log(res.data);

        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
          fetchBloodBanks();
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

  // delete
  const handleDelete = (id) => {
    // make Api call
    deleteBloodBankApi(id).then((res) => {
      if (res.data.success == true) {
        toast.success(res.data.message);
        closedeleteModal(true);
        fetchBloodBanks();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex flex-row items-center justify-between">
            <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
              BloodBanks
            </p>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5">
          <div className="flex w-100 my-4 gap-2">
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="bbName"
              placeholder="Filter by BloodBank Name"
              value={filters.bbName}
              onChange={handleFilterChange}
            />
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="bbAddress"
              placeholder="Filter by District"
              value={filters.bbAddress}
              onChange={handleFilterChange}
            />
            <input
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="municipality"
              placeholder="Filter by Municipality"
              value={filters.municipality}
              onChange={handleFilterChange}
            />
          </div>

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">
                    BloodBank Image
                  </th>
                  <th className="font-normal text-left pl-12">
                    BloodBank Name
                  </th>
                  <th className="font-normal text-left pl-12">Municipality</th>
                  <th className="font-normal text-left pl-12">Ward No.</th>
                  <th className="font-normal text-left pl-12">
                    BloodBank Address
                  </th>
                  <th className="font-normal text-left pl-12">
                    BloodBank Contact
                  </th>
                  <th className="font-normal text-left pl-12">
                    Operating Hours
                  </th>
                  <th className="font-normal text-left pl-12">
                    BLoodGroups Available
                  </th>
                  <th className="font-normal text-left pl-12">
                    SocialMedia Links
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
                  <th className="font-normal text-left pl-16">Action</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {filteredBloodBank &&
                  filteredBloodBank.map((item) => (
                    <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <img
                              className="w-full h-full"
                              src={item.userImageURL}
                              alt="BloodBank Image"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.bbName}</p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item.bbAddress}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item.municipality}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {item.ward}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.bbContact}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.operatingHours}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">
                          {item.availableBloodGroups}
                        </p>
                      </td>

                      <td
                        className="pl-12"
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p
                          className="font-medium"
                          title={item.socialMediaLinks}
                        >
                          {item.socialMediaLinks.length > 20
                            ? `${item.socialMediaLinks.substring(0, 20)}...`
                            : item.socialMediaLinks}
                        </p>
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
                            <div className="relative mx-auto p-5 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                              <h6 className="font-medium w-3/4 mx-auto text-center">
                                <FontAwesomeIcon
                                  className="me-4"
                                  icon={faExclamationCircle}
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
                  Add New BloodBank
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      BloodBank Name
                    </label>
                    <input
                      onChange={changebbName}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <DistrictList onChange={changebbAddress} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      BLood Bank Contact
                    </label>
                    <input
                      onChange={changebbContact}
                      type="number"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <MultiSelectBG onChange={changeAvailableBloodGroups} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      BloodBank Operating Hours
                    </label>
                    <input
                      type="text"
                      onChange={changeOperatingHours}
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      rows="4"
                      required
                    ></input>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      SocialMedia Links
                    </label>
                    <input
                      onChange={changeSocialMediaLinks}
                      type="text"
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
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
                      Types of Service
                    </label>
                    <input
                      onChange={(e) => setServiceOffered(e.target.value)}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Special Instruction
                    </label>
                    <input
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <label className="block text-sm font-medium text-gray-900">
                    Additional Note
                  </label>
                  <textarea
                    rows={5}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    type="text"
                    className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bloodbankImage"
                    className="block text-sm font-medium  text-gray-900"
                  >
                    BloodBank Image
                  </label>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleImageUpload}
                  />
                  {imagePreview && (
                    <div className="mt-4 d-flex flex-row justify-content-center">
                      <img
                        src={imagePreview}
                        className="rounded-md object-contain"
                        width={300}
                      />
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
                    "Add BloodBank"
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
