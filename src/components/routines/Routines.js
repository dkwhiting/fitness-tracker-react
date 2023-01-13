import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getRoutines } from "../../api/activities";
import RoutinesNavBar from "./RoutinesNavBar";
import PublicRoutines from "./PublicRoutines";
import NewRoutine from "./NewRoutine";
import UserRoutines from "./UserRoutines";
import NotFound from "../NotFound";


const Routines = ({ token, user, activities, updater, setUpdater }) => {
  const [routines, setRoutines] = useState([])
  const [myRoutines, setUserRoutines] = useState([])
  const [userToView, setUserToView] = useState(null)

  useEffect(() => {
    const fetchRoutines = async () => {
      const publicRoutines = await getRoutines()
      const myRoutines = publicRoutines.filter((routine) => {
        if (user && routine.creatorId === user.id) {
          return true
        } else {
          return false
        }
      })
      if (user) {
        setUserRoutines(myRoutines)
      }
      setRoutines(publicRoutines)
    }
    fetchRoutines()
  }, [token, user, updater])



  return (
    <>
      <RoutinesNavBar token={token} user={user} setUserToView={setUserToView} />
      <Routes>
        <Route exact path="/" element={<Navigate to='public' replace />} />
        <Route
          element={<PublicRoutines
            routines={routines}
            user={user}
            token={token}
            activities={activities}
            setUserToView={setUserToView}
            updater={updater}
            setUpdater={setUpdater}

          />}

          path='public' />
        <Route
          element={<NewRoutine
            token={token}
            activities={activities}
            user={user}
            updater={updater}
            setUpdater={setUpdater}

          />}
          path='new'
        />
        <Route
          element={<UserRoutines
            token={token}
            routines={routines}
            user={user}
            activities={activities}
            userToView={userToView}
            updater={updater}
            setUpdater={setUpdater}
          />}
          path='/:username'
        />
        <Route
          element={<NotFound />}
          path="/*"
        />
      </Routes>
    </>



  );
}

export default Routines;
