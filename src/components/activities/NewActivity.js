import { useState } from "react";
import { postActivity } from "../../api/activities";

const NewActivity = ({ token, activities }) => {
  const [submitMessage, setSubmitMessage] = useState('')
  const [activityName, setActivityName] = useState('')
  const [activityDescription, setActivityDescription] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const newActivity = await postActivity(token, activityName, activityDescription)
      if (newActivity.error) {
        setSubmitMessage(newActivity.message)
      } else {
        setActivityName('')
        setActivityDescription('')
        setSubmitMessage('Activity created!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="new-activity">
      {!token
        ? <h2>Login to create an activity</h2>
        : <><h2>New Activity</h2>
          {submitMessage
            ? <div className="submit-message">
              <h3>{submitMessage}</h3>
            </div>
            : <></>
          }
          <div className="activity-form">

            <form id="create-activity" onSubmit={(event) => submitHandler(event)}>
              <input
                value={activityName}
                placeholder='Name'
                onChange={(event) =>
                  setActivityName(event.target.value)
                }>
              </input>
              <textarea
                value={activityDescription}
                placeholder='Description'
                maxLength="255"
                onChange={(event) => setActivityDescription(event.target.value)}>
              </textarea>


              <button type="submit">Create Activity</button>
            </form>

          </div>


        </>
      }



    </div >
  );
}

export default NewActivity;
