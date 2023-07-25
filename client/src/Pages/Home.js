import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../Context/authContext';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const cat = useLocation().search;
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts${cat}`)
        setPosts(res.data);
      } catch (e) {
        console.log(e)
      }
    };
    fetchData();
  }, [cat])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent;
  }
  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={post.img} alt="" />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {getText(post.desc)}
              <button onClick={() => navigate(`/post/${post.id}`)}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home