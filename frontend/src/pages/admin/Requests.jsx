import React, { useEffect, useState } from "react";
import { viewRequestApi } from "../../apis/api";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({
    hospitalName: "",
    hospitalAddress: "",
    bloodGroup: "",
    urgency: "",
  });

  useEffect(() => {
    viewRequestApi()
      .then((res) => {
        const formattedRequests = res.data.requestList.map((request) => {
          const dateOfBirth = new Date(request.dob);
          const formattedDateOfBirth = `${dateOfBirth.getDate()}/${
            dateOfBirth.getMonth() + 1
          }/${dateOfBirth.getFullYear()}`;
          return { ...request, dob: formattedDateOfBirth };
        });
        setRequests(formattedRequests);
        setFilteredRequests(formattedRequests);
      })
      .catch((error) => {
        console.error("Error fetching Requests:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = requests.filter((request) => {
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
        (filters.urgency === "" ||
          request.urgency.toLowerCase().includes(filters.urgency.toLowerCase()))
      );
  });
    setFilteredRequests(filtered);
  }, [filters, requests]);

  return (
    <div
      className="background"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="container content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 className="text-center">All The Requests</h2>
        <div className="flex w-100 my-4 gap-2">
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            name="hospitalName"
            placeholder="Filter by Hospital Name"
            value={filters.hospitalName}
            onChange={handleFilterChange}
          />
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            name="hospitalAddress"
            placeholder="Filter by Hospital Address"
            value={filters.hospitalAddress}
            onChange={handleFilterChange}
          />
          <select
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
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
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
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
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Patient Name</th>
                <th>Patient Blood Type</th>
                <th>Phone Number</th>
                <th>Hospital Name</th>
                <th>Hospital Address</th>
                <th>Quantity</th>
                <th>Urgency</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Contact Person</th>
                <th>Requested By</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests?.map((request) => (
                <tr key={request._id}>
                  <td>{request.patientName}</td>
                  <td>{request.patientBloodType}</td>
                  <td>{request.phoneNumber}</td>
                  <td>{request.hospitalName}</td>
                  <td>{request.hospitalAddress}</td>
                  <td>{request.quantity}</td>
                  <td>{request.urgency}</td>
                  <td>{request.reason}</td>
                  <td>{request.date}</td>
                  <td>{request.contactPerson}</td>
                  <td>{request.userId?.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
