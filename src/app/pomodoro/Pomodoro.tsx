import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";
import withPomodoro from "./withPomodoro";
import type { PomodoroProps } from "./types";
import type { FC } from "react";

export const Pomodoro: FC<PomodoroProps> = ({ state, start, pause, resume, done, deleteCycle, deleteAllCycles }) => (
  <div className={styles.container}>
    <PomodoroDisplay time={state.value} studying={state.studying} />

    <div className={styles["buttons-container"]}>
      {!state.isCountdownRunning && !state.isCountdownPaused && <Button onClick={start}>Start</Button>}

      {state.isCountdownRunning && !state.isCountdownPaused && <Button onClick={pause}>Pause</Button>}

      {state.isCountdownPaused && !state.isCountdownRunning && <Button onClick={resume}>Resume</Button>}

      <Button disabled={!state.isCountdownRunning && !state.isCountdownPaused} onClick={done}>
        Done
      </Button>
    </div>

    <PomodoroTable cycles={state.cycles} deleteCycle={deleteCycle} deleteAllCycles={deleteAllCycles} />
  </div>
);

const PomodoroWithHOC = withPomodoro(Pomodoro);

export default PomodoroWithHOC;
