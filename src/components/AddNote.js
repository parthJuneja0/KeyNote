import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { Plus, FileText, Tag } from 'lucide-react';

const AddNote = () => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
        } catch (error) {
            // Handle error if needed
            console.error('Error adding note:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-red-300 bg-clip-text text-transparent mb-2">
                        Add a Note
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Create a new note to organize your thoughts
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                    <form className="space-y-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                                Title
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={note.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter note title"
                                />
                            </div>
                            <p className="text-xs text-gray-400">
                                At least 3 characters required
                            </p>
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
                                onChange={handleChange}
                                required
                                rows="5"
                                className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 resize-none"
                                placeholder="Describe your note in detail..."
                            />
                            <p className="text-xs text-gray-400">
                                At least 5 characters required
                            </p>
                        </div>

                        {/* Tag Field */}
                        <div className="space-y-2">
                            <label htmlFor="tag" className="block text-sm font-medium text-gray-200">
                                Tag
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Tag className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    value={note.tag}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Add a tag (optional)"
                                />
                            </div>
                            <p className="text-xs text-gray-400">
                                Optional - helps organize your notes
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                onClick={handleClick}
                                disabled={note.title.length < 3 || note.description.length < 5 || isSubmitting}
                                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-600 to-red-600 hover:from-slate-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Adding Note...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        <span>Add Note</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Form Status */}
                        <div className="text-center">
                            {note.title.length > 0 && note.title.length < 3 && (
                                <p className="text-red-400 text-sm">Title needs at least 3 characters</p>
                            )}
                            {note.description.length > 0 && note.description.length < 5 && (
                                <p className="text-red-400 text-sm">Description needs at least 5 characters</p>
                            )}
                            {note.title.length >= 3 && note.description.length >= 5 && (
                                <p className="text-green-400 text-sm">Ready to add your note!</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote