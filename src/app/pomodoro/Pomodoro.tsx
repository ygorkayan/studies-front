import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";
import withPomodoro from "./withPomodoro";
import type { PomodoroProps } from "./types";
import type { FC } from "react";

export const Pomodoro: FC<PomodoroProps> = ({
  time,
  done,
  start,
  pause,
  resume,
  cycles,
  isStart,
  studying,
  isRunning,
  deleteCycle,
  deleteAllCycles,
}) => (
  <div className={styles.container}>
    <PomodoroDisplay time={time} studying={studying} />

    <div className={styles["buttons-container"]}>
      {isStart && <Button onClick={start}>Start</Button>}

      {isRunning && <Button onClick={pause}>Pause</Button>}

      {!isRunning && !isStart && <Button onClick={resume}>Resume</Button>}

      <Button disabled={isStart} onClick={done}>
        Done
      </Button>
    </div>

    <PomodoroTable cycles={cycles} deleteCycle={deleteCycle} deleteAllCycles={deleteAllCycles} />
  </div>
);

const PomodoroWithHOC = withPomodoro(Pomodoro);

export default PomodoroWithHOC;
