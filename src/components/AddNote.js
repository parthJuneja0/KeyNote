import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    const handleChange = (e) => {
        // Must see the change in AddNote component in components tab of developer tools.
        e.preventDefault();
        // We want to update the state of the note object , here e.target.name will be title, description or tag and e.target.value will be the value of the input field.
        setNote({ ...note, [e.target.name]: e.target.value })
        // (...) is spread operator which is used to copy the previous state and adding some changes to it.
        // note will remain same but the value of e.target.name will be changed only.
    }
    // Learn the syntax of spread operator
    return (

        <div className='container my-4'>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="description" autoComplete='' value={note.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" autoComplete='' value={note.tag} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5} >Add</button>
            </form>
        </div>
    )
}

export default AddNote
