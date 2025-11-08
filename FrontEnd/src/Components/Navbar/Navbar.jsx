import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../../Context/NotesContext";
import "./Navbar.css";

const Navbar = () => {
  const { toggleForm, setCurrentUserId } = useNoteContext();
  const navigate = useNavigate();
  // const [darkMode, setDarkMode] = useState();
  const [_, forceUpdate] = useState(0);


  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      localStorage.setItem("theme", "light")
      document.body.classList.remove("dark-mode");
    } else {
      localStorage.setItem("theme", "dark")
      document.body.classList.add("dark-mode");
    }
    forceUpdate(n => n + 1);
  };

  const signOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUserId("");
    navigate("/");
  };

  const currentPageTheme = localStorage.getItem("theme")

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
          {currentPageTheme === "dark" ?( <i className="fa-solid fa-sun"></i>) : (<i className="fa-solid fa-moon"></i>)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;