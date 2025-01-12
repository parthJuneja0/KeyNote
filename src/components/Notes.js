import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    let navigate = useNavigate();
    const { notes, getNotes, updateNote } = useContext(noteContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        }
        else {
            navigate("/login")
        }
    }, [])

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (currentNote) => {
        setNote(currentNote)
        ref.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const editNote = (e) => {
        e.preventDefault();
        updateNote(note._id, note.title, note.description, note.tag);
        refClose.current.click();
    }



    const ref = useRef(null)
    const refClose = useRef(null)

    return (
        <>
            <AddNote />

            {/* Modal Launch button */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="desc" name="description" autoComplete='' value={note.description} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" autoComplete='' value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={editNote} disabled={note.title.length < 3 || note.description.length < 5} >Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3 row container">
                <div className="container">
                    <h2>Your Notes</h2>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} handleClick={handleClick} />
                })}
            </div>
        </>
    )
}

export default Notes;
