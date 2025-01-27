import {
  faEdit,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyAdoptionReqApi } from "../../apis/Api";

const MyPetRequests = () => {
  const { id } = useParams();
  const [userRequests, setUserRequests] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [requestII, setRequestII] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [status, setStatus] = useState(false);

  const handleChange = async (checked, requestId) => {
    try {
      setShowRequest(checked);
      // updateShowRequestApi({
      //   id: requestId,
      //   showRequest: checked,
      // });
      // setAdoptions((prevRequests) =>
      //   prevRequests.map((request) =>
      //     request._id === requestId
      //       ? { ...request, showRequest: checked }
      //       : request
      //   )
      // );
      toast.success("Request updated successfully");
    } catch (error) {
      console.error("Error updating Request:", error);
    }
  };

  // delete
  const handleDelete = (id) => {
   
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getMyAdoptionReqApi(id);
        setAdoptions(response?.data?.adoptions);
      } catch (error) {
        console.error("Error fetching adoptions:", error);
      }
    };
    fetchRequests();
  }, [id]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        // const response = await getReqOfUserApi(id);
        // setUserRequests(response?.data?.userReq);
      } catch (error) {
        console.error("Error fetching adoptions:", error);
      }
    };

    fetchUserRequests();
  }, [id]);

  return (
    <div className="container !mt-24 min-h-[60vh]">
      <h2 className="text-center text-lg font-bold mb-4 mt-16" style={{ marginTop: "6rem" }}>
        My Pet Requests
      </h2>
      {adoptions ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">User Image</th>
                <th scope="col">Pet Image</th>
                <th scope="col">User Fullname</th>
                <th scope="col">Pet Name</th>
                <th scope="col">Pet Type</th>
                <th scope="col">Have a Pet?</th>
                <th scope="col">House or Apartment</th>
                <th scope="col">Owner or Renter</th>
                <th scope="col">Permission to Keep ?</th>
                <th scope="col">No. of People in House</th>
                <th scope="col">Pet Alone Time</th>
                <th scope="col">Travel Frequency</th>
                <th scope="col">Pet Care Arrangement</th>
                <th scope="col">Reason for Adoption</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {adoptions?.map((data) => (
                <tr key={data?._id}>
                  <td>
                    <img
                      className="h-10 w-30"
                      src={data?.pet?.petImageUrlOne}
                      alt="ImageUrl"
                    />
                  </td>
                  <td>
                    <img
                      className="h-10 w-30"
                      src={data?.user?.userImageUrl}
                      alt="ImageUrl"
                    />
                  </td>
                  <td>{data?.pet?.fullName}</td>
                  <td>{data?.pet?.petType}</td>
                  <td>{data?.haveAPet}</td>
                  <td>{data?.houseApartment}</td>
                  <td>{data?.ownRent}</td>
                  <td>{data?.permissionPet ? "Yes" : "No"}</td>
                  <td>{data?.peopleInHouse}</td>
                  <td>{data?.hoursPetAlone}</td>
                  <td>{data?.petCareArrangement}</td>
                  <td>{data?.travelFrequency}</td>
                  <td>{data?.petCareArrangement}</td>
                  <td>{data?.reasonForAdoption}</td>
                  <td>{data?.isAccepted ? <>Accepted</> : <>Pending</>}</td>
                  {/* <td>
                    <ReactSwitch
                      checked={data?.showRequest}
                      onChange={(checked) => handleChange(checked, data?._id)}
                    />
                  </td> */}
                  {
                    <td className="px-7 2xl:px-0">
                      <div className="flex flex-row justify-between m-2">
                        {/* Edit Button */}
                        {/* <Link
                          className="focus:outline-none "
                          to={`/edit-data/${data?._id}`}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          />
                        </Link> */}

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            opendeleteModal();
                            setRequestII(data._id);
                          }}
                          className="focus:outline-none ml-2 "
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 hover:text-red-700 cursor-pointer "
                          />
                        </button>
                      </div>
                    </td>
                  }
                  {isdeleteModalOpen && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                      id="my-modal"
                    >
                      <div className="relative mx-auto p-5 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                        <h6 className="font-medium w-3/4 mx-auto text-center">
                          <FontAwesomeIcon
                            className="me-4"
                            icon={faExclamationTriangle}
                          />
                          Are you sure about that logout?
                        </h6>
                        <div className="relative flex flex-wrap items-center z-50 justify-between mx-auto w-full">
                          <button
                            onClick={() => handleDelete(requestII)}
                            className="w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5"
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                            onClick={closedeleteModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-[16rem] p-20 text-center">
          No Requests Found ... 🥲🥲
        </div>
      )}
    </div>
  );
};

export default MyPetRequests;
