import "./login.css";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState(false);
  const { dispatch } = useGlobalContext();

  const isLogin = searchParams.get("mode") === "login";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await fetch("http://localhost:8080/auth/verify", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        //var decoded = jwt_decode(data.accessToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        if (data.user) {
          navigate("/");
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          toast.error(data);
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } else {
      setError(false);
      try {
        const res = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data) {
          toast.success("Registered Successfully");
          setTimeout(() => navigate("/auth?mode=login"), 1350);
        }
      } catch (err) {
        setError(true);
        console.log(err);
      }
    }
  };

  return (
    <section className="login">
      <ToastContainer
        className="toast-position"
        position="top-center"
        autoClose={1300}
      />
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          <div className={isLogin ? "input-field show" : "input-field"}>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              required={!isLogin}
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
            <span></span>
            <label>Password</label>
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <div className="signup-link">
            {isLogin ? "Not a member?" : "Already have an account?"}
            <Link to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? " Sign Up" : " Login"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
