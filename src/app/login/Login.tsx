import styles from "./Login.module.css";
import { type FC, type JSX, useCallback, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { login } from "./helper";

export const Login: FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  if (token) {
    return <>{children}</>;
  }

  const tryLogin = useCallback(async () => {
    const result = await login(user, password);

    if (result.logged) {
      localStorage.setItem("token", result.token);
      window.location.reload();
    } else {
      setUser("");
      setPassword("");
    }
  }, [user, password]);

  return (
    <div className={styles.container}>
      <main className={styles.login}>
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
      </main>
    </div>
  );
};

export default Login;
