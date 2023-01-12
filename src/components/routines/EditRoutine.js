import { useState } from "react"
import { updateRoutine, postActivityToRoutine } from '../../api/activities'


const EditRoutine = ({ token, user, activities, currentActivities, postToEdit }) => {
  const [activity, setActivity] = useState('')
  const [routineName, setRoutineName] = useState(postToEdit.name)
  const [routineGoal, setRoutineGoal] = useState(postToEdit.goal)
  const [isPublic, setIsPublic] = useState(true)
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const [activitiesToDelete, setActivitiesToDelete] = useState([])
  const [activitiesToAdd, setActivitiesToAdd] = useState([])
  const [activitiesToDisplay, setActivitiesToDisplay] = useState(currentActivities)
  const [newRoutine, setNewRoutine] = useState([])

  const sortedActivities =
    activities
      .sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        } else {
          return 1
        }
      })

  const submitRoutineHandler = async (event) => {
    event.preventDefault()

    try {
      const editedRoutine = await updateRoutine(
        token,
        postToEdit.id,
        routineName,
        routineGoal,
        isPublic)

      if (editedRoutine.name != routineName) {
        setSubmitMessage(editedRoutine.message)
      } else {
        try {
          activitiesToAdd.map(async (activity) => {
            const postedActivityToRoutine = await postActivityToRoutine(
              token,
              editedRoutine.id,
              activity.id,
              activity.count,
              activity.duration)
            console.log(postedActivityToRoutine)
          })
          setActivitiesToAdd([])
          setRoutineName('')
          setRoutineGoal('')
        } catch (error) {
          console.error(error)
        }
        setSubmitMessage('Routine Created!')
      }


    } catch (error) {
      console.error(error)
    }
  }

  const submitActivityHandler = (event) => {
    event.preventDefault()
    if (!activity || !count || !duration) {
      setSubmitMessage('Activity must have name, count, and duration')
    } else {
      const activitiesList = [...activitiesToAdd]
      const filteredActivity = activities.filter((act) => {
        if (act.name === activity) {
          return true
        }
      })
      const newActivity = {}
      newActivity.id = filteredActivity[0].id
      newActivity.name = activity
      newActivity.count = count
      newActivity.duration = duration
      activitiesList.push(newActivity)
      setActivitiesToAdd(activitiesList)
      setActivity('')
      setCount('')
      setDuration('')
      setSubmitMessage('')
      console.log(activitiesToAdd)
    }
  }

  const removeActivityHandler = (index) => {
    const activitiesList = [...activitiesToAdd]
    activitiesList.splice(index, 1)
    setActivitiesToAdd(activitiesList)
    console.log(activitiesList)
  }

  const deleteActivityHandler = async () => {

  }

  return (
    <div className="new-routine">
      {!token
        ? <h2>Must be logged in to edit routine</h2>
        : <>
          {submitMessage
            ? <div className="submit-message">
              <h3>{submitMessage}</h3>
            </div>
            : <></>
          }
          <div className="routine-forms">

            <form id="create-routine" onSubmit={(event) => submitRoutineHandler(event)}>
              <input
                value={routineName}
                placeholder='Name'
                onChange={(event) =>
                  setRoutineName(event.target.value)
                }>
              </input>
              <textarea
                value={routineGoal}
                placeholder='Goal'
                maxLength="255"
                onChange={(event) => setRoutineGoal(event.target.value)}>
              </textarea>
              <label>Private Routine
                <input
                  value={isPublic}
                  className="public"
                  type="checkbox"
                  onChange={() => setIsPublic(!isPublic)}>
                </input>
              </label>

            </form>
            <form
              id="add-activity"
              onSubmit={(event) => submitActivityHandler(event)}>

              <select
                value={activity}
                onChange={(event) => setActivity(event.target.value)}>
                <option>Select Activity...</option>
                {
                  sortedActivities.map((activity, index) => {
                    return <option key={index}>{activity.name}</option>
                  })
                }
              </select>

              <div className='new-routine-inputs'>
                <div className='input-div'>
                  <label>Count
                    <input
                      value={count}
                      type="text"
                      className='count'
                      onChange={(event) => setCount(event.target.value)}>
                    </input>
                  </label>
                </div>

                <div className='input-div'>
                  <label>Duration
                    <input
                      value={duration}
                      type="text"
                      className='duration'
                      onChange={(event) => setDuration(event.target.value)}>
                    </input>
                  </label>
                </div>
              </div>
              <button type="submit" form="add-activity">Add Activity</button>
            </form>
          </div>

          <button type="submit" form="create-routine">Submit</button>
          <div className="routine-activities">


            {currentActivities
              ? currentActivities.map((activity, index) => {
                return (
                  <div className="activity-to-add" key={index}>
                    <div className="left">
                      {activity.name} - Count: {activity.count} x Duration: {activity.duration}
                    </div>
                    <div className="remove-button">
                      <button onClick={() => deleteActivityHandler(index)}>X</button>
                    </div>
                  </div>
                )
              })
              : <>Oh no</>
            }

            {activitiesToAdd.map((activity, index) => {
              return (
                <div className="activity-to-add" key={index}>
                  <div className="left">
                    {activity.name} - Count: {activity.count} x Duration: {activity.duration}
                  </div>
                  <div className="remove-button">
                    <button onClick={() => removeActivityHandler(index)}>X</button>
                  </div>
                </div>
              )
            })
            }
          </div>
        </>
      }



    </div >
  );
}

export default EditRoutine;
