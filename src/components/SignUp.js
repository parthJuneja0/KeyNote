import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/userjoin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            console.log(localStorage.getItem('token'));
            navigate('/');
        }
        else {
            alert('Bhaaiiii, kuch toh gadbad hai');
        }
    }

    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5'>
            <h2 className='my-4'>SignUp Form</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
                </div>
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
                <Link to="/login"> Click to login</Link>
            </div>
        </div>
    )
}

export default SignUp
