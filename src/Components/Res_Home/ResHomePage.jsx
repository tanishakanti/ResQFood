import React from "react";
import "./ResHomePage.css";
import heroImg from "../../assets/res_home.jpg";
import Logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";

const ResHomePage = () => {
  const navigate = useNavigate();
  const handleClick = (page) => {
    navigate(page);
  };
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          FoodRescue
        </div>
        <ul className="nav-links">
          <li onClick={() => handleClick("/donationForm")}>Donations</li>
          <li onClick={() => handleClick("/resDashboard")}>Impact</li>
          <li onClick={() => handleClick("/profile")}>Profile</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to
            <span>Café Verde</span>
          </h1>
          <p>Join us in reducing food waste and feeding communities.</p>
          <button className="cta-btn" onClick={() => handleClick("/donationForm")}>Donate Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Dashboard" />
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <h2>Your Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>120+</h3>
            <p>Donations Made</p>
          </div>
          <div className="impact-card">
            <h3>500+</h3>
            <p>Meals Saved</p>
          </div>
          <div className="impact-card">
            <h3>2.5 Tons</h3>
            <p>CO₂ Emissions Reduced</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 FoodRescue. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default ResHomePage;
