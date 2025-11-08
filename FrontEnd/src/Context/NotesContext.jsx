import { createContext, useContext, useEffect, useState } from "react";
const NoteContext = createContext();


export const NotesContextProvider = ({ children }) => {

    //For Dark Mode
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            localStorage.setItem("theme", "light")
            document.body.classList.remove("dark-mode");
        } else {
            localStorage.setItem("theme", "dark")
            document.body.classList.add("dark-mode");
        }
    }, [darkMode]);

    // Show Form 

    const [form, setForm] = useState(false);
    const toggleForm = () => {
        setForm(!form)
        if (form) {
            setEditNote(null)
        }
    }

    // Current User Id

    const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("userId") || "")

    // NOTES

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (!currentUserId) return;
        const token = localStorage.getItem("token")
        if (!token) {
            console.log("No token found")
            return
        }
        fetch(`${import.meta.env.VITE_NOTES_API_URL}/allnotes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ currentUserId })
        })
            .then((response) => response.json())
            .then((data) => {
                setNotes(data.notes)
            })
    }, [currentUserId])

    // Edit Note

    const [editNote, setEditNote] = useState(null)


    const contextValue = { darkMode, toggleTheme, form, toggleForm, notes, setNotes, setEditNote, editNote, currentUserId, setCurrentUserId }

    return (
        <>
            <NoteContext.Provider value={contextValue} >
                {children}
            </NoteContext.Provider>
        </>
    )
}

export const useNoteContext = () => useContext(NoteContext)