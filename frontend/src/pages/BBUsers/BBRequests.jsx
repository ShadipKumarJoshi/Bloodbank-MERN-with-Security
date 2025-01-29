import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateStatusApi, viewRequestBBApi } from "../../apis/api";
import CustomCircularProgress from "../../components/CustomCircularProgress";

const BBRequests = () => {
  const [bloodRequests, setBloodRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({
    hospitalName: "",
    hospitalAddress: "",
    bloodGroup: "",
    urgency: "",
    municipality: "",
  });

  useEffect(() => {
    try {
      viewRequestBBApi().then((res) => {
        setIsLoading(true);
        // console.log(res.data);
        setBloodRequest(res.data.requestList);
        // console.log(res.data.requestList);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = bloodRequests.filter((request) => {
      return (
        (filters.hospitalName === "" ||
          request.hospitalName
            .toLowerCase()
            .includes(filters.hospitalName.toLowerCase())) &&
        (filters.hospitalAddress === "" ||
          request.hospitalAddress
            .toLowerCase()
            .includes(filters.hospitalAddress.toLowerCase())) &&
        (filters.bloodGroup === "" ||
          request.patientBloodType
            .toLowerCase()
            .includes(filters.bloodGroup.toLowerCase())) &&
        (filters.municipality === "" ||
          request.municipality
            .toLowerCase()
            .includes(filters.municipality.toLowerCase()))
      );
    });
    setFilteredRequests(filtered);
  }, [filters, bloodRequests]);

  const handleStatus = async (e, requestId) => {
    e.preventDefault();
    try {
      setStatus(true);
      updateStatusApi({
        id: requestId,
        isAccepted: true,
      });
      toast.success("Request updated successfully");
    } catch (error) {
      console.error("Error updating Request:", error);
    }
  };

  return (
    <div>
      {isLoading && <CustomCircularProgress />}
      {error && <h1>Error Fetching Data</h1>}
      {!isLoading && !error && (
        <div className="container">
          <h1 className="text-center">Blood Requests</h1>
          <div className="flex w-100 my-4 gap-2">
            <input
              className="w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="hospitalName"
              placeholder="Filter by Hospital Name"
              value={filters.hospitalName}
              onChange={handleFilterChange}
            />
            <input
              className="w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="hospitalAddress"
              placeholder="Filter by Hospital District"
              value={filters.hospitalAddress}
              onChange={handleFilterChange}
            />
            <input
              className="w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              type="text"
              name="municipality"
              placeholder="Filter by Municipality"
              value={filters.municipality}
              onChange={handleFilterChange}
            />
            <select
              className="w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              name="bloodGroup"
              value={filters.bloodGroup}
              onChange={handleFilterChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <select
              className="w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
            >
              <option value="">Select Urgency</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
              <option value="normal">Normal</option>
            </select>
          </div>
          <div className="overflow-y-auto">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Patient Blood Type</th>
                  <th>Phone Number</th>
                  <th>Hospital Name</th>
                  <th>Hospital Address</th>
                  <th>Municipality</th>
                  <th>Quantity</th>
                  <th>Urgency</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>Contact Person</th>
                  <th>Requested By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests?.map((requests, index) => (
                  <tr key={index}>
                    <td>{requests.patientName}</td>
                    <td>{requests?.patientBloodType}</td>
                    <td>{requests?.phoneNumber}</td>
                    <td>{requests?.hospitalName}</td>
                    <td>{requests?.hospitalAddress}</td>
                    <td>{requests?.municipality}</td>
                    <td>{requests?.quantity}</td>
                    <td>{requests?.urgency}</td>
                    <td>{requests?.reason}</td>
                    <td>{requests?.date}</td>
                    <td>{requests?.contactPerson}</td>
                    <td>{requests?.userId.fullName}</td>
                    <td>
                      {requests?.isAccepted === false ? (
                        <button
                          onClick={(e) => {
                            handleStatus(e, requests?._id);
                          }}
                          className="bg-red-700 hover:bg-red-800 text-white font-bold text-sm py-2 px-4 rounded"
                        >
                          Accept Request
                        </button>
                      ) : (
                        <>Request Already Accepted</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BBRequests;
