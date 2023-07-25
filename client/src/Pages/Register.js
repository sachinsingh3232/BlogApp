import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Register = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate()
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!email || !password || !username){
            alert('all fields are mandatory');
            return ;
        }
        alert('Checking credentials')
        const inputs = {
            username: username,
            email: email,
            password: password
        }
        try {
            await axios.post(`${BASE_URL}/auth/register`, inputs);
            Navigate('/login');
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data)
        }
    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input type='text' placeholder='userName' value={username} name='username' onChange={(e) => setUsername(e.target.value.toLowerCase())} />
                <input type='email' placeholder='email' value={email} name='email' onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                <input type='password' placeholder='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={submitHandler}>Register</button>
                {error && <p>{error} !</p>}
                <span>Already have an account ! <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Register