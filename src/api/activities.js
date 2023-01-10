const API_URL = process.env.REACT_APP_API_URL

const getRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const getActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getRoutines,
  getActivities
}