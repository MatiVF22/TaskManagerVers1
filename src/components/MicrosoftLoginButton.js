import React from 'react';

const MicrosoftLoginButton = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulación de inicio de sesión con Microsoft 365
    // En una aplicación real, aquí iría la lógica de MSAL.js
    // para redirigir al usuario a la página de login de Microsoft.
    console.log('Iniciando sesión con Microsoft 365...');
    // Después de una autenticación exitosa, se llamaría a onLogin con los datos del usuario.
    // Por ahora, simulamos un usuario administrador.
    setTimeout(() => {
      const adminUser = {
        name: 'Admin User',
        email: 'admin@empresa.com',
        isAdmin: true,
        token: 'simulated_msal_token_12345'
      };
      localStorage.setItem('msalToken', adminUser.token); // Guardar token simulado
      onLogin(adminUser);
    }, 1000);
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-5 15h10V5H5v10zM6 6h8v8H6V6z"/>
      </svg>
      <span>Iniciar sesión con Microsoft 365</span>
    </button>
  );
};

export default MicrosoftLoginButton;