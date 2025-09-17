import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { Edit3, Trash2, Tag, Calendar } from 'lucide-react';

const NoteItem = (props) => {
    const { note, handleClick } = props;
    const { deleteNote } = useContext(noteContext);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNote(note._id);
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="group">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/15 p-6 h-full flex flex-col">
                {/* Note Header */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1 mr-2">
                        {note.title}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => handleClick(note)}
                            className="p-2 bg-slate-600/50 hover:bg-slate-600 rounded-lg text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
                            title="Edit note"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-red-300 hover:text-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete note"
                        >
                            {isDeleting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Note Content */}
                <div className="flex-1 mb-4">
                    <p className="text-gray-300 text-sm line-clamp-4 leading-relaxed">
                        {note.description}
                    </p>
                </div>

                {/* Note Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {/* Tag */}
                    <div className="flex items-center space-x-2">
                        {note.tag && (
                            <div className="flex items-center space-x-1 bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-xs">
                                <Tag className="w-3 h-3" />
                                <span>{note.tag}</span>
                            </div>
                        )}
                        {!note.tag && (
                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                <Tag className="w-3 h-3" />
                                <span>No tag</span>
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>
                            {note.date ? formatDate(note.date) : 'No date'}
                        </span>
                    </div>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </div>
    )
}

export default NoteItem;