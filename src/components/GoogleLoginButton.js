import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = ({ onLogin }) => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token: credentialResponse.credential,
      isAdmin: decoded.email.endsWith('@empresa.com')
    };

    localStorage.setItem('googleToken', user.token);
    if (onLogin) onLogin(user);
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error('Error en el inicio de sesión con Google')}
        useOneTap
      />
    </div>
  );
};

export default GoogleLoginButton;
// Este componente utiliza el paquete @react-oauth/google para manejar el inicio de sesión con Google.