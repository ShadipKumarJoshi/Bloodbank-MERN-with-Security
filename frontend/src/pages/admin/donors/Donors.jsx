import React, { useEffect, useState } from "react";
import { fetchAllUsersApi } from "../../../apis/api";

export default function ViewDonors() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    fullName: "",
    currentAddress: "",
    isAvailable: "",
    isADonor: "",
    bloodGroup: "",
  });

  useEffect(() => {
    fetchAllUsersApi()
      .then((res) => {
        if (currentUser.isAdmin === true) {
          const formattedUsers = res.data.users.map((user) => {
            const dateOfBirth = new Date(user.dob);
            const formattedDateOfBirth = `${dateOfBirth.getDate()}/${
              dateOfBirth.getMonth() + 1
            }/${dateOfBirth.getFullYear()}`;
            return { ...user, dob: formattedDateOfBirth };
          });
          setUsers(formattedUsers);
        } else {
          const formattedUsers = res.data.userListForBloodBank.map((user) => {
            const dateOfBirth = new Date(user.dob);
            const formattedDateOfBirth = `${dateOfBirth.getDate()}/${
              dateOfBirth.getMonth() + 1
            }/${dateOfBirth.getFullYear()}`;
            return { ...user, dob: formattedDateOfBirth };
          });
          setUsers(formattedUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (users) => {
    return users.filter((user) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "isAvailable" || key === "isADonor") {
          return user[key] === (filters[key] === "true");
        }
        return user[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });
  };

  const filteredUsers = applyFilters(users);

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
        <h2 className="text-center">All The Donors</h2>

        <div className="flex w-100 my-4 gap-2">
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={filters?.fullName}
            onChange={handleFilterChange}
          />
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Current Address"
            name="currentAddress"
            value={filters.currentAddress}
            onChange={handleFilterChange}
          />
          <select
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            name="isAvailable"
            value={filters.isAvailable}
            onChange={handleFilterChange}
          >
            <option value="">Is Available</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {users.isAdmin ? (
            <select
              className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              name="isADonor"
              value={filters.isADonor}
              onChange={handleFilterChange}
            >
              <option value="">Is A Donor</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : null}
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
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Current Address</th>
                <th>Is Available</th>
                <th>Is A Donor</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Blood Group</th>
                <th>No Previous Donation</th>
                <th>Emergency Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr key={item._id}>
                  <td>{item?.fullName || "Null"}</td>
                  <td>{item?.email || "Null"}</td>
                  <td>{item?.number || "Null"}</td>
                  <td>{item?.currentAddress || "Null"}</td>
                  {item?.isAvailable ? (
                    <td className="!text-green-400">Yes</td>
                  ) : (
                    <td className="!text-red-600">No</td>
                  )}
                  {item.isADonor ? (
                    <td className="!text-green-400">Yes</td>
                  ) : (
                    <td className="!text-red-600">No</td>
                  )}
                  <td>{item.gender || "Null"}</td>
                  <td>{item.dob || "Null"}</td>
                  <td>{item.bloodGroup || "Null"}</td>
                  <td>{item.noPreviousDonation || "Null"}</td>
                  <td>{item.emergencyNumber || "Null"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
