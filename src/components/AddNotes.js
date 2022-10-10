import React, {useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";


const AddNotes = () => {
  const context = useContext(noteContext);
  const { addNotes } = context;

  const[notes, setNotes] = useState({title: "", description: "", tag: "default"})
  const handleClick = (e) => {
    e.preventDefault();
     addNotes(notes.title, notes.description, notes.tag);
  }
  const onChange = (e)=>{
       setNotes({...notes, [e.target.name]: e.target.value})
  }
  return (
    
      <div className="container my-3">
        <h2>Add a Note</h2>

        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="test"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
 
  )
}

export default AddNotes
