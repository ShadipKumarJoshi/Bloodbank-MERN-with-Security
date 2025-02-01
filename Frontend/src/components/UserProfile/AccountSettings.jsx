import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input } from 'reactstrap'; // Assuming usage of Reactstrap for UI components

const AccountSettings = () => {
  // Load user data from localStorage and parse it
  const userData = JSON.parse(localStorage.getItem("userData") || '{}');
  
  // State for form fields initialized with current user data or empty strings
  const [fullname, setFullname] = useState(userData.fullname || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [username, setUsername] = useState(userData.username || "");
  const [password, setPassword] = useState("");

  // Handle user account deletion
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
  
    try {
      const response = await axios.delete('http://localhost:5000/api/user/delete', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
        },
        data: {
          userId: userData._id, // Assuming userData is correctly fetched and stored
          password // Assuming password is collected from user input
        }
      });
  
      if (response.data.success) {
        localStorage.removeItem('token'); // Clear the token from local storage
        localStorage.removeItem('userData'); // Clear all user data from local storage
        toast.success(response.data.message);
        window.location.href = '/login'; // Redirect to login after account deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while trying to delete the account: " + (error.response?.data?.message || error.message));
    }
  };
  

  // Render the account settings form
  return (
    <div className="account__settings">
      <h1>Account Settings</h1>
      <FormGroup>
        <label>Full Name</label>
        <Input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label>Phone (disabled)</label>
        <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled />
      </FormGroup>
      <FormGroup>
        <label>Username</label>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password to confirm" />
      </FormGroup>
      <Button color="danger" onClick={handleDelete} className="mt-3 w-100">Delete Account</Button>
    </div>
  );
};

export default AccountSettings;
