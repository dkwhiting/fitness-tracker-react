import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import EditRoutine from "./EditRoutine";
Modal.setAppElement('#root');

const UserRoutines = ({ myRoutines, token, activities, user, setUserToView }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)
  const [currentActivities, setCurrentActivities] = useState([])
  const navigate = useNavigate()

  const handleEdit = (localActivities) => {
    console.log('This is localActivities', localActivities)
    const newArr = []
    if (localActivities) {
      localActivities.map((activity) => {
        newArr.push(activity)
      })
      console.log('this is newArr', newArr)
      setCurrentActivities(newArr)
      console.log('This is currentActivities', currentActivities)
    }
  }


  const openModal = () => {
    setShowEdit(true)
  }

  const closeModal = () => {
    setShowEdit(false)
  }

  return (
    <div className="routines">
      <Modal
        isOpen={showEdit}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: '542px',
          }
        }}
      >
        <div className="modal-header">
          <h2>Edit Routine</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <EditRoutine token={token} activities={activities} user={user} postToEdit={postToEdit} currentActivities={currentActivities} />

      </Modal>
      {
        token
          ? myRoutines.length > 0
            ? myRoutines
              .map((routine) => {

                return (<div className="single-routine" key={routine.id}>

                  <div className="routine-edit" onClick={() => { openModal(); setPostToEdit(routine); handleEdit(routine.activities) }}>
                    Edit
                  </div>

                  <div className="routine-name">

                    {routine.name}
                  </div>
                  <div className="routine-creator-name" onClick={() => { navigate(`/routines/${routine.creatorId}`); setUserToView(routine.creatorName) }}>
                    by {routine.creatorName}
                  </div>
                  <div className="routine-goal">
                    {routine.goal}
                  </div>
                  <div className="nested-routine-activities">
                    <p>Activities:</p>
                    <ol className="routine-activities-list">
                      {routine.activities.map((routine, index) => {
                        return (
                          <div className="nested-single-routine-activity" key={index}>
                            <li>{routine.name}</li>
                            <ul>
                              <li>{routine.description}</li>
                              <li>Count: {routine.count} x Duration: {routine.duration}</li>
                            </ul>
                          </div>
                        )
                      })}
                    </ol>
                  </div>
                </div>
                )
              })
            : <h2>You have no routines!</h2>
          : <h2>Must be logged in to view user routines!</h2>
      }
    </div >
  );
}

export default UserRoutines;
