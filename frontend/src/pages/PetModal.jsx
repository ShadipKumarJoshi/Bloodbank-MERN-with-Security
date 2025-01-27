import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthCheck from "../components/IsAuthenticated";
import VerifyPage from "./VerifyPage";

const PetModal = ({ isOpen, onClose, pet }) => {
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);

  const verifyAuthBeforeAction = useAuthCheck();

  const openAdoptModal = () => {
    verifyAuthBeforeAction(() => setIsAdoptModalOpen(true));
  };

  const closeAdoptModal = () => {
    setIsAdoptModalOpen(false);
  };

  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-[1102px] rounded-lg shadow-xl border-2 border-black"
        style={{ borderRadius: "25px" }}
      >
        <div className="relative p-2">
          <button
            title="Close Modal"
            onClick={onClose}
            className="absolute"
            style={{
              top: "29px",
              right: "27px",
              fontSize: "1.8rem",
              color: "black",
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex">
          <div className="w-1/2 p-4">
            <img
              src={
                pet.petImageUrlOne ??
                pet.petImageUrlTwo ??
                pet.petImageUrlThree ??
                pet.petImageUrlFour ??
                pet.petImageUrlFive
              }
              alt="Kali"
              className="rounded-lg"
              style={{ width: "480.75px", height: "335px" }}
            />
            <div className="grid grid-cols-3 gap-3 mt-3">
              <img
                src={pet.petImageUrlOne ?? pet.petImageUrlFive}
                alt={"imageOne"}
                className="object-cover rounded"
                style={{
                  width: "135.95px",
                  height: "141.9px",
                  borderRadius: "25px",
                }}
              />
              <img
                src={pet.petImageUrlTwo ?? pet.petImageUrlFive}
                alt={"imageTwo"}
                className="object-cover rounded"
                style={{
                  width: "135.95px",
                  height: "141.9px",
                  borderRadius: "25px",
                }}
              />
              <img
                src={pet.petImageUrlThree ?? pet.petImageUrlFive}
                alt={"imageThree"}
                className="object-cover rounded"
                style={{
                  width: "135.95px",
                  height: "141.9px",
                  borderRadius: "25px",
                }}
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="mb-4 space-y-[17px]">
              <p>
                <strong>Type:</strong> Cat
              </p>
              <p>
                <strong>Name:</strong> {pet.fullName}
              </p>
              {pet.status == "own" && (
                <p>
                  <strong>Gender:</strong> {pet?.gender}
                </p>
              )}
              {pet.petAge && (
                <p>
                  <strong>Age:</strong> {pet.petAge}
                </p>
              )}
              <p>
                <strong>Condition:</strong> {pet.condition}
              </p>
              <p>
                <strong>Uploaded by:</strong> {pet.fullName}
              </p>
              <a
                download={pet.petFileUrl}
                href={pet.petFileUrl}
                className="text-blue-600 visited:text-purple-600"
              >
                {"pdf file"}
              </a>
            </div>
            <div className="space-y-[17px]">
              <p>
                <strong>Purpose:</strong> {pet.purpose}
              </p>
              <p>
                <strong>Address:</strong> {pet.address}
              </p>
              <p>{pet.description}</p>
            </div>
            <div className="flex w-full flex-row pt-5">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  openAdoptModal();
                }}
                className="w-full border-1 border-black text-center text-white font-extrabold py-2 px-4 rounded"
                style={{
                  width: "500px",
                  height: "58px",
                  fontSize: "22px",
                  backgroundColor: "#FF8534",
                  border: "none",
                  transition: "background-color 500ms ease, border 500ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                Adopt
              </Link>
              {isAdoptModalOpen && (
                <VerifyPage
                  isOpen={isAdoptModalOpen}
                  pet={pet}
                  close={closeAdoptModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;