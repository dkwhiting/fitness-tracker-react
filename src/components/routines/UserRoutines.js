import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import EditRoutine from "./EditRoutine";

const UserRoutines = ({ userRoutines, token, activities, user }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)

  const handleEdit = (event) => {

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
        style=""
        contentLabel="Example Modal"
      >

        <button onClick={closeModal}>X</button>
        <EditRoutine token={token} activities={activities} user={user} postToEdit={postToEdit} />

      </Modal>
      {token
        ? userRoutines.length > 0
          ? userRoutines
            .map((routine) => {
              return (<div className="single-routine" key={routine.id}>
                <div className="routine-header">
                  <div className="routine-creator-name">
                    {routine.creatorName}
                  </div>
                  <div className="routine-edit" onClick={() => { openModal(); setPostToEdit(routine) }}>
                    Edit
                  </div>
                </div>
                <div className="routine-name">

                  {routine.name}
                </div>
                <div className="routine-goal">
                  {routine.goal}
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
