import React, { useEffect, useState } from "react";
import { fetchAllUsersApi } from "../../../apis/api";
import "../../../style/ViewDonors.css";

const Users = () => {
  // useEffect for fetching all the products and showing in table
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllUsersApi().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <>
      <h1 className="user-h1">Blood Donors</h1>
      <div className="user-container">
        {users &&
          users.map((singleUser) => (
            <a href="#" className="user-card">
              <img
                src="https://imgs.search.brave.com/8RYwOQLSYfFjZ4rnIUeUvhB-Goi7jPiTZvWVciP7mJ8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9iMzMx/NDg1OC5zbXVzaGNk/bi5jb20vMzMxNDg1/OC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wMS9BdmF0b29u/LUF2YXRhci0zLTYw/MHg2MDAucG5nP2xv/c3N5PTImc3RyaXA9/MSZ3ZWJwPTE"
                alt={singleUser.fullName}
              />
              <div className="user-card-content">
                <h2 className="user-h2">{singleUser.fullName}</h2>
                <p className="user-p">{singleUser.bloodGroup}</p>
                <p className="user-p">{singleUser.phoneNumber}</p>
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default Users;