import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { toast } from "react-toastify";
import { getSingleUserApi, updateUser } from "../../../apis/api";
import "../../../style/profile.css";
import UpdatePassword from "./UpdatePaassword";

const Profile = ({ updateFullName }) => {
  const { id } = useParams();

  const users = JSON.parse(localStorage.getItem("user"));

  // useState (setting input value)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOb] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [noPreviousDonation, setPrevDonation] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [reloadPage, setReloadPage] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  // use effect to fetch product details
  useEffect(() => {
    //API call
    getSingleUserApi(id).then((res) => {
      // console.log(res.data);
      // console.log(id);
      setFullName(res.data.user.fullName);
      setEmail(res.data.user.email);
      setNumber(res.data.user.number);
      setGender(res.data.user.gender);
      setCurrentAddress(res.data.user.currentAddress);
      setMunicipality(res.data.user.municipality);
      setWard(res.data.user.wardNo);
      setDOb(res.data.user.dob);
      setBloodGroup(res.data.user.bloodGroup);
      setEmergencyNumber(res.data.user.emergencyNumber);
      setIsAvailable(res.data.user.isAvailable);
      setPrevDonation(res.data.user.noPreviousDonation);
      setUserImageUrl(res.data.user.userImageURL);
      // console.log(res.data.user.bloodGroup)
    });
  }, [id, reloadPage]);

  // functio for image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; //files not file
    setUserImage(file);
    setPreviewImage(URL?.createObjectURL(file));
  };

  const handleSwitchChange = (checked) => {
    setIsAvailable(checked);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", fullName);
    data.append("email", email);
    data.append("number", number);
    data.append("currentAddress", currentAddress);
    data.append("municipality", municipality);
    data.append("wardNo", ward);
    data.append("gender", gender);
    data.append("dob", dob);
    data.append("bloodGroup", bloodGroup);
    data.append("noPreviousDonation", noPreviousDonation);
    data.append("isAvailable", isAvailable);
    data.append("emergencyNumber", emergencyNumber);
    data.append("userImage", userImage);

    // making API call
    updateUser(id, data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setReloadPage((prev) => !prev);
          setPreviewImage(null);
          // Update local storage with the new full name
          const updatedFullName = res.data.updateUser.fullName;

          localStorage.setItem(
            "user",
            JSON.stringify({ ...users, fullName: updatedFullName })
          );

          updateFullName(updatedFullName);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div
        id="profileContainer"
        className="container-xl min-h-[58vh] px-4 mt-4"
      >
        <div className="row">
          <div className="col-xl-3">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header !bg-gray-200 text-center"> Profile Picture</div>
              <div
                className="grid justify-items-center"
              >
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={userImageUrl}
                  alt=""
                />
                <input
                  type="file"
                  className="btn btn-danger mr-5"
                  onChange={handleImageUpload}
                />

                {users.isADonor ? (
                  <div
                    style={{ gap: "1rem", display: "flex", marginTop: "1rem" }}
                  >
                    <label className="font-weight-bold">
                      Available for donation: {isAvailable ? "Yes" : "No"}
                    </label>
                    <ReactSwitch
                      onChange={handleSwitchChange}
                      checked={isAvailable}
                    />
                  </div>
                ) : null}

                {previewImage && (
                  <>
                    <h3>New Image</h3>
                    <img
                      className="img-account-profile rounded-circle mb-2"
                      src={previewImage}
                      alt=""
                    />
                  </>
                )}
              </div>
              <div className="mt-8">
                <h3 className="text-center">Update Password</h3>
                <div className="flex flex-row justify-center">
                  <button
                    onClick={openUpdateModal}
                    className="w-full text-center bg-[#da3131] hover:bg-[#742828] text-white py-3 mt-2 mx-2 no-underline rounded-xl"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  {/* <div className="mb-3">
                    <label className="small mb-1" >Username (how your name will appear to other users on the site)</label>
                    <input className="form-control" type="text" placeholder="Enter your username" value={fullName} />
                  </div> */}
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        Full Name
                      </label>
                      <input
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={fullName}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1">Phone Number</label>
                      <input
                        className="form-control"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Address
                      </label>
                      <input
                        onChange={(e) => setCurrentAddress(e.target.value)}
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        value={currentAddress}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1">Municipality</label>
                      <input
                        className="form-control"
                        type="text"
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Ward No.
                      </label>
                      <input
                        onChange={(e) => setWard(e.target.value)}
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        value={ward}
                      />
                    </div>
                  </div>
                  {users.isADonor ? (
                    <>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputPhone">
                            Emergency Number
                          </label>
                          <input
                            onChange={(e) => setEmergencyNumber(e.target.value)}
                            className="form-control"
                            id="inputPhone"
                            type="tel"
                            placeholder="Enter your Emergency Number"
                            value={emergencyNumber}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputBirthday">
                            Birthday
                          </label>
                          <input
                            type="text"
                            placeholder={dob}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = { dob })}
                            onChange={(e) => setDOb(e.target.value)}
                            className="form-control"
                            id="inputBirthday"
                            name="birthday"
                            value={dob}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Gender
                          </label>
                          <select
                            style={{ height: "auto" }}
                            onChange={(e) => setGender(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                          >
                            <option aria-disabled value={gender}>
                              {gender}
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLocation">
                            Select BloodGroup
                          </label>
                          <select
                            style={{ height: "auto" }}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                          >
                            <option value={bloodGroup}>{bloodGroup}</option>
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
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLocation">
                            No. of Previous Donation 'Approx'
                          </label>
                          <input
                            onChange={(e) => setPrevDonation(e.target.value)}
                            className="form-control"
                            id="inputLocation"
                            type="number"
                            value={noPreviousDonation}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  <button
                    onClick={handleSubmit}
                    className="btn btn-danger"
                    type="button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </form>
                <UpdatePassword
                  isOpen={isUpdateModalOpen}
                  onClose={closeUpdateModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
