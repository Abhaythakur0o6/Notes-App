import React, { useContext } from "react";
import "./Card.css";
import { useNoteContext } from "../../Context/NotesContext";

const Card = (props) => {

  const { toggleForm, setNotes, setEditNote } = useNoteContext();

  const editNote = () => {
    setEditNote({
      id: props.id,
      title: props.title,
      content: props.content
    })
    toggleForm()
  }

  const deleteNote = (id) => {
    fetch("http://localhost:5000/deletenote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotes(prevNotes => prevNotes.filter(note => note._id != id));
        }
      })
  }

  return (
    <div className="card">
      <div className="card-heading">
        <h3 className="card-title">{props.title}</h3>
        <div className="card-heading-button">
          <button onClick={editNote} ><i className="fa-solid fa-pencil"></i></button>
          <button onClick={() => deleteNote(props.id)} ><i className="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <p className="card-notes">{props.content}</p>
      <div className="card-tag">
        <span className="tag">Notes</span>
        <span className="time">{new Date(props.time).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}</span>
      </div>
    </div>
  );
};

export default Card;