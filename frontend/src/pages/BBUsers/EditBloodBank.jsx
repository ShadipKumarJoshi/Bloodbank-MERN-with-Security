import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchSingleBloodBankApi, updateBloodBankApi } from "../../apis/api";
import BloodGroupLists from "../../components/BloodGroupsList";
import DistrictList from "../../components/DistrictsList";

const EditBloodBank = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [bbName, setbbName] = useState("");
  const [bbAddress, setbbAddress] = useState("");
  const [bbContact, setbbContact] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [serviceOffered, setServiceOffered] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [availableBloodGroups, setAvailableBloodGroups] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [oldimagePreview, setOldImagePreview] = useState(null);
  const [bbImage, setBloodBankImage] = useState(null);
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
  const changeAvailableBloodGroups = (e) => {
    setAvailableBloodGroups(e.target.value);
  };

  const changeSocialMediaLinks = (e) => {
    setSocialMediaLinks(e.target.value);
  };

  useEffect(() => {
    fetchSingleBloodBankApi(id).then((res) => {
      setbbName(res.data.bloodbank.bbName);
      setbbAddress(res.data.bloodbank.bbAddress);
      setbbContact(res.data.bloodbank.bbContact);
      setOperatingHours(res.data.bloodbank.operatingHours);
      setAvailableBloodGroups(res.data.bloodbank.availableBloodGroups);
      setServiceOffered(res.data.bloodbank.serviceOffered);
      setSpecialInstructions(res.data.bloodbank.specialInstructions);
      setAdditionalNotes(res.data.bloodbank.additionalNotes);
      setSocialMediaLinks(res.data.bloodbank.socialMediaLinks);
      setLatitude(res.data.bloodbank.latitude);
      setLongitude(res.data.bloodbank.longitude);
      setOldImagePreview(res.data.bloodbank.bbImageUrl);
    });
  }, [id]);

  const updateBloodBank = (e) => {
    e.preventDefault();
    setIsLoading(true);
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

    updateBloodBankApi(id, formData)
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; //files not file
    setBloodBankImage(file);
    setImagePreview(URL?.createObjectURL(file));
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
            Edit BloodBanks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                BloodBank Name
              </label>
              <input
                value={bbName}
                onChange={changebbName}
                type="text"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <DistrictList
                dynamicValue={bbAddress}
                onChange={changebbAddress}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                BLood Bank Contact
              </label>
              <input
                value={bbContact}
                onChange={changebbContact}
                type="number"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <BloodGroupLists
                dynamicValue={availableBloodGroups}
                onChange={changeAvailableBloodGroups}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                BloodBank Operating Hours
              </label>
              <input
                value={operatingHours}
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
                value={socialMediaLinks}
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
                Types of Service
              </label>
              <input
                value={serviceOffered}
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
                value={specialInstructions}
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
              value={additionalNotes}
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
            onClick={updateBloodBank}
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Update BloodBanks"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBloodBank;
