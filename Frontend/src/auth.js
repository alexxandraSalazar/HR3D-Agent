import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from './api';
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "./token";


export const useAuthentication = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

            console.log('Acces token:', token);
            console.log('Google token:', googleAccessToken);

            if (token) {
                const decodedToken = jwtDecode(token);
                const tokenExpiration = decodedToken.exp;
                const now = Date.now() / 1000;

                if (tokenExpiration < now) {
                    const refreshed = await refreshToken();
                    if (refreshed) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(true);
                }
            } else if (googleAccessToken) {
                setIsAuthorized(true);
                const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
                console.log('Google token valid:', isGoogleTokenValid);
                if (isGoogleTokenValid) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(false);
            }
    };
    
    auth().catch(() => setIsAuthorized(false))
}, []);

const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        return false;
    }

    try {
        const response = await api.post('/token/refresh/', { refresh: refreshToken });
        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        setIsAuthorized(false);
    }
};

const validateGoogleToken = async (googleAccessToken) => {
    try {
        const response = await api.post('/google/validate_token/', {
            access_token: googleAccessToken
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Google token validation response:', response.data);
        return response.data.valid;
    } catch (error) {
        console.error('Error validating Google token:', error);
        return false;
    }
};

const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthorized(false);
    window.location.reload();
};

return { isAuthorized, logout };
  }