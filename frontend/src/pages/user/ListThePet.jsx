import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Switch } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addpetApi } from "../../apis/Api";
import useAuthCheck from "../../components/IsAuthenticated";

const ListThePet = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [ownership, setOwnership] = useState("found");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [condition, setCondition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [petImageUrlOne, setPetImageUrlOne] = useState(null);
  const [petImageUrlTwo, setPetImageUrlTwo] = useState(null);
  const [petImageUrlThree, setPetImageUrlThree] = useState(null);
  const [petImageUrlFour, setPetImageUrlFour] = useState(null);
  const [petFileUrl, setPetFileUrl] = useState(null);
  const [previewImageOne, setPreviewImageOne] = useState("");
  const [previewImageTwo, setPreviewImageTwo] = useState("");
  const [previewImageThree, setPreviewImageThree] = useState("");
  const [previewImageFour, setPreviewImageFour] = useState("");

  const [isVaccinationEnabled, setIsVaccinationEnabled] = useState(false);
  const [vaccines, setVaccines] = useState([
    {
      name: "",
      dateAdministered: "",
      additionalInfo: "",
    },
  ]);

  const handleVaccinationSwitch = (event) => {
    setIsVaccinationEnabled(event.target.checked);
    if (!event.target.checked) {
      setVaccines([{ name: "", dateAdministered: "", additionalInfo: "" }]); // Reset when switched off
    }
  };

  const handleChange = (index, field, value) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines[index][field] = value;
    setVaccines(updatedVaccines);
  };

  const addVaccineField = () => {
    setVaccines([
      ...vaccines,
      { name: "", dateAdministered: "", additionalInfo: "" },
    ]);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleImageUploadOne = (event) => {
    const file = event.target.files[0];
    setPetImageUrlOne(file);
    setPreviewImageOne(URL?.createObjectURL(file));
  };

  const handleImageUploadTwo = (event) => {
    const file = event.target.files[0];
    setPetImageUrlTwo(file);
    setPreviewImageTwo(URL?.createObjectURL(file));
  };

  const handleImageUploadThree = (event) => {
    const file = event.target.files[0];
    setPetImageUrlThree(file);
    setPreviewImageThree(URL?.createObjectURL(file));
  };

  const handleImageUploadFour = (event) => {
    const file = event.target.files[0];
    setPetImageUrlFour(file);
    setPreviewImageFour(URL?.createObjectURL(file));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPetFileUrl(file);
    }
  };

  const handleFoundSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleOwnSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const verifyAuthBeforeAction = useAuthCheck();

  const confirmSubmit = async () => {
    verifyAuthBeforeAction(() => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("number", phoneNumber);
      formData.append("address", address);
      formData.append("petType", petType);
      formData.append("condition", condition);
      formData.append("purpose", purpose);
      formData.append("description", description);
      formData.append("petImageUrlOne", petImageUrlOne);
      formData.append("petImageUrlTwo", petImageUrlTwo);
      formData.append("petImageUrlThree", petImageUrlThree);
      formData.append("petImageUrlFour", petImageUrlFour);
      formData.append("status", ownership);
      formData.append("user", user?._id);

      if (ownership === "own") {
        formData.append("petAge", petAge);
        formData.append("petGender", petGender);
        formData.append("petFileUrl", petFileUrl);
        vaccines.forEach((vaccine, index) => {
          formData.append(`vaccines[${index}][name]`, vaccine.name);
          formData.append(
            `vaccines[${index}][dateAdministered]`,
            vaccine.dateAdministered
          );
          formData.append(
            `vaccines[${index}][additionalInfo]`,
            vaccine.additionalInfo
          );
        });
      }
      addpetApi(formData)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            onClose();
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
          setShowConfirmation(false);
        });
    });
  };

  const handleOwnershipChange = (status) => {
    setOwnership(status);
    resetForm();
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setPetType("");
    setPetAge("");
    setPetGender("");
    setCondition("");
    setPurpose("");
    setDescription("");
    setPetImageUrlOne(null);
    setPetImageUrlTwo(null);
    setPetImageUrlThree(null);
    setPetImageUrlFour(null);
    setPetFileUrl(null);
    setPreviewImageOne("");
    setPreviewImageTwo("");
    setPreviewImageThree("");
    setPreviewImageFour("");
    setVaccines([{ name: "", dateAdministered: "", additionalInfo: "" }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 backdrop-filter backdrop-blur-sm bg-black bg-opacity-50"></div>
      <div
        className="relative bg-white p-8 rounded"
        style={{
          width: "1102px",
          height: "711px",
          fontFamily: "Poppins",
          border: "2px solid black",
          borderRadius: "25px",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">
            <span style={{ color: "#FF8534" }}>Application</span>
            <span style={{ color: "black" }}> Form</span>
          </h2>

          <button
            title="Close Modal"
            onClick={handleCloseClick}
            className="text-black-500 hover:text-gray-700 rounded-lg text-sm p-2 px-4"
            style={{
              top: "29px",
              right: "27px",
              fontSize: "1.7rem",
              color: "black",
            }}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>
        <div className="flex flex-row justify-end mb-4">
          <div className="flex flex-row border-1 gap-2 rounded-lg p-1 border-gray-700">
            <button
              className={`px-4 py-2 rounded ${
                ownership === "found" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleOwnershipChange("found")}
            >
              I found the pet
            </button>
            <button
              className={`px-4 py-2 rounded ${
                ownership === "own" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleOwnershipChange("own")}
            >
              I own the pet
            </button>
          </div>
        </div>
        <div className="px-2 overflow-y-auto">
          {ownership === "found" ? (
            <form onSubmit={handleFoundSubmit}>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <h1 className="col-span-3 font-bold"> Pet Information </h1>
                <input
                  type="text"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  placeholder="Type"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="Condition"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                  rows={4}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Purpose"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                />
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                />
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2 col-span-3">Other Information</h3>
                <label className="flex flex-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadOne}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadTwo}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadThree}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadFour}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                </label>
                <div className="flex flex-row gap-16">
                  {previewImageOne && (
                    <div className="mt-4 h-20 w-1/4">
                      <img
                        src={previewImageOne}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageTwo && (
                    <div className="mt-4 h-20 w-1/4">
                      <img
                        src={previewImageTwo}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageThree && (
                    <div className="mt-4 w-1/4">
                      <img
                        alt=""
                        src={previewImageThree}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageFour && (
                    <div className="mt-4 w-1/4">
                      <img
                        alt=""
                        src={previewImageFour}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-row justify-left mt-16">
                <button
                  type="submit"
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-500 ease-in-out"
                  style={{
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "all 500ms ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FF7148";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    e.target.style.border = "2px solid black";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#FF8534";
                    e.target.style.boxShadow = "none";
                    e.target.style.border = "none";
                  }}
                >
                  {isLoading ? (
                    <CircularProgress color={"inherit"} size={20} />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOwnSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <h3 className="font-bold col-span-3">Pet Information</h3>
                <input
                  type="text"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  placeholder="Type"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="number"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="Age"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="text"
                  value={petGender}
                  onChange={(e) => setPetGender(e.target.value)}
                  placeholder="Gender"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="Condition"
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
                <textarea
                  placeholder="Purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={3}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950 col-span-3"
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                ></textarea>
                <textarea
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950 col-span-3"
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                ></textarea>
              </div>
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">Vaccination</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Switch
                    checked={isVaccinationEnabled}
                    onChange={handleVaccinationSwitch}
                    color="success"
                  />
                </div>
                {isVaccinationEnabled && (
                  <div className="space-y-3">
                    {vaccines.map((vaccine, index) => (
                      <div key={index} className="grid grid-cols-3 space-x-2">
                        <input
                          type="text"
                          value={vaccine.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          placeholder="Enter vaccine name"
                          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="date"
                          value={vaccine.dateAdministered}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "dateAdministered",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="text"
                          value={vaccine.additionalInfo}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "additionalInfo",
                              e.target.value
                            )
                          }
                          placeholder="Additional info"
                          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                    <Link
                      onClick={addVaccineField}
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF8534] hover:bg-[#F24E1E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Vaccine
                    </Link>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2 col-span-3">Other Information</h3>
                <label className="flex flex-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadOne}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadTwo}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadThree}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadFour}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                </label>
                <div className="flex flex-row gap-16">
                  {previewImageOne && (
                    <div className="mt-4 w-1/4">
                      <img
                        src={previewImageOne}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageTwo && (
                    <div className="mt-4 w-1/4">
                      <img
                        src={previewImageTwo}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageThree && (
                    <div className="mt-4 w-1/4">
                      <img
                        alt=""
                        src={previewImageThree}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {previewImageFour && (
                    <div className="mt-4 w-1/4">
                      <img
                        alt=""
                        src={previewImageFour}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              <label className="block mb-2">
                <span className="sr-only">Choose Photo:</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
                />
              </label>
              <div className="w-full flex flex-row justify-left mt-16">
                <button
                  type="submit"
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-500 ease-in-out"
                  style={{
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "all 500ms ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FF7148";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    e.target.style.border = "2px solid black";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#FF8534";
                    e.target.style.boxShadow = "none";
                    e.target.style.border = "none";
                  }}
                >
                  {isLoading ? (
                    <CircularProgress color={"inherit"} size={20} />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg p-8 z-10"
            style={{
              width: "400px",
              fontFamily: "Poppins",
              border: "2px solid black",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirmation</h2>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-black"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <p>Are you sure you want to list the pet?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={confirmSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListThePet;