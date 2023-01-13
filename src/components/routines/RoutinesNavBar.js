import { NavLink } from 'react-router-dom'

const RoutinesNavBar = ({ token, user, setUserToView }) => {

  const userUrl = user ? `/routines/${user.username}` : ''

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
          to={userUrl}
          className={({ isActive }) =>
            isActive ? "active-nav" : undefined
          }>
          <button onClick={() => setUserToView(user.username)}>My Routines</button>
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
