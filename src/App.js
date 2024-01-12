import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register'
import AddDevice from './pages/addDevice'
import EditDevice from './pages/editDevice'
import DeviceDetails from './pages/detailsDevice';
import News from './pages/news';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'), 'tokentoken');
    if (token) {
      axios.post('http://localhost:4444/auth/auth', {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then(response => {
          console.log(response);
          setUser(response.data);
          setLoggedInUser(response.data);
        })
        .catch(error => {
          console.error('Token verification error:', error.message, token);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };

  const handleLogin = (user) => {
    console.log(user, ' :user');
    setLoggedInUser(user);
  }

  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home loggedInUser={!!loggedInUser} onLogout={handleLogout} />} />
      <Route path="/login" element={loggedInUser ? <Navigate to="/" /> : <Login onLogin={(user) => { setLoggedInUser(user); console.log(loggedInUser, ' jaba'); }} />} />
      <Route path="/register" element={loggedInUser ? <Navigate to="/" /> : <Register onRegister={(user) => { setLoggedInUser(user); console.log(loggedInUser); }} />} />
      <Route exact path="/add-device" element={<AddDevice />} />
      <Route exact path="/edit-device/:id" element={<EditDevice />} />
      <Route path="/devices/:id" element={<DeviceDetails loggedInUser={!!loggedInUser} />} />
      <Route path="/news" element={<News />} />
    </Routes>
  </Router>
  );
}

export default App;
