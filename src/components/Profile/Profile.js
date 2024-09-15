import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://weatherbackend-wgog.onrender.com/profile",
        { username },
        { headers: { Authorization: token } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="profile-input"
        />
        <button type="submit" className="profile-button">
          Update
        </button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
};

export default Profile;
