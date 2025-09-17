import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Info, LogIn, LogOut, Menu, X, Sparkles } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="relative bg-gradient-to-r from-slate-900 via-gray-900 to-neutral-900 backdrop-blur-lg border-b border-white/10 shadow-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-red-300 bg-clip-text text-transparent">
                                KeyNote
                            </span>
                            <span className="text-xs text-gray-400 -mt-1">{(location.pathname === '/notes' || location.pathname === '/create') ? 'Dashboard' : ''}</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    {(location.pathname === '/notes' || location.pathname === '/create') && (
                        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center max-w-md">

                            {/* My Notes */}
                            <Link
                                to="/notes"
                                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === '/notes'
                                    ? 'bg-white/10 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span
                                    className={`w-5 h-5 transition-colors duration-200 ${location.pathname === '/notes'
                                        ? 'text-red-300'
                                        : 'text-gray-400 group-hover:text-red-300'
                                        }`}
                                >
                                    📑
                                </span>
                                <span>My Notes</span>
                            </Link>

                            {/* Create Note */}
                            <Link
                                to="/create"
                                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === '/create'
                                    ? 'bg-white/10 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span
                                    className={`w-5 h-5 transition-colors duration-200 ${location.pathname === '/create'
                                        ? 'text-red-300'
                                        : 'text-gray-400 group-hover:text-red-300'
                                        }`}
                                >
                                    ✏️
                                </span>
                                <span>Create Note</span>
                            </Link>
                        </div>)}


                    {/* Auth Section & Mobile Menu Button */}
                    {(location.pathname === "/notes" || location.pathname === "/create") && (<div className="flex items-center space-x-3">
                        {/* Desktop Auth */}
                        <div className="hidden md:block relative z-10">
                            {!localStorage.getItem('token') ? (
                                <Link
                                    to="/login"
                                    className="group relative inline-flex items-center space-x-2 overflow-hidden bg-gradient-to-r from-slate-600 to-red-600 hover:from-slate-700 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={handlelogout}
                                    className="group relative inline-flex items-center space-x-2 overflow-hidden bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 relative z-10"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>)}
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    {(location.pathname === "/notes" || location.pathname === "/create") && (<div className="pt-4 pb-6 space-y-3">
                        <Link
                            to="/notes"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === '/notes'
                                ? 'bg-white/10 text-white shadow-lg'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            📑
                            <span>My Notes</span>
                        </Link>

                        <Link
                            to="/create"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === '/create'
                                ? 'bg-white/10 text-white shadow-lg'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            ✏️
                            <span>Create Note</span>
                        </Link>


                        <div className="pt-4 border-t border-white/10">
                            {!localStorage.getItem('token') ? (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-slate-600 to-red-600 hover:from-slate-700 hover:to-red-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        handlelogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>
                    </div>)}
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-4 -right-8 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-8 w-40 h-40 bg-slate-500/5 rounded-full blur-2xl"></div>
            </div>
        </nav>
    )
}

export default Navbar