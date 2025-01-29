import {
  faEdit,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { toast } from "react-toastify";
import {
  deleteRequestApi,
  getMyRequestApi,
  getReqOfUserApi,
  updateShowRequestApi,
  updateStatusApi
} from "../../../apis/api";

const History = () => {
  const { id } = useParams();
  const [userRequests, setUserRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [requestII, setRequestII] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [status, setStatus] = useState(false);

  const handleChange = async (checked, requestId) => {
    try {
      setShowRequest(checked);
      updateShowRequestApi({
        id: requestId,
        showRequest: checked,
      });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, showRequest: checked }
            : request
        )
      );
      toast.success("Request updated successfully");
    } catch (error) {
      console.error("Error updating Request:", error);
    }
  };

  // delete
  const handleDelete = (id) => {
    // make Api call
    deleteRequestApi(id)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          closedeleteModal(true);
          setRequests(requests.filter((item) => item._id !== id));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getMyRequestApi(id);
        setRequests(response?.data?.userRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [id]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await getReqOfUserApi(id);
        setUserRequests(response?.data?.userReq);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchUserRequests();
  }, [id]);

  return (
    <div className="container mt-5 h-auto">
      <h2 className="text-center mb-4" style={{ marginTop: "6rem" }}>
        My Requests History
      </h2>
      {requests ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Patient Name</th>
                <th scope="col">Patient Age</th>
                <th scope="col">Patient Blood Type</th>
                <th scope="col">Components</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Hospital Name</th>
                <th scope="col">Hospital Address</th>
                <th scope="col">Quantity</th>
                <th scope="col">Urgency</th>
                <th scope="col">Reason</th>
                <th scope="col">Date</th>
                <th scope="col">Instruction</th>
                <th scope="col">Any Precautions</th>
                <th scope="col">Contact Person</th>
                <th scope="col">Show/Hide Request</th>
                <th scope="col"> Action </th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request) => (
                <tr key={request?._id}>
                  <td>{request?.patientName}</td>
                  <td>{request?.patientAge}</td>
                  <td>{request?.patientBloodType}</td>
                  <td>{request?.components}</td>
                  <td>{request?.phoneNumber}</td>
                  <td>{request?.hospitalName}</td>
                  <td>{request?.hospitalAddress}</td>
                  <td>{request?.quantity}</td>
                  <td>{request?.urgency}</td>
                  <td>{request?.reason}</td>
                  <td>{request?.date}</td>
                  <td>{request?.instruction}</td>
                  <td>{request?.anyPrecautions}</td>
                  <td>{request?.contactPerson}</td>
                  <td>
                    <ReactSwitch
                      checked={request?.showRequest}
                      onChange={(checked) =>
                        handleChange(checked, request?._id)
                      }
                    />
                  </td>
                  {
                    <td className="px-7 2xl:px-0">
                      {/* Edit Button */}
                      <Link
                        className="focus:outline-none py-2 px-4"
                        to={`/edit-request/${request?._id}`}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          opendeleteModal();
                          setRequestII(request._id);
                        }}
                        className="focus:outline-none ml-2 "
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 hover:text-red-700 cursor-pointer "
                        />
                      </button>
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
                          Are you sure about that 👁️👁️?
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
      <h2 className="text-center mb-4" style={{ marginTop: "6rem" }}>
        My Requests for BloodBank
      </h2>
      {userRequests ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Patient Name</th>
                <th scope="col">Patient Age</th>
                <th scope="col">Patient Blood Type</th>
                <th scope="col">Components</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Hospital Name</th>
                <th scope="col">Hospital Address</th>
                <th scope="col">Quantity</th>
                <th scope="col">Urgency</th>
                <th scope="col">Reason</th>
                <th scope="col">Date</th>
                <th scope="col">Instruction</th>
                <th scope="col">Any Precautions</th>
                <th scope="col">Contact Person</th>
                <th scope="col">BloodBank Name</th>
                <th scope="col">BloodBank Name</th>
              </tr>
            </thead>
            <tbody>
              {userRequests?.map((request) => (
                <tr key={request?._id}>
                  <td>{request?.patientName}</td>
                  <td>{request?.patientAge}</td>
                  <td>{request?.patientBloodType}</td>
                  <td>{request?.components}</td>
                  <td>{request?.phoneNumber}</td>
                  <td>{request?.hospitalName}</td>
                  <td>{request?.hospitalAddress}</td>
                  <td>{request?.quantity}</td>
                  <td>{request?.urgency}</td>
                  <td>{request?.reason}</td>
                  <td>{request?.date}</td>
                  <td>{request?.instruction}</td>
                  <td>{request?.anyPrecautions}</td>
                  <td>{request?.contactPerson}</td>
                  <td>{request?.bloodbank?.bbName}</td>
                  {
                    request?.isAccepted ? (
                      <td className="!text-lime-500"> Accepted</td>
                    ):(
                      <td className="!text-red-600">Not Accepted Yet</td>
                    )
                  }
                  {/* {
                    <td className="px-7 2xl:px-0">
                      <Link
                        className="focus:outline-none py-2 px-4"
                        to={`/edit-request/${request?._id}`}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        />
                      </Link>

                      <button
                        onClick={() => {
                          opendeleteModal();
                          setRequestII(request._id);
                        }}
                        className="focus:outline-none ml-2 "
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 hover:text-red-700 cursor-pointer "
                        />
                      </button>
                    </td>
                  } */}
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
                          Are you sure about that 👁️👁️?
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

export default History;
