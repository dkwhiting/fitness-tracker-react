import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";


const Login = ({ user, setUser, token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()


  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      let data
      if (login === 'login') {
        data = await loginUser(username, password)
      } else if (login === 'register') {
        data = await registerUser(username, password)
      }

      if (!data.token) {
        setLoginError(data.message)
      } else {
        setToken(data.token)
        localStorage.setItem('token', (data.token))
        setUsername('')
        setPassword('')
        navigate('/home')
      }

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="login">
      <h2>Please Login or Register</h2>
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
