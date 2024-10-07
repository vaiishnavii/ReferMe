import React from 'react';
import OAuthLogin from './OAuthLogin';
import '../styles/OAuthLogin.css'; // Assuming you have some CSS for styling

const AuthScreen = () => {
  return (
    <div className="auth-screen">
      <h2>Welcome to ReferMe</h2>
      <OAuthLogin />
    </div>
  );
};

export default AuthScreen;