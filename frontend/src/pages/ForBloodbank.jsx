import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBloodBankApi } from "../apis/api";
import DistrictList from "../components/DistrictsList";
import MultiSelectBG from "../components/MultiSeletctBG";

export default function ForBloodbank() {
  // useEffect for fetching all the products and showing in table
  const navigate = useNavigate();

  const [bbName, setbbName] = useState("");
  const [bbAddress, setbbAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [bbContact, setbbContact] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [serviceOffered, setServiceOffered] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [availableBloodGroups, setAvailableBloodGroups] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bbImage, setBloodBankImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    formData.append("municipality", municipality);
    formData.append("wardNo", wardNo);
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
    formData.append("contactEmail", contactEmail);

    createBloodBankApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/login");
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

  const [imagePreview, setImagePreview] = useState(null);

  return (
    <>
      <div className="mx-auto mt-24 mb-4 p-5 border w-1/2 shadow-lg rounded-md bg-white">
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
                Municipality
              </label>
              <input
                onChange={(e) => setMunicipality(e.target.value)}
                type="text"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
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
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
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
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
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
                  const floatValue = inputValue ? parseFloat(inputValue) : null;
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
          <div className="col-lg-12">
            <label className="block text-sm font-medium text-gray-900">
              Contact Email
            </label>
            <input
              onChange={(e) => setContactEmail(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
              required
            />
            <div className="text-red-500 text-sm mt-1">
              Please enter a valid email address the password and email of your
              account is sent here ...
            </div>
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
            className="w-full text-white bg-black hover:bg-red focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Add Request For BloodBank"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
