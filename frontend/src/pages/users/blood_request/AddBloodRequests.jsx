import React, { useState } from "react";
import { toast } from "react-toastify";
import { addRequestAPI } from "../../../apis/api";
import DistrictList from "../../../components/DistrictsList";
import "../../../style/AddBloodRequests.css";

const AddBloodRequests = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientBloodType, setPatientBloodType] = useState("");
  const [components, setComponents] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

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

    addRequestAPI(formData).then((res) => {
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        setContactPerson("");
        setPrecautions("");
        setInstruction("");
        setDate("");
        setReason("");
        setUrgency("");
        setQuantity("");
        setComponents("");
        setHospitalAddress("");
        setWardNo("");
        setMunicipality("");
        sethospitalName("");
        setPhoneNumber("");
        setPatientBloodType("");
        setPatientAge("");
        setPatientName("");
        setLongitude("");
        setLatitude("");
      }
    });
  };

  return (
    <>
      <div className="reqBody">
        <div className="addbloodrequestcontainer">
          <div className="text">Add Blood Request</div>
          <form action="#">
            <div className="form-row">
              <div className="input-data">
                <input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient Name"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="Patient Age"
                  type="number"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <select
                  value={patientBloodType}
                  onChange={(e) => setPatientBloodType(e.target.value)}
                  placeholder="Patient Blood Type"
                  type="text"
                  required
                >
                  <option value="" disabled selected>
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
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row">
              <div className="input-data">
                <input
                  value={hospitalName}
                  onChange={(e) => sethospitalName(e.target.value)}
                  placeholder="Hospital/Clinic Name"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <DistrictList
                  label={" "}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  type="number"
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity of Blood Units Required"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <select
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
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
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
              <div className="input-data">
                <input
                  value={components}
                  onChange={(e) => setComponents(e.target.value)}
                  placeholder="Any Specific Components Needed ?"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Emergency of a person to contact"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for Blood Request"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  placeholder="Select Municipality"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
                  placeholder="Ward Number"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude (for faster avaibility)"
                  type="number"
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="input-data">
                <input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude (for faster avaibility)"
                  type="number"
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  value={anyPrecautions}
                  onChange={(e) => setPrecautions(e.target.value)}
                  placeholder="Any special precations to be taken"
                  type="text"
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Any special instructions or requirements"
                  rows="8"
                  cols="80"
                  required
                />
                <br />
                <div className="underline"></div>
                <br />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="sm-btn w-50" onClick={handleSubmit}>
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBloodRequests