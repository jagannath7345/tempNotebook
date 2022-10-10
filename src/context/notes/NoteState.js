import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"

     const notesInitial =  [ ]

       const[notes, setNotes] = useState(notesInitial)

       const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',    
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMmUwZjY5YjZjNzRhN2ZlYzgyZDdkIn0sImlhdCI6MTY2MzIzMjkwOH0.4xYeQRf8CzErcNr_629uK7dBm2c_UXMLPVI110MD7T8"
          }
        }); 
        const json = await response.json() 
        console.log(json);      
         setNotes(json)
       }

       const addNotes = async (title, description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST',    
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMmUwZjY5YjZjNzRhN2ZlYzgyZDdkIn0sImlhdCI6MTY2MzIzMjkwOH0.4xYeQRf8CzErcNr_629uK7dBm2c_UXMLPVI110MD7T8"
          },
            body: JSON.stringify({title, description, tag}) 
        });        

        console.log("Adding a new note")
        const notes =  {
          "_id": "6312cae20fb95b8192d6e4f",
          "user": "631ac37c7bdd2b85ad006034",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-09-09T05:10:58.575Z",
          "__v": 0
        };
            setNotes(notes.concat(notes))
       }

       const deleteNotes = (id)=>{
           console.log("delete using id" + id)
          const newNotes = notes.filter((note)=>{return note._id!==id})
           setNotes(newNotes)

       }
       
       const editNotes = async (id, title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'POST',    
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMmUwZjY5YjZjNzRhN2ZlYzgyZDdkIn0sImlhdCI6MTY2MzIzMjkwOH0.4xYeQRf8CzErcNr_629uK7dBm2c_UXMLPVI110MD7T8"
          },
            body: JSON.stringify({title, description, tag}) 
        });
        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
      }

    return(
        <NoteContext.Provider value={{notes, addNotes,deleteNotes,editNotes, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;