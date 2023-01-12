import { useState } from "react"
import { postRoutine, postActivityToRoutine } from '../../api/activities'


const NewRoutine = ({ token, user, activities }) => {
  const [activity, setActivity] = useState('')
  const [routineName, setRoutineName] = useState('')
  const [routineGoal, setRoutineGoal] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const [activitiesToAdd, setActivitiesToAdd] = useState([])
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
      const postedRoutine = await postRoutine(
        token,
        routineName,
        routineGoal,
        isPublic)

      if (postedRoutine.name != routineName) {
        setSubmitMessage(postedRoutine.message)
      } else {
        try {
          activitiesToAdd.map(async (activity) => {
            const postedActivityToRoutine = await postActivityToRoutine(
              token,
              postedRoutine.id,
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
    }
  }

  return (
    <div className="new-routine">
      {!token
        ? <h2>Login to create a routine</h2>
        : <><h2>New Routine</h2>
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

          <button type="submit" form="create-routine">Create Routine</button>
          <div className="routine-activities">
            {activitiesToAdd.length > 0
              ? activitiesToAdd.map((activity, index) => {
                return (
                  <div key={index}>
                    {activity.name} - Count: {activity.count} x Duration: {activity.duration}
                  </div>
                )
              })
              : "Add some activities to this routine!"
            }
          </div>
        </>
      }



    </div >
  );
}

export default NewRoutine;
