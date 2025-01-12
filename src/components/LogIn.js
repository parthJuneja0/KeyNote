import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const LogIn = () => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            navigate('/');
        }
        else {
            console.log("Invalid Credentials");
        }
        // navigate(-1); can be used as an alternative to usehistory hook to go back to the previous page
    }

    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5'>
            <h2 className='my-4'>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='my-4'>
                <Link to="/signup">Create new account</Link>
            </div>
        </div>
    )
}

export default LogIn
