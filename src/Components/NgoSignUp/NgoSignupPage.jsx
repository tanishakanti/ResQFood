import React, { useState } from "react";
import "./NgoSignupPage.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/bg_image.jpg";

const NgoSignup = () => {
  const navigate = useNavigate(); //  navigation hook
  const [formData, setFormData] = useState({
    ngoName: "",
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "ngos", uid), {
        ngoName: formData.ngoName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
      });

      toast.success("NGO registered successfully!");

      setFormData({
        ngoName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
      });

      navigate("/ngoHome"); // Redirect to NGO Home after signup
    } catch (error) {
      console.error("Error during signup: ", error);
      toast.error("Failed to register NGO: " + error.message);
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div className="overlay"></div>

      <div className="signup-box">
        <h1 className="signup-title">NGO Sign Up</h1>
        <p className="signup-subtitle">
          Create your account to join Food Rescue Matchmaker
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>NGO Name</label>
            <input
              type="text"
              name="ngoName"
              value={formData.ngoName}
              onChange={handleChange}
              placeholder="Enter NGO name"
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
            <Link to="/ngoAuth">Login</Link>
          </p>
        </form>
      </div>

      {/* Toast container */}
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

export default NgoSignup;
