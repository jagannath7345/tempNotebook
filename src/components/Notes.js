import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext";
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,getNotes} = context;
    useEffect(() => {
      getNotes()
    }, [])
  return (
    <>
    <AddNotes />
    <div className="row my-4">
       <h1>Your Notes</h1>
       {notes.map((notes)=>{
        return <NoteItem key={notes._id} notes={notes} />
       })}
      </div>
      </>
  )
}

export default Notes
