import React from "react";
import "./LandingPage.css";
import Food_Box from "../../assets/food_box.jpg";
import Logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar-ln">
        <div className="navbar-left-ln">
            <img src={Logo} alt="logo" />
          <span className="logo-ln"> Food Rescue Matchmaker</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-ln"
        style={{ backgroundImage: `url(${Food_Box})` }}
      >
        <div className="hero-overlay-ln"></div>
        <div className="hero-content-ln">
          <h1>
            Connect with Purpose <br /> 
            <span>Reduce Waste, Feed Hope.</span>
          </h1>
          <p>
            Join our community to reduce food waste and support those in need. <br />
            Whether you're a restaurant or an NGO, we'll help you make a difference.
          </p>
          <div className="btn-group-ln">
            <button 
            className="cta-btn-ln"
            onClick={() => navigate("/resSign")}>Restaurant Signup</button>

            <button 
            className="cta-btn-ln"
            onClick={() => navigate("/ngoSign")}>NGO Signup</button>
          </div>
        </div>
      </section>
    </div>
    <HowItWorks/>
    </>
  );
};

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-header">
        <h3>How It Works</h3>
        <h2>A Simple Path to a Greater Impact</h2>
        <p>
          Our platform simplifies the process of connecting restaurants with
          surplus food to NGOs serving communities in need.
        </p>
      </div>

      <div className="how-cards">
        {/* Restaurants */}
        <div className="card">
          <h3>Restaurants</h3>
          <p>
            Easily list your surplus food, specifying quantity and pickup times. 
            This turns what might have become waste into a valuable donation that directly supports local communities, reduces environmental impact, and helps fight hunger.
          </p>
        </div>

        {/* NGOs */}
        <div className="card">
          <h3>NGOs</h3>
          <p>
            Browse available food listings and request pickups that match your 
            needs. NGOs can also track donation history, manage multiple requests, and ensure efficient sourcing of nutritious food for the people they serve.
          </p>
        </div>

        {/* Community */}
        <div className="card">
          <h3>Community</h3>
          <p>
            Together, we create a sustainable food ecosystem. By participating, you contribute to a cycle of sharing, compassion, and impact—ensuring that nutritious meals reach more people, one plate at a time.
          </p>
        </div>
      </div>
    </section>
  );
};


export default LandingPage;
