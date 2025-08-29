import "./App.css";
import Button from "./components/Button/Button";
import { useNavigate } from "react-router";

export const App = () => {
  let navigate = useNavigate();

  return (
    <div className="container">
      <Button onClick={() => navigate("/pomodoro")}>Pomodoro</Button>

      <Button onClick={() => navigate("/flash-cards")}>Flash Cards</Button>
    </div>
  );
};

export default App;
