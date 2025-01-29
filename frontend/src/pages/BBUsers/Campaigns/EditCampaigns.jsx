import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleCampaignApi, updateCampaignApi } from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";

const EditCampaigns = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [campaignName, setCampaignsName] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndDate, setCampaignsEndDate] = useState("");
  const [campaignLocation, setCampaignsLocation] = useState("");
  const [campaignGoal, setCampaignsGoal] = useState("");
  const [campaignImage, setCampaignsImage] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState("desc");
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL
  const [oldimagePreview, setOldImagePreview] = useState(null); // State to hold the image preview URL

  useEffect(() => {
    getSingleCampaignApi(id).then((res) => {
      setCampaignsName(res.data.campaign.campaignName);
      setCampaignStartDate(res.data.campaign.campaignStartDate);
      setCampaignsEndDate(res.data.campaign.campaignEndDate);
      setCampaignsLocation(res.data.campaign.campaignLocation);
      setCampaignsGoal(res.data.campaign.campaignGoal);
      setOldImagePreview(res.data.campaign.campaignImage);
      setLatitude(res.data.campaign.latitude);
      setLongitude(res.data.campaign.longitude);
      console.log(res.data.campaign.campaignEndDate);
    });
  }, [id]);

  const updateHopital = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("campaignStartDate", campaignStartDate);
    formData.append("campaignEndDate", campaignEndDate);
    formData.append("campaignLocation", campaignLocation);
    formData.append("campaignGoal", campaignGoal);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("campaignImage", campaignImage);

    updateCampaignApi(id, formData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/bb/dashboard");
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
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setCampaignsImage(selectedImage);
    if (selectedImage) {
      setImagePreview(URL?.createObjectURL(selectedImage));
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-0 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <Link
            to={"/bb/dashboard"}
            className="text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </div>
        <form className="space-y-1 m-0">
          <h3 className="mb-4 leading-6 text-gray-900 text-center font-semibold text-2xl">
            Edit Campaigns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Campaign Name
              </label>
              <input
                value={campaignName}
                onChange={(e) => setCampaignsName(e.target.value)}
                type="text"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <DistrictList
                dynamicValue={campaignLocation}
                onChange={(e) => setCampaignsLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Campaign Start Date
              </label>
              <input
                className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
                value={campaignStartDate}
                onChange={(e) => setCampaignStartDate(e.target.value)}
                type="text"
                placeholder="Date of Request"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Campaign End Date
              </label>
              <input
                className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
                value={campaignEndDate}
                onChange={(e) => setCampaignsEndDate(e.target.value)}
                type="text"
                placeholder="Date of Request"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Campaign Goal
              </label>
              <input
                value={campaignGoal}
                onChange={(e) => setCampaignsGoal(e.target.value)}
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
                value={latitude}
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
                value={longitude}
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
                Hospital Description
              </label>
              <textarea
                value={campaignEndDate}
                onChange={(e) => setCampaignsEndDate(e.target.value)}
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium  text-gray-900">
              Campaign mage
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
              required
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
            onClick={updateHopital}
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Update Campaign"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCampaigns;
