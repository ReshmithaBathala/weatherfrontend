import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  // Logout functionality to clear token
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {!localStorage.getItem("token") ? (
          <>
            <li>
              <Link to="/" className="navbar-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/weather" className="navbar-link">
                Weather
              </Link>
            </li>
            <li>
              <Link to="/history" className="navbar-link">
                History
              </Link>
            </li>
            <li>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </li>
            <li>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
