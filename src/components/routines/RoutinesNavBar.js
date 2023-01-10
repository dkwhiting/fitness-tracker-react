import { NavLink } from 'react-router-dom'

const RoutinesNavBar = () => {

  return (
    <div className="routine-navbar">
      <NavLink
        to="/routines/public"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Public Routines</button>
      </NavLink>
      <NavLink
        to="/routines/user"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Your Routines</button>
      </NavLink>
      <NavLink
        to="/routines/new"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Create Routine</button>
      </NavLink>
    </div>
  );
}

export default RoutinesNavBar;
