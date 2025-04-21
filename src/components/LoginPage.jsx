import { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleLogin(email, password);
        if (success) navigate("/");
    };

    return (
        <div className="login-page" role="main" aria-label="Login page">
            <div className="login-container">
                <div className="logo-dark" role="img" aria-label="Foodi logo">foodi</div>
                <h1 className="login-heading">Log in</h1>
                <div 
                    className={`error-container ${error ? 'show' : ''}`}
                    role="alert"
                    aria-live="assertive"
                >
                    {error && <p style={{ color: "white" }}>{error}</p>}
                </div>
            </div>
            <form 
                className="login-form" 
                onSubmit={handleSubmit}
                aria-label="Login form"
            >
                <div className="label-and-input">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Email address"
                        autoComplete="email"
                    />
                </div>
                <div className="label-and-input">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Password"
                        autoComplete="current-password"
                    />
                </div>
                <div className="label-and-input">
                    <button 
                        type="button"
                        className='redirect-text' 
                        onClick={()=>navigate("/forgot-password")}
                        aria-label="Forgot password? Click to reset your password"
                    >
                        Forgot password?
                    </button>
                </div>
                <button 
                    className="login-button-large" 
                    type="submit"
                    aria-label="Log in to your account"
                >
                    Log in
                </button>
                <div 
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}
                    role="complementary"
                    aria-label="Registration section"
                >
                    <p style={{color: '#333'}}>Don't have an account?</p>
                    <button 
                        className='redirect-text' 
                        onClick={()=>navigate("/signup")}
                        aria-label="Create a new account"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
