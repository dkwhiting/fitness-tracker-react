import { NavLink } from 'react-router-dom'

const RoutinesNavBar = ({ token }) => {

  return (
    <div className="sub-navbar">
      <NavLink
        to="/routines/public"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Public Routines</button>
      </NavLink>
      {token
        ? <NavLink
          to="/routines/user"
          className={({ isActive }) =>
            isActive ? "active-nav" : undefined
          }>
          <button>My Routines</button>
        </NavLink>
        : <></>
      }
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
