// const API_URL = process.env.REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL_DEV

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

const getMe = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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