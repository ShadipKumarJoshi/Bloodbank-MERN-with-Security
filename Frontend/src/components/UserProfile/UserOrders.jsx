

import React, { useEffect, useState } from "react";
import "./UserOrders.css";
import { toast } from "react-toastify";
import { userDetailsApi } from "../../api/Api";

const UserOrders = () => {
  // Initialize currentUser with an empty orders array to ensure there's always an array to map over.
  const [currentUser, setCurrentUser] = useState({ orders: [] });
  
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      toast.error("No user data found. Please login again.");
      return;
    }
    
    const { _id: userId } = JSON.parse(userData);

    if (!userId) {
      toast.error("No user ID found. Please login again.");
      return;
    }

    userDetailsApi({ userId: userId })
      .then((res) => {
        if (res.data.success) {
          // Set the user data only if it includes an orders array
          setCurrentUser(res.data.user.orders || { orders: [] });
        } else {
          toast.error(res.data.message || "Failed to fetch user data.");
        }
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching data. Please check your connection and try again.");
      });
  }, []);

  return (
    <div className="user-orders">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {currentUser.length > 0 ? (
          currentUser.map((order, index) => (
            <div key={index} className="order-item">
              <h4>Order ID: {order.orderId}</h4>
              <p><strong>Total Cost:</strong> Rs.{order.productCost}</p>
              <p><strong>Payment Status:</strong> {order.paidStatus ? "Success" : "Pending"}</p>
            </div>
          ))
        ) : (
          <p>No orders history found.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
