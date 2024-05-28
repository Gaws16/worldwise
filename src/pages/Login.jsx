import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useReducer, useState } from "react";
import Button from "../components/Button";
const initialState = {
  email: "jack@example.com",
  password: "qwerty",
};
function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // const [email, setEmail] = useState("jack@example.com");
  // const [password, setPassword] = useState("qwerty");
  const [{ email, password }, dispatch] = useReducer(reducer, initialState);
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            value={password}
          />
        </div>
        <div>{error && error}</div>
        <div>
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
