import { useState } from "react";
import { requestPasswordReset } from "../api/authService";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage("If an account with that email exists, a reset link has been sent.");
      setError("");
    } catch (err) {
      setError(err || "Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-dark">foodi</div>
        <h2 className="login-heading">Forgot Password</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
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
          <button className="login-button-large" type="submit">Send Reset Link</button>
          <button className="redirect-text" onClick={() => navigate("/login")}>Back to Login</button>
        </form>
    </div>
  );
};

export default ForgotPasswordPage;
