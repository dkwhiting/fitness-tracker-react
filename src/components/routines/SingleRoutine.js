

const SingleRoutine = ({ routines }) => {


  return (
    <div className="routines">
      {routines
        ? routines.map((routine) => {
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

export default SingleRoutine;
