import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext';

const Navbar = () => {
    const { logOut, currentUser } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className='container'>
                <Link className='link' to='/'>
                    <div className='logo'>Blog</div>
                </Link>
                <div className='links'>
                    <Link className='link' to='/?cat=art'><h6>ART</h6></Link>
                    <Link className='link' to='/?cat=science'><h6>SCIENCE</h6></Link>
                    <Link className='link' to='/?cat=technology'><h6>TECHNOLOGY</h6></Link>
                    <Link className='link' to='/?cat=cinema'><h6>CINEMA</h6></Link>
                    <Link className='link' to='/?cat=design'><h6>DESIGN</h6></Link>
                    <Link className='link' to='/?cat=food'><h6>FOOD</h6></Link>
                    <span style={{ color: "red" }}>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logOut}>LogOut</span> : <Link className='link' to='/login'><b>Login</b></Link>}
                    <span className='write'>
                        <Link to='/write' className='link'>Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar