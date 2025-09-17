import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const [notes, setNotes] = useState([{
        "title": "Sample Note",
        "description": "This is a sample note description.",
        "tag": "general",
        "_id": "64b8f0f4f1d2c3a5b6e7f890",
        "user": "64b8f0a2f1d2c3a5b6e7f88f",
        "date": "2023-07-20T12:34:56.789Z",
        "__v": 0
    }])

    // Fetching all notes
    const getNotes = async () => {
        const response = await fetch(`/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        // console.log(json);
        setNotes(json)
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        setNotes(notes.concat(json))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json();
        console.log(json);

        setNotes(notes.filter((note) => { return note._id !== id }))
    }

    // Edit a Note
    const updateNote = async (id, title, description, tag) => {
        const response = await fetch(`/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json();
        console.log(json);

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            if (note._id === id) {
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;
                break;
            }
        }
        setNotes(JSON.parse(JSON.stringify(notes)))
    }

    return (
        <>
            <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
                {props.children}
            </NoteContext.Provider>
        </>
    )
}

export default NoteState;
