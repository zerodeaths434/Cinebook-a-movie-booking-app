import NavClass from "./navbar.module.css";
import defaultImage from "../../images/default.png";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

function Navbar() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate(0);
  };

  return (
    <nav className={NavClass.navbar}>
      <Link to="/">
        <div className={NavClass.brand_title}>CineBook</div>
      </Link>
      {state.user ? (
        <>
          <img
            className={NavClass.user_image}
            src={defaultImage}
            alt="Profile Pic"
          ></img>
          <div className={NavClass.user_name}>{state.user.username}</div>
          <div className={NavClass.logout} onClick={handleLogout}>
            Logout
          </div>
        </>
      ) : (
        <div className={NavClass.login_signup}>
          <ul>
            <li>
              <Link to="/auth?mode=login">Login</Link>
            </li>
            <li>
              <Link to="/auth?mode=signup">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
