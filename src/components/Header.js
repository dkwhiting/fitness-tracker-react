import { useEffect } from "react";

const Header = ({ token, setToken, user, setUser }) => {

  return (
    <div className="header">
      <h1>fitness-tracker</h1>
      {token
        ? <button onClick={() => setToken(null)}>Logout</button>
        : <button>Log In</button>
      }
    </div>
  );
}

export default Header;
