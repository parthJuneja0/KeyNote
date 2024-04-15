import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([])

    // Fetching all notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        setNotes(notes.concat(json))
        // Do not use notes.push(note) because it do not returns the updated notes array.
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json();
        console.log(json);

        // Logic to delete in client
        setNotes(notes.filter((note) => { return note._id !== id }))
    }

    // Edit a Note
    const updateNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
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
