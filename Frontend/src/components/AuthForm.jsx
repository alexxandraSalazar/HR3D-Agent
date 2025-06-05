import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";

const AuthForm = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post(route,{ username, password});

            if (method == 'login'){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
                window.location.reload();
            } else {
                setSuccess("Registration successful! You can now log in.");
                setTimeout(()=>{
                    navigate("/login");
                }, 2000)
            }
        } catch (err) {
            console.error(err);
            if(err.response) {
                if(err.response.status === 401){
                    setError("Invalid username or password. Please try again.");
                } else if (error.response.status === 400) {
                    setError("Username already exists. Please choose a different username.");
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            } else if(err.request) {
                setError("Network error. Please check your connection and try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/accounts/google/login/";
    };

    return(
        <div style={{
            position: 'fixed',
            top: 100, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#fff',
                maxWidth: '400px',
                width: '100%',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                position: 'relative'
            }}>
                {loading && (
                    <div>
                        {error ? <span>{error}</span> : <span>Loading...</span>} 
                    </div>
                )}

                {!loading && (
                    <form onSubmit={handleSubmit}>
                        <h2>{method === 'register' ? 'Register' : 'Login'}</h2>
                        {error && <div>{error}</div>}
                        {success && <div>{success}</div>}
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'var(--color-google-yellow)', color: 'white' }}>
                            {method === 'register' ? 'Register' : 'Login'}
                        </button>
                        <button type="button" onClick={handleGoogleLogin} style={{ backgroundColor: 'var(--color-google-blue)', color: 'white' }}>
                            {method === 'register' ? 'Register with Google' : 'Login with Google'}
                        </button>
                        {method === 'login' && (
                            <p> Don't have an account?
                            <span style={{color: 'blue', cursor: 'pointer'}} onClick={()=>navigate("/register")}> Register</span></p>
                        )}
                        {
                            method === 'register' && (
                                <p> Already have an account?
                                <span style={{color: 'blue', cursor: 'pointer'}} onClick={()=>navigate("/login")}> Login</span></p>
                            )
                        }
                    </form>
                )}
            </div>
        </div>
    )
}

export default AuthForm;