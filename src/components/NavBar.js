import { NavLink } from 'react-router-dom'

const NavBar = () => {

  return (
    <div className="navbar">
      <NavLink
        to="home"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Home</button>
      </NavLink>
      <NavLink
        to="routines"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Routines</button>
      </NavLink>

    </div>
  );
}

export default NavBar;
