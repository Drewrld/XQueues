import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {user.fullname.charAt(0).toUpperCase()}
          </div>

          <h2>{user.fullname}</h2>
          <p>{user.role}</p>
        </div>

        <div className="profile-details">
          <div className="profile-info">
            <label>Full Name</label>
            <p>{user.fullname}</p>
          </div>

          <div className="profile-info">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>

          <div className="profile-info">
            <label>Student / Employee ID</label>
            <p>{user.studentId}</p>
          </div>

          <div className="profile-info">
            <label>Account Role</label>
            <p>{user.role}</p>
          </div>

          <div className="profile-info">
            <label>Account ID</label>
            <p>{user.id}</p>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/dashboard" className="profile-back">
            Back to Dashboard
          </Link>

          <Link to="/logout" className="profile-logout">
            Logout
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Profile;