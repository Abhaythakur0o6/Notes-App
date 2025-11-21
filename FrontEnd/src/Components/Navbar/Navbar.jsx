import React from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../../Context/NotesContext";
import "./Navbar.css";

const Navbar = () => {
  const { toggleForm, setCurrentUserId, toggleTheme, darkMode } = useNoteContext();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUserId("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="nav-title"><i className="fa-solid fa-pen-to-square"></i> My Notes</h2>
      </div>
      <div className="nav-right">
        <button className="nav-btn" onClick={toggleForm}>
          Add Note
        </button>
        <button className="nav-btn logout" onClick={signOut}>
          Logout
        </button>
        <button className="nav-btn theme-toggle" onClick={toggleTheme}>
          {darkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;