const API_URL = process.env.REACT_APP_API_URL

const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getMe = async () => {
  try {
    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TOKEN_STRING_HERE'
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  loginUser,
  registerUser,
  getMe
}