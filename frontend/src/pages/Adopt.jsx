import {
  faAngleLeft,
  faAngleRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPetsApi } from "../apis/Api";
import PetModal from "./PetModal";
import ListThePet from "./user/ListThePet";

const PetCard = ({ pet, openPetModal }) => (
  <Link
    className="border rounded-lg overflow-hidden shadow-lg bg-gray-50"
    onClick={(e) => {
      e.preventDefault();
      openPetModal(pet);
    }}
  >
    <img
      src={
        pet.petImageUrlOne ??
        pet.petImageUrlTwo ??
        pet.petImageUrlThree ??
        pet.petImageUrlFour ??
        pet.petImageUrlFive
      }
      alt={`${pet.address}`}
      className="w-[400px] h-[207px] object-cover rounded-[25px]"
    />
    <div className="px-4 py-3">
      <span className="flex flex-row items-center">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-gray-950 text-2xl"
        />
        <p className="ml-2 font-regular text-[15px]">{pet.address}</p>
      </span>
      <span className="flex flex-row flex-start">
        <p className="font-bold text-[16px]">{pet.petType ?? pet.email}</p>
      </span>
    </div>
  </Link>
);

const Adopt = () => {
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [petTypes, setPetTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [genders, setGenders] = useState([]);
  const [ages, setAges] = useState([]);

  const openPetModal = (pet) => {
    setSelectedPet(pet);
    setIsPetModalOpen(true);
  };

  const closePetModal = () => {
    setIsPetModalOpen(false);
  };

  const openListModal = () => {
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
  };

  const fetchAllPets = async () => {
    setIsLoading(true);
    getAllPetsApi().then((response) => {
      const allPets = response.data.allPets;
      setPets(allPets);

      const types = [...new Set(allPets.map((pet) => pet.petType))];
      const addresses = [...new Set(allPets.map((pet) => pet.address))];
      const genderss = [...new Set(allPets.map((pet) => pet?.petGender ?? "null"))];
      const ages = [...new Set(allPets.map((pet) => pet?.petAge ?? "null"))];
      setPetTypes(types);
      setLocations(addresses);
      setGenders(genderss);
      setAges(ages);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const filteredPets = pets.filter((pet) => {
    return (
      (search === "" ||
        pet.address.toLowerCase().includes(search.toLowerCase())) &&
      (locationFilter === "" ||
        pet.address.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (typeFilter === "" ||
        pet.petType.toLowerCase().includes(typeFilter.toLowerCase())) &&
      (ageFilter === "" || pet.petAge === ageFilter) &&
      (genderFilter === "" ||
        (pet.petGender && pet.petGender.toLowerCase() === genderFilter.toLowerCase()))
    );
  });

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <CircularProgress size={40} color="warning" />
        </div>
      ) : (
        <>
          <div
            className="bg-gray-50 min-h-screen p-5"
            style={{ marginTop: "100px" }}
          >
            <div className="container mx-auto px-4 bg-gray-50">
              <h1 className="text-[46px] font-semibold text-center mb-1">
                Every Pet Deserves a Loving Home. <br />{" "}
                <span className="text-orange-500">Adopt</span> a Pet Today!
              </h1>
              <p className="text-center mt-4 text-[16px] mb-4">
                Together, we can{" "}
                <span className="font-bold">
                  rescue, rehabilitate, and rehome
                </span>{" "}
                pets in need. Thank you for supporting our mission to bring joy
                to families.
              </p>
              <div className="flex justify-end gap-4">
              
                <button
                  onClick={openListModal}
                  className="bg-[#FF8534] text-white font-bold py-2 px-4 rounded w-[222px] h-[58px] text-[22px]"
                  style={{
                    backgroundColor: "#FF8534",
                    color: "#FFFFFF",
                    fontSize: "22px",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    border: "none",
                    transition:
                      "background-color 500ms ease, border 500ms ease",
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
                  List the Pet
                </button>
                <ListThePet isOpen={isListModalOpen} onClose={closeListModal} />
              </div>
              <div className="flex my-8 w-full justify-between items-center">
                <div className="flex-1 w-2/5 mr-2">
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border rounded bg-gray-50"
                  />
                </div>
                <div className="flex w-3/5">
                  <select
                    className="border rounded w-1/4 py-2 px-4 mr-2 bg-gray-50"
                    value={locationFilter}
                    onChange={(e) => handleFilterChange(e, setLocationFilter)}
                  >
                    <option value="">Location</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded w-1/4 py-2 px-4 mr-2 bg-gray-50"
                    value={typeFilter}
                    onChange={(e) => handleFilterChange(e, setTypeFilter)}
                  >
                    <option value="">Type</option>
                    {petTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded w-1/4 py-2 px-4 mr-2 bg-gray-50"
                    value={ageFilter}
                    onChange={(e) => handleFilterChange(e, setAgeFilter)}
                  >
                    <option value="">Age</option>
                    {ages.map((age, index) => (
                      <option key={index} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded w-1/4 py-2 px-4 mr-2 bg-gray-50"
                    value={genderFilter}
                    onChange={(e) => handleFilterChange(e, setGenderFilter)}
                  >
                    <option value="">Gender</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  openPetModal={() => openPetModal(pet)}
                />
              ))}
            </div>
            <PetModal
              isOpen={isPetModalOpen}
              onClose={closePetModal}
              pet={selectedPet}
            />
            <div className="flex justify-center mt-8 bg-gray-50">
              <div className="flex rounded-md border-2 border-black">
                <a
                  href="#"
                  className="py-2 px-4 leading-tight text-gray-500 bg-gray-50 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </a>
                <a
                  href="#"
                  className="py-2 px-4 leading-tight text-white bg-[#004AAD] border-r-2 border-l-2 border-black hover:text-gray-700"
                >
                  1
                </a>
                <a
                  href="#"
                  className="py-2 px-4 leading-tight text-gray-500 bg-gray-50 rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Adopt;