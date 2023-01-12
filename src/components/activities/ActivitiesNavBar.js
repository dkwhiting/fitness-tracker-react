import { NavLink } from 'react-router-dom'

const ActivitiesNavBar = () => {

  return (
    <div className="sub-navbar">
      <NavLink
        end to="/activities"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Activities</button>
      </NavLink>
      <NavLink
        to="/activities/new"
        className={({ isActive }) =>
          isActive ? "active-nav" : undefined
        }>
        <button>Create Activity</button>
      </NavLink>

    </div>
  );
}

export default ActivitiesNavBar;
