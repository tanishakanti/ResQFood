import React from 'react'
import DonationFormPage from './Components/DonationForm/DonationFormPage'
import LandingPage from './Components/Landing/LandingPage'
import ResSignUp from './Components/RestaurantSignUp/RestaurantSignUpPage'
import ResAuth from './Components/RestaurantAuth/RestaurantAuthPage'
import NgoSign from './Components/NgoSignUp/NgoSignupPage'
import NgoAuth from './Components/NgoAuth/NgoAuthPage'
import NgoHome from './Components/Ngo_Home/Ngo_Home'
import ResHome from './Components/Res_Home/ResHomePage'
import NgoDashboardPage from './Components/NgoDashboard/NgoDashboardPage'
import ProfilePage from './Components/Profile/ProfilePage'
import DonationsNgoPage from './Components/DonationsNgo/DonationsNgoPage'
import AboutUsPage from './Components/AboutUs/AboutUsPage'
import ResDashboard from './Components/ResDashboard/ResDashboard'
import OLMap from './Components/OLMap/OLMap'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resSign" element={<ResSignUp />} />
        <Route path="/resAuth" element={<ResAuth />} />
        <Route path="/resHome" element={<ResHome />} />
        <Route path="/ngoSign" element={<NgoSign />} />
        <Route path="/ngoAuth" element={<NgoAuth />} />
        <Route path="/ngoHome" element={<NgoHome />} />
        <Route path="/donationForm" element={<DonationFormPage />} />
        <Route path="/resDashboard" element={<ResDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/donateNgoPage" element={<DonationsNgoPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/NgoDashboard" element={<NgoDashboardPage />} />
        <Route path="/OLMap" element={<OLMap />} />
      </Routes>
  )
}

export default App
