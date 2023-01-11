import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ token, setToken, user, setUser }) => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <h1>fitness-tracker</h1>
      {token
        ? <a onClick={() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          navigate('/home')
        }}>Logout</a>
        : <NavLink to="/login">Log In</NavLink>
      }
    </div>
  );
}

export default Header;
