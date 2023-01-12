import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getRoutines, getMyRoutines } from "../../api/activities";
import RoutinesNavBar from "./RoutinesNavBar";
import PublicRoutines from "./PublicRoutines";
import UserRoutines from "./UserRoutines";
import NewRoutine from "./NewRoutine";
import UserProfile from "../UserProfile";
import NotFound from "../NotFound";


const Routines = ({ token, user, activities }) => {
  const [routines, setRoutines] = useState([])
  const [myRoutines, setUserRoutines] = useState([])
  const [userToView, setUserToView] = useState(null)

  useEffect(() => {
    const fetchRoutines = async () => {
      const publicRoutines = await getRoutines()
      console.log("This is routines useEffect user", user)
      const myRoutines = publicRoutines.filter((routine) => {
        if (user && routine.creatorId === user.id) {
          return true
        } else {
          return false
        }
      })
      if (user) {
        setUserRoutines(myRoutines)
        console.log(myRoutines)
      }
      setRoutines(publicRoutines)
      console.log(publicRoutines)
    }
    fetchRoutines()
  }, [token, user])

  return (
    <>
      <RoutinesNavBar token={token} />
      <Routes>
        <Route exact path="/" element={<Navigate to='public' replace />} />
        <Route
          element={<PublicRoutines
            routines={routines}
            user={user}
            token={token}
            activities={activities}
            setUserToView={setUserToView} />}

          path='public' />
        <Route
          element={<UserRoutines
            myRoutines={myRoutines}
            user={user}
            token={token}
            activities={activities}
            setUserToView={setUserToView} />}
          path='user/' />
        <Route
          element={<NewRoutine
            token={token}
            activities={activities}
            user={user} />}
          path='new' />
        <Route
          element={<UserProfile
            token={token}
            routines={routines}
            user={user}
            activities={activities}
            userToView={userToView} />}
          path='/:userId' />
        <Route
          element={<NotFound />}
          path="/*"
        />
      </Routes>
    </>



  );
}

export default Routines;
