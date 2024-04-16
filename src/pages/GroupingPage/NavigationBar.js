// NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css"; // Import your CSS file for styling

const NavigationBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">Your Website Title</div>
      {/* Add any other navigation links here */}
      <Link to="/ut-course-schedule-visualizer/help">
        <button className="btn help-btn">?</button>
      </Link>
    </div>
  );
};

export default NavigationBar;
