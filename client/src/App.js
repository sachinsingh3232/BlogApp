import { Route, Routes } from 'react-router-dom';
import './style.scss';
import Home from './Pages/Home';
import Layout from './components/Layout';
import Write from './Pages/Write';
import Login from './Pages/Login';
import Single from './Pages/Single';
import Register from './Pages/Register';
 
function App() {
  return (
    <div className="app">
      <div className='container'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="write" element={<Write />} />
            <Route path="post/:id" element={<Single />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
