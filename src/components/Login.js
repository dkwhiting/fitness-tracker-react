import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";


const Login = ({ user, setUser, token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      if (login === 'login') {

        const data = await loginUser(username, password)
        console.log(data)
        if (!data.token) {
          setLoginError(data.message)
        } else {
          setToken(data.token)
          localStorage.setItem('token', (data.token))
          setUsername('')
          setPassword('')
        }
      }
      if (login === 'register') {
        const data = await registerUser(username, password)
        console.log(data)
        if (!data.token) {
          setLoginError(data.message)
        } else {
          setToken(data.token)
          localStorage.setItem('token', JSON.stringify(data.token))
          setUsername('')
          setPassword('')
        }
      }
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="login">
      <form onSubmit={(event) => submitHandler(event)}>
        {loginError
          ? loginError
          : <></>
        }
        <input value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)}></input>
        <input value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
        <button type="submit" onClick={() => setLogin('login')}>Log In</button>
        <p>or</p>
        <button type="submit" onClick={() => setLogin('register')}>Register</button>
      </form>
    </div>
  );
}

export default Login;
