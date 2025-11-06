import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../Context/NotesContext";
import "./Css/LoginSignup.css"

const LoginSignup = () => {
  const { setCurrentUserId } = useNoteContext();
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const handleSignup = () => {
    fetch(`${import.meta.env.VITE_NOTES_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "");
        setMessageType(data.success ? "success" : "error");

        if (data.success) {
          navigate("/notes");
        }
      })
      .catch(() => {
        setMessage("Something went wrong. Please try again.");
        setMessageType("error");
      });
  };

  const handleLogin = () => {
    fetch(`${import.meta.env.VITE_NOTES_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "");
        setMessageType(data.success ? "success" : "error");

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.existingUserId);
          setCurrentUserId(data.existingUserId);
          navigate("/notes");
        }
      })
      .catch(() => {
        setMessage("Network error. Please try again later.");
        setMessageType("error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state === "login" ? handleLogin() : handleSignup();
  };

  return (
    <div className="ls-container">
      <div className="ls-card">
        <header className="ls-header">
          <h2 className="ls-title">
            {state === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="ls-subtitle">
            {state === "login"
              ? "Sign in to continue to your notes"
              : "Get started with your personal notes space"}
          </p>
        </header>

        <form className="ls-form" onSubmit={handleSubmit}>
          <label className="ls-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="ls-input"
            value={email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
          />

          <label className="ls-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="ls-input"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />

          <div className="ls-message">
            {message && (
              <p className={`ls-msg-${messageType}`}>{message}</p>
            )}
          </div>

          <button type="submit" className="ls-button">
            {state === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
        
        <div className="ls-toggle">
          {state === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <button
            className="ls-toggle-btn"
            onClick={() =>
              setState(state === "login" ? "signup" : "login")
            }
          >
            {state === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;