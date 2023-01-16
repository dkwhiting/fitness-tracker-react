
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import NavBar from './components/NavBar';
import Routines from './components/routines/Routines';
import { getActivities } from './api/activities';
import { getMe } from './api/auth';
import Activities from './components/activities/Activities';
import NotFound from './components/NotFound';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [activities, setActivities] = useState([])
  const [updater, setUpdater] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const data = await getMe(token)
      setUser(data)
    }

    const fetchActivities = async () => {
      const data = await getActivities()
      setActivities(data)
    }

    if (token) {
      getUser()
    }

    fetchActivities()

  }, [token, updater])

  return (
    <div className="app">
      <Header
        token={token}
        setToken={setToken}
        user={user}
        setUser={setUser}
      />
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            exact path="/"
            element={
              <Navigate
                to='home'
                replace
              />}
          />
          <Route
            element={
              <Login
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />}
            exact path="/login"
          />
          <Route
            element={token
              ? <Home />
              : <Navigate to='/login' replace
              />}

            exact path="/home"
          />
          <Route
            element={
              <Routines
                token={token}
                user={user}
                activities={activities}
                updater={updater}
                setUpdater={setUpdater}
              />}
            path="/routines/*"
          />
          <Route
            element={<Activities
              token={token}
              user={user}
              activities={activities}
              updater={updater}
              setUpdater={setUpdater}
            />}
            path="/activities/*"
          />
          <Route
            element={
              <NotFound
              />}
            path="/*"
          />
        </Routes>
      </div>

    </div>
  );
}

export default App;
