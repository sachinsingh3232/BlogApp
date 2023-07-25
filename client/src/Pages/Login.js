import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext';

const Login = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!password || !username) {
            alert('all fields are mandatory');
            return;
        }
        alert('Checking credentials')
        const inputs = {
            username: username,
            password: password
        }
        try {
            await login(inputs);
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data)
        }
    }
    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input type='text' placeholder='userName' value={username} name='username' onChange={(e) => setUsername(e.target.value.toLowerCase())} />
                <input type='password' placeholder='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={submitHandler}>Login</button>
                {error && <p>{error} !</p>}
                <span>Don't have an account ? <Link to='/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default Login