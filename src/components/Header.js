import { useEffect } from "react";

const Header = ({ token, setToken, user, setUser }) => {

  return (
    <div className="header">
      <h1>fitness-tracker</h1>
      {token
        ? <a onClick={() => { setToken(null); setUser(null); localStorage.removeItem('token') }}>Logout</a>
        : <a>Log In</a>
      }
    </div>
  );
}

export default Header;
