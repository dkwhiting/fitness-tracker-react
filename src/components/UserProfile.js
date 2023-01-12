import { useParams } from "react-router-dom"
import { useState } from "react";
import Modal from "react-modal";
import EditRoutine from "./routines/EditRoutine";
Modal.setAppElement('#root');



const UserProfile = ({ token, user, activities, routines }) => {


  const [showEdit, setShowEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)
  const [currentActivities, setCurrentActivities] = useState([])

  const { userId } = useParams()

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


  console.log(routines)

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
        ? routines.filter((routine) => {
          if (routine.creatorId == userId) {
            return true
          } else {
            return false
          }
        })
          .map((routine, index) => {
            return (<div className="single-routine" key={index}>
              {routine.creatorId === userId
                ? <div className="routine-edit" onClick={() => { openModal(); setPostToEdit(routine); handleEdit(routine.activities) }}>
                  Edit
                </div>
                : <></>
              }

              <div className="routine-name">
                {routine.name}
              </div>
              <div className="routine-creator-name">
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
                      <ol key={index}>
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
        : userId === user.id
          ? <h2>You have no routines!</h2>
          : <h2>This user has no routines!</h2>
      }
    </div >
  );

}

export default UserProfile