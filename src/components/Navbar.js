import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`navbar-brand nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className="d-flex" role="search">
                                <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                            </form>
                            : <button className="btn btn-primary mx-2" onClick={handlelogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
