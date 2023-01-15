const API_URL = process.env.REACT_APP_API_URL
// const API_URL = process.env.REACT_APP_API_URL_DEV

export const getRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getRoutinesByUsername = async (username, token) => {
  if (token) {
    try {
      const response = await fetch(`${API_URL}/users/${username}/routines`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      const response = await fetch(`${API_URL}/users/${username}/routines`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }

  }
}

export const getActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postRoutine = async (token, name, goal, isPublic) => {
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
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateRoutine = async (token, routineId, name, goal, isPublic) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: "PATCH",
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
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postActivityToRoutine = async (token, routineId, activityId, count, duration) => {
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
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${API_URL}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteRoutine = async (token, routineId) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateActivity = async (token, activityId, name, description) => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}