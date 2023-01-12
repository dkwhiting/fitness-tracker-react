import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import EditRoutine from "./EditRoutine";
Modal.setAppElement('#root');

const PublicRoutines = ({ routines, token, activities, user, setUserToView }) => {
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

  const afterOpenModal = () => {

  }

  const closeModal = () => {
    setShowEdit(false)
  }




  return (
    <div className="routines">
      <Modal
        isOpen={showEdit}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: '542px',
          }
        }}
      >

        <button onClick={closeModal}>X</button>
        <EditRoutine token={token} activities={activities} user={user} postToEdit={postToEdit} currentActivities={currentActivities} />

      </Modal>
      {routines
        ? routines.map((routine) => {
          return (<div className="single-routine" key={routine.id}>
            {routine.creatorId === user.id
              ? <div className="routine-edit" onClick={() => { openModal(); setPostToEdit(routine); handleEdit(routine.activities) }}>
                Edit
              </div>
              : <></>
            }

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
              {routine.activities.length < 1
                ? <ul><li>None</li></ul>
                :
                routine.activities.map((routine, index) => {

                  return (
                    <ol>
                      <div className="nested-single-routine-activity">
                        <li>{routine.name}</li>
                        <ul>
                          <li>{routine.description}</li>
                          <li>Count: {routine.count} x Duration: {routine.duration}</li>
                        </ul>
                      </div>
                    </ol>
                  )
                })

              }

            </div>
          </div>
          )
        })
        : <h2>You have no routines!</h2>
      }
    </div >
  );
}

export default PublicRoutines;
