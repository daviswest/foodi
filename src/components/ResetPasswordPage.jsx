import { useState } from "react";
import { resetPassword } from "../api/authService";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await resetPassword(token, password);
      setMessage("Password reset successful. You will be redirected to log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err || "Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-dark">foodi</div>
        <h2 className="login-heading">Reset Password</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
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
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button-large" type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
