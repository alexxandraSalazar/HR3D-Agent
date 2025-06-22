import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function GoogleSignInButton() {
  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);
    console.log("Usuario autenticado por Google:", decoded);

    try {
      const response = await axios.post('http://localhost:8000/auth/google/', 
        {
        access_token: credential,
        provider: 'google',
      },
        {
        withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      console.log("Autenticación exitosa contra backend");
    } catch (error) {
      console.error("Error autenticando contra backend:", error.response?.data || error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.log("Error al iniciar sesión con Google")}
    />
  );
}
