import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addRequestBBApi } from "../../../apis/api";
import BloodGroupLists from "../../../components/BloodGroupsList";
import DistrictList from "../../../components/DistrictsList";

export default function ReqForBB() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientBloodType, setPatientBloodType] = useState("");
  const [components, setComponents] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  // const [municipality, setMunicipality] = useState("");
  // const [ward, setWard] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [instruction, setInstruction] = useState("");
  const [anyPrecautions, setPrecautions] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("patientName", patientName);
    formData.append("patientAge", patientAge);
    formData.append("patientBloodType", patientBloodType);
    formData.append("components", components);
    formData.append("phoneNumber", phoneNumber);
    formData.append("hospitalName", hospitalName);
    formData.append("hospitalAddress", hospitalAddress);
    // formData.append("municipality", municipality);
    // formData.append("wardNo", ward);
    formData.append("quantity", quantity);
    formData.append("urgency", urgency);
    formData.append("reason", reason);
    formData.append("date", date);
    formData.append("instruction", instruction);
    formData.append("anyPrecautions", anyPrecautions);
    formData.append("contactPerson", contactPerson);
    // formData.append("latitude", latitude);
    // formData.append("longitude", longitude);
    formData.append("userId", user._id);
    formData.append("bloodbank", id);
    setIsLoading(false);

    addRequestBBApi(formData).then((res) => {
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate(`/single-bloodbank/${id}`);
      }
    });
  };

  return (
    <>
      <div className="mx-auto mt-24 mb-4 p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <form className="space-y-6">
          <h3 className="leading-6 text-gray-900 text-center font-semibold text-2xl">
            Request Blood For BloodBank
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Patient Name
              </label>
              <input
                placeholder="Patient Name"
                type="text"
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Patient Age
              </label>
              <input
                onChange={(e) => setPatientAge(e.target.value)}
                type="number"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <BloodGroupLists
                label={"Select Patient Blood Group"}
                onChange={(e) => setPatientBloodType(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Required Blood Quantity
              </label>
              <input
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                rows="4"
                required
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Hospital/Clinic Name
              </label>
              <input
                onChange={(e) => sethospitalName(e.target.value)}
                type="text"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <DistrictList
                className="w-1/4 !bg-gray-50 border !border-gray-300 !text-gray-900 text-sm rounded-lg !focus:ring-gray-500 focus:!border-gray-500 block p-2.5  dark:!border-gray-600 dark:!placeholder-gray-400 dark:text-white dark:!focus:ring-gray-500 dark:!focus:border-gray-500"
                label={"Hospital/Clinic Address"}
                onChange={(e) => setHospitalAddress(e.target.value)}
              />
            </div>
            {/* <div>
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
                onChange={(e) => setWard(e.target.value)}
                type="number"
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
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Contact Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Contact Person
              </label>
              <input
                onChange={(e) => setContactPerson(e.target.value)}
                type="text"
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Required Date
              </label>
              <input
                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="text"
                placeholder="Date of Request"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Reason
              </label>
              <input
                onChange={(e) => setReason(e.target.value)}
                type="text"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Urgency
              </label>
              <select
                className="w-full mt-1 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                type="text"
                required
              >
                <option value="" disabled selected>
                  Urgency of the request
                </option>
                <option value="Critical">Critical</option>
                <option value="Urgent">Urgent</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Any Specific Components Required
              </label>
              <input
                onChange={(e) => setComponents(e.target.value)}
                type="text"
                className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <label className="block text-sm font-medium text-gray-900">
              Any Precautions
            </label>
            <textarea
              rows={5}
              onChange={(e) => setPrecautions(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
              required
            />
          </div>

          <div className="col-lg-12">
            <label className="block text-sm font-medium text-gray-900">
              Additional Note
            </label>
            <textarea
              rows={5}
              onChange={(e) => setInstruction(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
              required
            />
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
