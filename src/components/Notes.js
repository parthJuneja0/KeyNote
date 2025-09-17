import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { Edit3, X, Save } from 'lucide-react';

const Notes = () => {
    let navigate = useNavigate();
    const { notes, getNotes, updateNote } = useContext(noteContext);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         getNotes();
    //         // eslint-disable-next-line
    //     }
    //     else {
    //         navigate("/login")
    //     }
    // }, [])

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (currentNote) => {
        setNote(currentNote);
        setIsModalOpen(true);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const editNote = (e) => {
        e.preventDefault();
        updateNote(note._id, note.title, note.description, note.tag);
        setIsModalOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    // Close modal on ESC key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-red-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">

                {/* Custom Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        {/* Modal Backdrop */}
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                                onClick={closeModal}
                            ></div>

                            {/* Modal Content */}
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-red-600 rounded-lg flex items-center justify-center">
                                            <Edit3 className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-red-300 bg-clip-text text-transparent">
                                            Edit Note
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <form className="space-y-4">
                                    {/* Title Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={note.title}
                                            onChange={onChange}
                                            required
                                            className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter note title"
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-200">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc"
                                            name="description"
                                            value={note.description}
                                            onChange={onChange}
                                            required
                                            rows="4"
                                            className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Enter note description"
                                        />
                                    </div>

                                    {/* Tag Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="tag" className="block text-sm font-medium text-gray-200">
                                            Tag
                                        </label>
                                        <input
                                            type="text"
                                            id="tag"
                                            name="tag"
                                            value={note.tag}
                                            onChange={onChange}
                                            className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter tag (optional)"
                                        />
                                    </div>
                                </form>

                                {/* Modal Footer */}
                                <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-white/10">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={editNote}
                                        disabled={note.title.length < 3 || note.description.length < 5}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-red-600 hover:from-slate-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Update Note</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notes List */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-red-300 bg-clip-text text-transparent mb-4">
                            My Notes
                        </h2>
                        {notes.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                                    <Edit3 className="w-12 h-12 text-white" />
                                </div>
                                <p className="text-gray-400 text-lg">No notes to display</p>
                                <p className="text-gray-500 text-sm mt-2">Create your first note to get started</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {notes.map((note) => {
                            return <NoteItem key={note._id} note={note} handleClick={handleClick} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes