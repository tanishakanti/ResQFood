import React, { useState } from "react";
import "./DonationsNgoPage.css";
import sourdough from "../../assets/sourdough.jpg";
import pastry from "../../assets/pastry.jpeg";
import soup from "../../assets/soup.jpg";
import salad from "../../assets/salad.jpeg";
import sandwich from "../../assets/sandwich.jpg";

const initialDonations = [
  {
    id: 1,
    title: "Fresh Sourdough Bread",
    quantity: "20 Loaves",
    status: "Available",
    location: "Connaught Place",
    restaurant: "Golden Crust Bakery",
    address: "123 MG Road, Connaught Place, New Delhi, India",
    pickup: "Today, 4:00 PM",
    instructions: "Keep refrigerated.",
    image: sourdough,
    distance: "1.3 km",
    rating: 4.7,
  },
  {
    id: 2,
    title: "Assorted Pastries",
    quantity: "5 Boxes",
    status: "Available",
    location: "Powai",
    restaurant: "Morning Dew Cafe",
    address: "456 Lake Road, Powai, Mumbai, India",
    pickup: "Today, 5:30 PM",
    instructions: "Contains nuts and dairy allergens.",
    image: pastry,
    distance: "1.9 km",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Vegetable Soup",
    quantity: "15 Liters",
    status: "Accepted",
    location: "Banjara Hills",
    restaurant: "Green Leaf Kitchen",
    address: "789 Jubilee Hills, Hyderabad, Telangana, India",
    pickup: "Tomorrow, 12:00 PM",
    instructions: "Vegan-friendly.",
    image: soup,
    distance: "1.1 km",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Mixed Green Salads",
    quantity: "30 Salads",
    status: "Delivered",
    location: "Indiranagar",
    restaurant: "Healthy Bites",
    address: "321 100 Feet Road, Indiranagar, Bengaluru, India",
    pickup: "Delivered Already",
    instructions: "No dressing included.",
    image: salad,
    distance: "2.4 km",
    rating: 4.3,
  },
  {
    id: 5,
    title: "Sandwich Platters",
    quantity: "4 Large",
    status: "Available",
    location: "Park Street",
    restaurant: "Sub Supreme",
    address: "654 Park Street, Kolkata, West Bengal, India",
    pickup: "Tomorrow, 11:00 AM",
    instructions: "Vegetarian options available.",
    image: sandwich,
    distance: "2.0 km",
    rating: 4.6,
  },
];

const tabLabels = [
  { key: "all", label: "All" },
  { key: "Available", label: "Available" },
  { key: "Accepted", label: "Accepted" },
];

const statusButtonClasses = {
  Accepted: "accepted-btn",
};

const DonationsNgoPage = () => {
  const [donations, setDonations] = useState(initialDonations);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const handleAccept = (id) => {
    setDonations((prev) =>
      prev.map((donation) =>
        donation.id === id ? { ...donation, status: "Accepted" } : donation
      )
    );
  };

  const filteredDonations =
    selectedTab === "all"
      ? donations.filter(d => d.status !== "Delivered") // hide delivered completely
      : donations.filter(d => d.status === selectedTab);

  const closeModal = () => {
    setSelectedDonation(null);
    setUserRating(0);
  };

  return (
    <div className="donations-page">
      <div className="donations-header">
        <div className="header-content">
          <h2>Available Donations</h2>
          <p>
            Browse and accept food donations near you.<br />
            <span style={{ color: "#956240" }}>
              Help reduce waste and feed communities. <span className="earth-emoji">🌎</span>
            </span>
          </p>
        </div>
        <div className="header-controls">
          <div className="filter-tabs">
            {tabLabels.map(({ key, label }) => (
              <button
                key={key}
                className={selectedTab === key ? "active" : ""}
                onClick={() => setSelectedTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="view-toggle">
            <button className="active">List View</button>
            <button onClick={() => alert("Map view coming soon!")}>Map View</button>
          </div>
        </div>
      </div>

      <div className="donations-grid">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className="donation-card">
            <div className="card-image">
              <img src={donation.image} alt={donation.title} />
              <span className={`status-badge ${donation.status.toLowerCase()}`}>
                {donation.status}
              </span>
              <div className="restaurant-rating">
                <span className="stars">
                  {"★".repeat(Math.floor(donation.rating))}
                  {"☆".repeat(5 - Math.floor(donation.rating))}
                </span>
                <span className="rating-text">{donation.rating}</span>
              </div>
            </div>
            <div className="donation-info">
              <h3>{donation.title}</h3>
              <p className="quantity">{donation.quantity}</p>
              <div className="location-info">
                <span className="location">📍 {donation.location}</span>
                <span className="distance">{donation.distance}</span>
              </div>
              <p>{donation.restaurant}</p>
              <p>{donation.pickup}</p>

              <div className="card-actions">
                {donation.status === "Available" && (
                  <>
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(donation.id)}
                    >
                      Accept Donation
                    </button>
                    <button
                      className="details-btn"
                      onClick={() => setSelectedDonation(donation)}
                    >
                      Details
                    </button>
                  </>
                )}
                {donation.status === "Accepted" && (
                  <>
                    <button className="accepted-btn" disabled>
                      Accepted
                    </button>
                    <button
                      className="details-btn"
                      onClick={() => setSelectedDonation(donation)}
                    >
                      Details
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDonation && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <div className="modal-content">
              <h2>{selectedDonation.title} <span className={`status ${selectedDonation.status.toLowerCase()}`}>{selectedDonation.status}</span></h2>
              <img src={selectedDonation.image} alt={selectedDonation.title} className="modal-img" />
              <p><b>Quantity:</b> {selectedDonation.quantity}</p>
              <p><b>Location:</b> {selectedDonation.location}</p>
              <p><b>Address:</b> {selectedDonation.address}</p>
              <p><b>Restaurant:</b> {selectedDonation.restaurant}</p>
              <p><b>Pickup:</b> {selectedDonation.pickup}</p>
              <p><b>Instructions:</b> {selectedDonation.instructions}</p>

              <div className="rate-restaurant">
                <b>Rate Restaurant:</b>
                <div className="stars">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={i <= userRating ? "star filled" : "star"} onClick={() => setUserRating(i)}>★</span>
                ))}
                </div>
                {userRating > 0 && <small>You rated this {userRating} star{userRating > 1 ? "s" : ""}.</small>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsNgoPage;
