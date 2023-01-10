import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { getRoutines } from "../../api/activities";
import RoutinesNavBar from "./RoutinesNavBar";
import SingleRoutine from "./SingleRoutine";
import NewRoutine from "./NewRoutine";


const Routines = ({ token, user, activities }) => {
  const [routines, setRoutines] = useState([])
  const [userRoutines, setUserRoutines] = useState([])



  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getRoutines()
      setRoutines(data)
      setUserRoutines(
        data.filter((routine) => {
          if (routine.creatorId === user.id) {
            return true
          }
          return false
        })
      )
    }
    fetchRoutines()
  }, [token])

  return (
    <>
      <RoutinesNavBar />
      <Routes>
        <Route exact path="/" element={<Navigate to='public' replace />} />
        <Route element={<SingleRoutine routines={routines} />} path='public' />
        <Route element={<SingleRoutine userRoutines={userRoutines} />} path='user' />
        <Route element={<NewRoutine activities={activities} />} path='new' />
      </Routes>
    </>



  );
}

export default Routines;
