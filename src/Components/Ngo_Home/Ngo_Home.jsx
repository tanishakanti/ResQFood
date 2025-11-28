import React, { useEffect, useState } from "react";
import "./Ngo_Home.css";
import NavbarPage from "../Navbar/NavbarPage";
import { db } from "../../firebase"; // adjust path
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Ngo_Home = () => {
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    completed: 0,
  });

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Real-time listener for donations
    const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
      const donationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDonations(donationData);

      // update stats
      const active = donationData.length;
      const pending = donationData.filter((d) => d.urgency === "pickup").length;
      const completed = donationData.filter((d) => d.status === "completed").length;

      setStats({ active, pending, completed });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavbarPage />
      <div className="app-nh">
        {/* Highlight Banner */}
        <section className="highlight-banner-nh">
          <div className="highlight-content-nh">
            <span className="urgent-tag-nh">URGENT</span>
            <h2>Free Meals Available</h2>
            <p>Check the donation feed for urgent pickups!</p>
          </div>
        </section>

        {/* Stats */}
        <div className="stats-container-nh">
          <div className="stat-card-nh">
            <h3>{stats.active}</h3>
            <p>Total Active Donations</p>
          </div>
          <div className="stat-card-nh">
            <h3>{stats.pending}</h3>
            <p>Pending Pickups</p>
          </div>
          <div className="stat-card-nh">
            <h3>{stats.completed}</h3>
            <p>Completed Donations</p>
          </div>
        </div>

        {/* Donation Feed */}
        <section className="donation-feed-nh">
          <div className="feed-header-nh">
            <h2>Donation Feed</h2>
            <div className="feed-controls-nh">
              <select>
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
              </select>
              <select>
                <option>Filter: All</option>
                <option>Urgent</option>
                <option>Pickup Today</option>
              </select>
            </div>
          </div>

          <div className="feed-list-nh">
            {donations.map((donation) => (
              <div key={donation.id} className="donation-card-nh">
                <img
                  src={donation.image || "https://via.placeholder.com/150"}
                  alt={donation.typeOfFood}
                />
                <div className="donation-info-nh">
                  <h3>{donation.restaurantName}</h3>
                  <p>{donation.typeOfFood}</p>
                  <span className="address-nh">📍 {donation.address}</span>
                </div>
                <div className="donation-actions-nh">
                  <span
                    className={`status-badge-nh ${
                      donation.urgency === "urgent"
                        ? "urgent"
                        : donation.urgency === "pickup"
                        ? "pickup"
                        : "completed"
                    }`}
                  >
                    {donation.expiryTime || "No expiry info"}
                  </span>
                  <button className="decline-btn-nh">Decline</button>
                </div>
              </div>
            ))}
          </div>

          <div className="feed-footer-nh">
            <button className="urgent-btn-nh">Claim All Urgent</button>
            <Link to="/OLMap">
              <button className="map-btn-nh">View Map</button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ngo_Home;


// import React, { useEffect, useState } from "react";
// import "./Ngo_Home.css";
// import NavbarPage from "../Navbar/NavbarPage";
// import { db } from "../../firebase"; // adjust path
// import { collection, onSnapshot } from "firebase/firestore";

// const Ngo_Home = () => {
//   const [stats, setStats] = useState({
//     active: 0,
//     pending: 0,
//     completed: 0,
//   });

//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     // Fetch donations from Firestore
//     const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
//       const donationData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setDonations(donationData);

//       // Update stats
//       const active = donationData.length;
//       const pending = donationData.filter(d => d.status === "pickup").length;
//       const completed = donationData.filter(d => d.status === "completed").length;

//       setStats({ active, pending, completed });
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <NavbarPage />
//       <div className="app-nh">
//         {/* Highlight Banner */}
//         <section className="highlight-banner-nh">
//           <div className="highlight-content-nh">
//             <span className="urgent-tag-nh">URGENT</span>
//             <h2>Free Meals Available</h2>
//             <p>Check the donation feed for urgent pickups!</p>
//           </div>
//         </section>

//         {/* Stats */}
//         <div className="stats-container-nh">
//           <div className="stat-card-nh">
//             <h3>{stats.active}</h3>
//             <p>Total Active Donations</p>
//           </div>
//           <div className="stat-card-nh">
//             <h3>{stats.pending}</h3>
//             <p>Pending Pickups</p>
//           </div>
//           <div className="stat-card-nh">
//             <h3>{stats.completed}</h3>
//             <p>Completed Donations</p>
//           </div>
//         </div>

//         {/* Donation Feed */}
//         <section className="donation-feed-nh">
//           <div className="feed-header-nh">
//             <h2>Donation Feed</h2>
//             <div className="feed-controls-nh">
//               <select>
//                 <option>Sort by: Newest</option>
//                 <option>Sort by: Oldest</option>
//               </select>
//               <select>
//                 <option>Filter: All</option>
//                 <option>Urgent</option>
//                 <option>Pickup Today</option>
//               </select>
//             </div>
//           </div>

//           <div className="feed-list-nh">
//             {donations.map((donation) => (
//               <div key={donation.id} className="donation-card-nh">
//                 <img src={donation.image || "https://via.placeholder.com/150"} alt={donation.restaurantName} />
//                 <div className="donation-info-nh">
//                   <h3>{donation.restaurantName}</h3>
//                   <p>{donation.description}</p>
//                   <span className="address-nh">📍 {donation.address}</span>
//                 </div>
//                 <div className="donation-actions-nh">
//                   <span
//                     className={`status-badge-nh ${
//                       donation.status === "urgent" ? "urgent" :
//                       donation.status === "pickup" ? "pickup" : "completed"
//                     }`}
//                   >
//                     {donation.expiry || "No expiry info"}
//                   </span>
//                   <button className="decline-btn-nh">Decline</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="feed-footer-nh">
//             <button className="urgent-btn-nh">Claim All Urgent</button>
//             <button className="map-btn-nh">View Map</button>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Ngo_Home;
