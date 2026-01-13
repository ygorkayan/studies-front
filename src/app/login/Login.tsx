import styles from "./Login.module.css";
import { type FC, type JSX, useCallback, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { login } from "./service";

export const Login: FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const token = localStorage.getItem("token");

  const tryLogin = useCallback(async () => {
    const result = await login(user, password);

    if (result.logged) {
      localStorage.setItem("token", result.token);
      window.location.reload();
    } else {
      setUser("");
      setPassword("");
      setShowError(true);
    }
  }, [user, password]);

  if (token) {
    return <>{children}</>;
  }

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        tryLogin();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      {showError && (
        <div className={styles.error}>
          <p>Login failed. Please check your credentials.</p>
        </div>
      )}

      <form
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className={styles.title}>Login</h1>

        <div className={styles["mb-1"]}>
          <Input label="User" value={user} onChange={setUser} />
        </div>

        <div className={styles["mb-2"]}>
          <Input label="Password" type="password" value={password} onChange={setPassword} />
        </div>

        <div className={styles.button}>
          <Button onClick={() => tryLogin()}>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
