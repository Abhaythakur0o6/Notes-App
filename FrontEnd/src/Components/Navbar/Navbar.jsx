import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../../Context/NotesContext";
import "./Navbar.css";

const Navbar = () => {
  const { toggleForm, setCurrentUserId } = useNoteContext();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const signOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUserId("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="nav-title">My Notes</h2>
      </div>
      <div className="nav-right">
        <button className="nav-btn" onClick={toggleForm}>
          Add Note
        </button>
        <button className="nav-btn logout" onClick={signOut}>
          Logout
        </button>
        <button className="nav-btn theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
