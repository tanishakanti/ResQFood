import React, { useState } from "react";
import "./RestaurantSignUpPage.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

import bgImage from '../../assets/bg_image.jpg'

const ResSignup = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    resName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;

      // Step 2: Store profile info in Firestore (NO password)
      await setDoc(doc(db, "restaurants", uid), {
        resName: formData.resName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
      });

      toast.success("Restaurant registered successfully!");

      // ✅ Redirect after a short delay so toast can be seen
      setTimeout(() => {
        navigate("/resHome");  // Change to your homepage route
      }, 1500);

      // Clear form
      setFormData({
        resName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
      });

    } catch (error) {
      console.error("Error during signup: ", error);
      toast.error("Failed to register Restaurant.");
    }
  };

  return (
    <div
      className="res-signup-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div className="res-signup-box">
        <h1 className="res-signup-title">Restaurant Sign Up</h1>
        <p className="res-signup-subtitle">
          Create your account to join Food Rescue Matchmaker
        </p>

        <form className="res-signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              name="resName"
              value={formData.resName}
              onChange={handleChange}
              placeholder="Enter Restaurant name"
              required
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

  

          <p className="login-text">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/resAuth")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ResSignup;
