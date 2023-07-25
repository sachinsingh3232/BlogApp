import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../Context/authContext';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Write = () => {
  const state = useLocation().state
  const [desc, setDesc] = useState(state?.desc || "");
  const [title, seTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file || !desc) {
      alert("title , Image and desc are required");
      return;
    }
    alert("please wait")
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Blog_App");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddv2p9obt/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const value = {
        title: title,
        desc: desc,
        img: url,
        cat: cat,
        date: moment(Date.now()).format("DD-MM-YYYY")
      };

      state ? await axios.put(`${BASE_URL}/posts/${state.id}`, value, { withCredentials: true }) : await axios.post(`${BASE_URL}/posts`, value, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='add'>
      <div className='content'>
        <input type='text' placeholder='Title' value={title} onChange={(e) => seTitle(e.target.value)} />
        <div className='editorContainer'>
          <ReactQuill className='editor' theme="snow" value={desc} onChange={setDesc} />;
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span><b>Status : </b>Draft</span>
          <span><b>Visibility : </b>Public</span>
          <input style={{ display: "none" }} type='file' name='' id='file' onChange={(e) => setFile(e.target.files[0])} />
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className='buttons'>
            <button>Save as Draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type='radio' checked={cat === "art"} name='cat' value='art' id='art' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='art'>ART</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "science"} name='cat' value='science' id='science' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "technology"} name='cat' value='technology' id='technology' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "cinema"} name='cat' value='cinema' id='cinema' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "design"} name='cat' value='design' id='design' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "food"} name='cat' value='food' id='food' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write