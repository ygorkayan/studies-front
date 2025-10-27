import styles from "./App.module.css";
import Button from "./components/Button/Button";
import { useNavigate } from "react-router";

export const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles["button-container"]}>
        <Button onClick={() => navigate("/pomodoro")}>Pomodoro</Button>
        <Button onClick={() => navigate("/flash-cards")}>Flash Cards</Button>
      </div>
    </div>
  );
};

export default App;
