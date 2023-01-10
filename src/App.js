
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import NavBar from './components/NavBar';
import Routines from './components/routines/Routines';
import { getActivities } from './api/activities';

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const [user, setUser] = useState(null)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities()
      setActivities(data)
    }
    fetchActivities()
  }, [token])

  return (
    <div className="app">
      <Header token={token} setToken={setToken} user={user} setUser={setUser} />
      {!token
        ? <Login token={token} setToken={setToken} user={user} setUser={setUser} />
        : <div className="container">
          <NavBar />
          <Routes>
            <Route
              element={<Home />}
              exact path="/home"
            />
            <Route
              element={<Routines token={token} user={user} activities={activities} />}
              path="/routines/*"
            />
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;
