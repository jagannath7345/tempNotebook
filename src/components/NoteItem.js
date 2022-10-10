import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { deleteNotes } = context;
  const { notes } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text"> {notes.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{ deleteNotes(notes._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
