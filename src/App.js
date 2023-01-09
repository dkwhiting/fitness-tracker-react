
import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login'
import Header from './components/Header'

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [token])

  return (
    <div className="app">
      <Header token={token} setToken={setToken} user={user} setUser={setUser} />
      {!token
        ? <Login token={token} setToken={setToken} user={user} setUser={setUser} />
        : 'logged in!'
      }
    </div>
  );
}

export default App;
