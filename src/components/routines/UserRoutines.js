import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Modal from "react-modal";
import EditRoutine from "./EditRoutine";
import { deleteRoutine, getRoutinesByUsername } from "../../api/activities"
Modal.setAppElement('#root');



const UserProfile = ({ token, user, activities, routines, userToView, updater, setUpdater }) => {


  const [showEdit, setShowEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)
  const [currentActivities, setCurrentActivities] = useState([])
  const [userRoutines, setUserRoutines] = useState([])

  const { username } = useParams()

  useEffect(() => {
    const auth = token ? token : null
    const getUserRoutines = async () => {
      const routines = await getRoutinesByUsername(username, auth)
      setUserRoutines(routines)
    }

    getUserRoutines()
  }, [userToView])

  const handleEdit = (localActivities) => {
    const newArr = []
    if (localActivities) {
      localActivities.map((activity) => {
        newArr.push(activity)
      })
      setCurrentActivities(newArr)
    }
  }

  const deleteRoutineHandler = async (routineId) => {
    try {
      const deletedRoutine = await deleteRoutine(token, routineId)
      setUpdater(!updater)
    } catch (error) {
      console.error(error)
    }
  }

  const openModal = () => {
    setShowEdit(true)
  }


  const closeModal = () => {
    setShowEdit(false)
    setUpdater(!updater)
  }

  return (
    <div className="routines">
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
            width: '550px',
            left: '0',
            position: 'relative',
            flex: '0 0 auto',
          }
        }}
      >

        <button onClick={closeModal} style={{ width: '30px' }}>X</button>
        <EditRoutine
          token={token}
          activities={activities}
          user={user}
          postToEdit={postToEdit}
          currentActivities={currentActivities}
          updater={updater}
          setUpdater={setUpdater}
          setShowEdit={setShowEdit}
        />

      </Modal>
      <h2>
        {user && username && user.username === username ? 'Your Routines' : `${username}'s Routines`}
      </h2>
      {userRoutines
        ? userRoutines
          .map((routine, index) => {
            return (<div className="single-routine" key={index}>
              {user && routine.creatorId === user.id
                ? <>
                  <div className="routine-edit" onClick={() => { openModal(); setPostToEdit(routine); handleEdit(routine.activities) }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <div className="routine-delete" onClick={() => { deleteRoutineHandler(routine.id) }}>
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </>
                : <></>
              }

              <div className="routine-name">
                {routine.name}<p>{routine.isPublic ? 'public' : 'private'}</p>
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
        : username === user.username
          ? <h2>You have no routines!</h2>
          : <h2>This user has no routines!</h2>
      }
    </div >
  );

}

export default UserProfile