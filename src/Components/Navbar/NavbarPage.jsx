import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Profile from '../../assets/profile.jpg';
import './NavbarPage.css';

const NavbarPage = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-uh">
      {/* Logo / Brand */}
      <div className="logo-uh" onClick={() => navigate('/ngoHome')}>
        <img src={Logo} alt="logo" />
        <span className="logo-text-uh"> Food Rescue Matchmaker</span>
      </div>

      <div className="nav-right-uh">
        <ul className="nav-links-uh">
          <li onClick={() => navigate('/donateNgoPage')}>Donations</li>
          <li onClick={() => navigate('/NgoDashboard')}>Impact</li>
          <li onClick={() => navigate('/aboutUs')}>About</li>
        </ul>
        <div className="profile-uh">
          <img src={Profile} alt="profile" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;
