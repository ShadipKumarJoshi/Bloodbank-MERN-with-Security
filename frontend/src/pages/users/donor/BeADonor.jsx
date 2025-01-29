import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { beADonorApi, getSingleUserApi } from "../../../apis/api";
import "../../../style/BeDonor.css";

const BeADonor = () => {
  const { id } = useParams();

  // const navigate = useNavigate();

  // useState (setting input value)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOb] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [noPreviousDonation, setPrevDonation] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  // use effect to fetch product details
  useEffect(() => {
    //API call
    getSingleUserApi(id).then((res) => {
      setFullName(res.data.user.fullName);
      setEmail(res.data.user.email);
      setNumber(res.data.user.number);
      setCurrentAddress(res.data.user.currentAddress);
    });
  }, [id]);

  // function for changing input value

  const changeGender = (e) => {
    setGender(e.target.value);
  };

  const changeBg = (e) => {
    setBloodGroup(e.target.value);
  };
  const changePrevDonation = (e) => {
    setPrevDonation(e.target.value);
  };

  const changeEmergencyNumber = (e) => {
    setEmergencyNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("bloodGroup", bloodGroup);
    formData.append("noPreviousDonation", noPreviousDonation);
    formData.append("emergencyNumber", emergencyNumber);

    // console.log("Form Data:", Object.fromEntries(formData));
    // making API call
    beADonorApi(id, formData)
      .then((res) => {
        // console.log("API Response:", res.data);
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          window.location.reload();
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="donorBody">
        <div className="donor-container">
          <div className="donor-image">
            <img src="../assets/images/donors.png" alt="image" />
          </div>
          <div className="donor-container-text">
            <form style={{ border: " grey solid 0.2rem", padding: "2rem" }}>
              <h1 className="text-center">Register as Donor</h1>
              <input
                value={fullName}
                type="text"
                disabled
                placeholder={`${fullName}`}
              />
              <input
                value={email}
                type="email"
                disabled
                placeholder={`${email}`}
              />
              <input
                value={number}
                type="text"
                disabled
                placeholder={`${number}`}
              />
              <input
                value={currentAddress}
                type="text"
                disabled
                placeholder={`${currentAddress}`}
              />
              <select
                value={gender}
                onChange={changeGender}
                type="text"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                value={dob}
                onChange={(e) => setDOb(e.target.value)}
                type="text"
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <select
                value={bloodGroup}
                onChange={changeBg}
                type="text"
                required
              >
                <option value="" disabled selected>
                  Select Blood Group
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
              <input
                value={noPreviousDonation}
                onChange={changePrevDonation}
                type="number"
                placeholder="No. of PreviousDonation"
              />
              <input
                value={emergencyNumber}
                onChange={changeEmergencyNumber}
                type="number"
                placeholder="Emergency Number"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                style={{ height: "60px" }}
              >
                Register as a Donor
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeADonor;
