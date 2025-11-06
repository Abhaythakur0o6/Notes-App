import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Card from '../Components/Card/Card'
import Form from '../Components/NotesForm/Form'
import "./Css/MainPage.css"
import { useNoteContext } from '../Context/NotesContext'

const MainPage = (props) => {

  const { notes } = useNoteContext();
  
  return (
    <>
      <div className="main-page">
        <Navbar />
        <div className="main-notes">
          {notes.map((note, key) => {
            return <Card title={note.title} content={note.content} id={note._id} key={key} time={note.createdAt} />
          })}
        </div>
        <Form />
      </div>
    </>
  )
}

export default MainPage