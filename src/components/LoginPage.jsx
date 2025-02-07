import React, { useState } from 'react';
import '../styles/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            </form>
            <p style={{paddingTop: '10px'}}>Don't have an account? <p style={{textAlign: 'right', color: '#dc4848'}}>Sign up</p></p>
        </div>
    );
};

export default LoginPage;
