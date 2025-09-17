import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn as LoginIcon, UserPlus, Eye, EyeOff } from 'lucide-react';

const LogIn = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const json = await response.json();
            if (json.success) {
                console.log(json);
                localStorage.setItem('token', json.authToken);
                navigate('/notes');
            }
            else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (error) setError(""); // Clear error when user starts typing
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 flex items-center justify-center px-4 py-8">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-red-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <LoginIcon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-red-300 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChange}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                We'll never share your email with anyone else.
                            </p>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                    className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-600 to-red-600 hover:from-slate-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <LoginIcon className="w-5 h-5" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-gray-400">Don't have an account?</span>
                            </div>
                        </div>

                        <Link
                            to="/signup"
                            className="mt-4 w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 group"
                        >
                            <UserPlus className="w-5 h-5 text-red-300 group-hover:text-red-200 transition-colors duration-200" />
                            <span>Create New Account</span>
                        </Link>
                    </div>
                </div>

                {/* Additional Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-slate-400/10 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-400/10 rounded-full blur-sm"></div>
            </div>
        </div>
    )
}

export default LogIn