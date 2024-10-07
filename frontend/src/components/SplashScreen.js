import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth'); // Redirect to authentication page
  };

  return (
    <div className="splash-screen">
      <img src="/logo.png" alt="ReferMe Logo" className="logo" />
      <h1>ReferMe</h1>
      <p>Connecting talent with opportunities through trusted referrals</p>
      <button className="get-started" onClick={handleGetStarted}>
        Get Started 
      </button>
    </div>
  );
};

export default SplashScreen;