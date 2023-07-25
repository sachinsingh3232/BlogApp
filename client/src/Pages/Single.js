import React, { useContext, useEffect, useState } from 'react'
import Delete from '../img/delete.png'
import Edit from '../img/edit.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SIngle = () => {
  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState({});
  const navigate = useNavigate()
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/${postId}`)
        setPost(res.data);
      } catch (e) {
        console.log(e)
      }
    };
    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent;
  }
  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt='' />
        <div className='user'>
          <img src={post.userImg ? post.userImg : 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png'} alt='' />
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted on {post.date}</p>
          </div>
          {post.username === currentUser?.username && <div className='edit'>
            <Link to={`/write/?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} id={post.id} />
    </div>
  )
}

export default SIngle