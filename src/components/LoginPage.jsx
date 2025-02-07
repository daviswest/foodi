import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login submitted", { email, password });
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo-dark">foodi</div>
                <h2 className="login-heading">Log in</h2>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="label-and-input">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="label-and-input">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="label-and-input">
                  <p style={{textAlign: 'right', color: '#dc4848'}}>Forgot password?</p>
                </div>
                <button className="login-button-large" type="submit">Log in</button>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                  <p style={{color: '#333'}}>Don't have an account?</p>
                  <button className='redirect-text' onClick={()=>navigate("/signup")}>Register</button>
                </div>
            </form>
            
        </div>
    );
};

export default LoginPage;
