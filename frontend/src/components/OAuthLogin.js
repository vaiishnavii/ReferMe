import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/OAuthLogin.css';

const OAuthLogin = () => {
  const { loginOrSignup } = useContext(AuthContext);

  return (
    <div className="oauth-login">
      <button onClick={() => loginOrSignup('google', 'signup')}>Sign Up with Google</button>
      <button onClick={() => loginOrSignup('linkedin', 'signup')}>Sign Up with LinkedIn</button>
      <button onClick={() => loginOrSignup('google', 'login')}>Log In with Google</button>
      <button onClick={() => loginOrSignup('linkedin', 'login')}>Log In with LinkedIn</button>
    </div>
  );
};

export default OAuthLogin;