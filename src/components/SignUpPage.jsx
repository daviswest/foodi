import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("sign up submitted", { email, password });
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="logo-dark">foodi</div>
                <h2 className="signup-heading">Register</h2>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="label-and-input">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className="signup-button-large" type="submit">Register</button>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                  <p style={{color: '#333'}}>Already have an account?</p>
                  <button className='redirect-text' onClick={()=>navigate("/login")}>Log in</button>
                </div>
            </form>
            
        </div>
    );
};

export default SignUpPage;
