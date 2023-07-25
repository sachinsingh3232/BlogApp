import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Menu = ({ cat, id }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/posts/?cat=${cat}`)
                // setPosts(res.data);
                setPosts(res.data.filter((post) => post.id !== id));
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [cat])
    return (
        <div className='menu'>
            <h1>Other Posts You may Like</h1>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                    <img src={post.img} alt="" />
                    <h2>{post.title}</h2>
                    <button onClick={() => navigate(`/post/${post.id}`)}>Read More</button>
                </div>
            ))}
        </div>
    )
}

export default Menu