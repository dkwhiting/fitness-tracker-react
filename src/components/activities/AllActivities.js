import { useState } from "react";
import { updateActivity } from "../../api/activities";
import Modal from "react-modal";
Modal.setAppElement('#root');

const AllActivities = ({ activities, token, updater, setUpdater }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)
  const [submitMessage, setSubmitMessage] = useState('')
  const [activityName, setActivityName] = useState('')
  const [activityDescription, setActivityDescription] = useState('')

  const openModal = () => {
    setShowEdit(true)
  }


  const closeModal = () => {
    setShowEdit(false)
    setUpdater(!updater)
  }

  const editHandler = (activity) => {
    openModal()
    setPostToEdit(activity)
    setActivityName(activity.name)
    setActivityDescription(activity.description)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const editedActivity = await updateActivity(token, postToEdit.id, activityName, activityDescription)

      setActivityName('')
      setActivityDescription('')
      setSubmitMessage('')
      setShowEdit(false)
      setUpdater(!updater)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="activities">

      <Modal
        isOpen={showEdit}
        onRequestClose={closeModal}
        style={{
          overlay: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0',
            padding: '0'
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '300px',
            left: '0',
            position: 'relative',
            flex: '0 0 auto',
          }
        }}
      >

        <div className="edit-activity">
          <div className="edit-activity-header">

            <h3>Edit Activity</h3>
            <button onClick={closeModal} style={{ width: '30px' }}>X</button>
          </div>
          <form id="create-activity" onSubmit={(event) => submitHandler(event)}>
            <div className="edit-buttons">
            </div>
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


            <button type="submit">Submit</button>
          </form>
        </div>

      </Modal>

      {!activities
        ? <h2>There are no activities!</h2>
        : activities.map((activity, index) => {
          return (
            <div className="single-activity" key={index}>
              <div className="activity-body">
                <div className="activity-name">
                  Name:
                  <ul>
                    <li>
                      {activity.name}
                    </li>
                  </ul>
                </div>
                <div className="activity-description">
                  Description:
                  <ul>
                    <li>
                      {activity.description}
                    </li>
                  </ul>
                </div>
              </div>
              {token
                ? <div className="activity-edit" onClick={() => editHandler(activity)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                : <></>
              }

            </div>
          )
        })
      }
    </div>
  );
}

export default AllActivities;
