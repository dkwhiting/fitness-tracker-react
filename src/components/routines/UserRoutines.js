import userEvent from "@testing-library/user-event";


const UserRoutines = ({ routines, user }) => {


  return (
    <div className="routines">
      {routines
        ? routines
          .filter((routine) => {
            if (routine.creatorId === user.id) {
              return true
            } else {
              return false
            }
          })
          .map((routine) => {
            return (<div className="single-routine" key={routine.id}>
              <div className="routine-creator-name">
                {routine.creatorName}
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
      }
    </div >
  );
}

export default UserRoutines;
