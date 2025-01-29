import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleRequestApi, updateRequestApi } from "../../../apis/api";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

const EditBloodRequests = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientBloodType, setPatientBloodType] = useState("");
  const [components, setComponents] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [instruction, setInstruction] = useState("");
  const [anyPrecautions, setPrecautions] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    getSingleRequestApi(id).then((res) => {
      setPatientName(res.data.requestblood.patientName);
      setPatientAge(res.data.requestblood.patientAge);
      setPatientBloodType(res.data.requestblood.patientBloodType);
      setComponents(res.data.requestblood.components);
      setPhoneNumber(res.data.requestblood.phoneNumber);
      sethospitalName(res.data.requestblood.hospitalName);
      setHospitalAddress(res.data.requestblood.hospitalAddress);
      setMunicipality(res.data.requestblood.municipality);
      setWardNo(res.data.requestblood.wardNo);
      setQuantity(res.data.requestblood.quantity);
      setUrgency(res.data.requestblood.urgency);
      setReason(res.data.requestblood.reason);
      setDate(res.data.requestblood.date);
      setInstruction(res.data.requestblood.instruction);
      setPrecautions(res.data.requestblood.anyPrecautions);
      setContactPerson(res.data.requestblood.contactPerson);
      setLatitude(res.data.requestblood.latitude);
      setLongitude(res.data.requestblood.longitude);
    });
  }, [id]);

  const updateRequest = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("patientName", patientName);
    formData.append("patientAge", patientAge);
    formData.append("patientBloodType", patientBloodType);
    formData.append("components", components);
    formData.append("phoneNumber", phoneNumber);
    formData.append("hospitalName", hospitalName);
    formData.append("hospitalAddress", hospitalAddress);
    formData.append("municipality", municipality);
    formData.append("wardNo", wardNo);
    formData.append("quantity", quantity);
    formData.append("urgency", urgency);
    formData.append("reason", reason);
    formData.append("date", date);
    formData.append("instruction", instruction);
    formData.append("anyPrecautions", anyPrecautions);
    formData.append("contactPerson", contactPerson);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("userId", user._id);

    updateRequestApi(id, formData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate(`/profile/${user._id}`)
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

  return (
    <div className="mt-28 mb-4 overflow-y-auto mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
      <h3 className="mb-4 leading-6 text-gray-900 text-center font-semibold text-2xl">
        Edit My Requests
      </h3>
      <form className="space-y-1 m-0">
        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient Name"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="Patient Age"
              type="number"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="bloodType" hidden>Patient Blood Type</label>
            <select
              id="bloodType"
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={patientBloodType}
              onChange={(e) => setPatientBloodType(e.target.value)}
              required
            >
              <option value="" disabled>
                Patient Blood Type
              </option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O+">O+</option>
              <option value="A-">A-</option>
              <option value="AB-">AB-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={hospitalName}
              onChange={(e) => sethospitalName(e.target.value)}
              placeholder="Hospital/Clinic Name"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              placeholder="Hospital/Clinic Address"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              placeholder="Municipality"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={wardNo}
              onChange={(e) => setWardNo(e.target.value)}
              placeholder="Ward No."
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              type="number"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity of Blood Units Required"
              type="text"
              required
            />
          </div>
          <div className="form-row mb-4 w-full">
            <select
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              type="text"
              required
            >
              <option value="" disabled>
                Urgency of the request
              </option>
              <option value="Critical">Critical</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="text"
              placeholder="Date of Request"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={components}
              onChange={(e) => setComponents(e.target.value)}
              placeholder="Any Specific Components Needed ?"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Emergency of a person to contact"
              type="text"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for Blood Request"
              type="text"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude (for faster avaibility)"
              type="number"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Longitude (for faster avaibility)"
              type="number"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="mb-4 w-full">
            <input
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={anyPrecautions}
              onChange={(e) => setPrecautions(e.target.value)}
              placeholder="Any special precations to be taken"
              type="number"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="mb-4 w-full">
            <textarea
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Any special instructions or requirements"
              rows="8"
              cols="80"
              required
            />
            <br />
          </div>
          <select
              className="w-full rounded-md border-gray-600 active:border-gray-600 hover:border-gray-600 focus:border-gray-600"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              type="text"
              required
            >
              <option value="" disabled>
                Urgency of the request
              </option>
              <option value="Critical">Critical</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={updateRequest}
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-cyan-700 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <CustomCircularProgress size={20} color="inherit" />
            ) : (
              "Update Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBloodRequests;
