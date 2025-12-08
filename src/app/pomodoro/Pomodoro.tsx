import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";
import withPomodoro from "./withPomodoro";
import type { PomodoroProps } from "./types";
import type { FC } from "react";

export const Pomodoro: FC<PomodoroProps> = ({
  done,
  start,
  pause,
  value,
  resume,
  cycles,
  studying,
  deleteCycle,
  deleteAllCycles,
  isCountdownPaused,
  isCountdownRunning,
}) => (
  <div className={styles.container}>
    <PomodoroDisplay time={value} studying={studying} />

    <div className={styles["buttons-container"]}>
      {!isCountdownRunning && !isCountdownPaused && <Button onClick={start}>Start</Button>}

      {isCountdownRunning && !isCountdownPaused && <Button onClick={pause}>Pause</Button>}

      {isCountdownPaused && !isCountdownRunning && <Button onClick={resume}>Resume</Button>}

      <Button disabled={!isCountdownRunning && !isCountdownPaused} onClick={done}>
        Done
      </Button>
    </div>

    <PomodoroTable cycles={cycles} deleteCycle={deleteCycle} deleteAllCycles={deleteAllCycles} />
  </div>
);

const PomodoroWithHOC = withPomodoro(Pomodoro);

export default PomodoroWithHOC;
