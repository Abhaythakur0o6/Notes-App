import React, { useContext, useEffect, useState } from 'react'
import "./Form.css"
import { useNoteContext } from '../../Context/NotesContext'

const Form = (props) => {

  const { notes, setNotes, editNote, setEditNote, currentUserId } = useNoteContext();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [id, setId] = useState("")
  const { form, toggleForm } = useNoteContext()

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title)
      setContent(editNote.content)
      setId(editNote.id)
    }
    else {
      setTitle("")
      setContent("")
    }
  }, [editNote])

  const saveNotes = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content before saving.");
      return;
    }
    if (editNote) {
      fetch("http://localhost:5000/updatenote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ id, title, content })
      })
        .then(res => res.json())
        .then(data => {
          setNotes(prevNotes =>
            prevNotes.map(note => note._id === data.updatedNote._id ? data.updatedNote : note)
          )
          setEditNote(null)
          toggleForm();
        })
    } else {
      const user = currentUserId;
      fetch("http://localhost:5000/newnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content, user })
      })
        .then(res => res.json())
        .then(data => {
          setNotes(prev => [...prev, data.note]);
          toggleForm();
          setTitle("")
          setContent("")
        })
    }
  }

  const changed = (e) => {
    const { name, value } = e.target;
    name === 'title' ? setTitle(value) : setContent(value)
  }

  return (
    <>
      {form
        ? <div className="notes-parent-folder">
          <div className="notes-form">
            <div className="form-heading">
              {editNote
                ? (
                  <>
                    <p>Edit Note</p>
                    <p>Make changes to your note</p>
                  </>
                )
                : (
                  <>
                    <p>Add Notes</p>
                    <p>Add a new note to your collection</p>
                  </>
                )
              }
            </div>
            <div className="form-input">
              <label htmlFor="title">Title</label>
              <input value={title} onChange={changed} className='form-inputs' type="text" placeholder='Note title' name="title" required />
              <label htmlFor="content">Content</label>
              <textarea value={content} onChange={changed} className='form-inputs' name="content" placeholder='Write your note here....' rows={10} required></textarea>
            </div>
            <div className="form-buttons">
              <button onClick={toggleForm}>Cancel</button>
              <button onClick={saveNotes}>{editNote ? "Save Changes" : "Create Note"}</button>
            </div>
          </div>
        </div>
        : <></>
      }
    </>
  )
}

export default Form