import React, { useState } from "react";
import "./RestaurantAuthPage.css";
import { assets } from "../../assets/assets";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";  // ✅ import navigate hook

const RestaurantAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigation

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Restaurant logged in successfully!");

      // ✅ redirect to homepage after success
      setTimeout(() => {
        navigate("/resHome"); // <-- change this route to your homepage route
      }, 1500); // delay so toast shows
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Failed to login restaurant: " + error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");

      // ✅ redirect to homepage
      setTimeout(() => {
        navigate("/resHome"); 
      }, 1500);
    } catch (error) {
      console.error("Google login failed:", error.message);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${assets.bg_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay"></div>
      <div className="login-box">
        <h1 className="login-title">Food Rescue Matchmaker</h1>
        <p className="login-subtitle">
          Welcome back! Please log in to continue.
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="google-icon"
            />
            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account? <a href="/resSign">Sign up</a>
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

export default RestaurantAuth;
