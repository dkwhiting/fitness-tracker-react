import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getRoutines, getMyRoutines } from "../../api/activities";
import RoutinesNavBar from "./RoutinesNavBar";
import PublicRoutines from "./PublicRoutines";
import UserRoutines from "./UserRoutines";
import NewRoutine from "./NewRoutine";


const Routines = ({ token, user, activities }) => {
  const [routines, setRoutines] = useState([])
  const [userRoutines, setUserRoutines] = useState([])



  useEffect(() => {
    const fetchRoutines = async () => {
      const publicRoutines = await getRoutines()
      const userRoutines = publicRoutines.filter((routine) => {
        if (routine.creatorId === user.id) {
          return true
        } else {
          return false
        }
      })
      setRoutines(publicRoutines)
      setUserRoutines(userRoutines)
    }
    fetchRoutines()
  }, [token, user])

  return (
    <>
      <RoutinesNavBar />
      <Routes>
        <Route exact path="/" element={<Navigate to='public' replace />} />
        <Route element={<PublicRoutines routines={routines} />} path='public' />
        <Route element={<UserRoutines userRoutines={userRoutines} user={user} />} path='user/' />
        <Route element={<NewRoutine token={token} activities={activities} user={user} />} path='new' />
      </Routes>
    </>



  );
}

export default Routines;
