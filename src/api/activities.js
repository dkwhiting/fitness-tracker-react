// const API_URL = process.env.REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL_DEV

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

const postRoutine = async (token, creatorId, name, goal, isPublic) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
    })
    const data = await response.json()
    console.log('THIS IS DATA', data)
    return data
  } catch (error) {
    console.error(error)
  }
}
const postActivityToRoutine = async (token, routineId, activityId, count, duration) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        activityId,
        count,
        duration
      })
    })
    const data = await response.json()
    console.log('THIS IS DATA', data)
    return data
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getRoutines,
  getActivities,
  postRoutine,
  postActivityToRoutine
}