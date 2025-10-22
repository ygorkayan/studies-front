import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";
import withPomodoro from "./withPomodoro";
import type { PomodoroProps } from "./types";
import { TWENTY_FIVE_MINUTES_IN_SECONDS } from "./helpers";
import type { FC } from "react";

export const Pomodoro: FC<PomodoroProps> = ({
  setCycle,
  setValue,
  handlerDeleteCycle,
  setIsCountdownPaused,
  setIsCountdownRunning,
  handlerDeleteAllCycles,
  setCurrentCycleStartedAt,
  state,
}) => (
  <div className={styles.container}>
    <PomodoroDisplay time={state.value} />

    <div className={styles["buttons-container"]}>
      {!state.isCountdownRunning && !state.isCountdownPaused && (
        <Button
          onClick={() => {
            setIsCountdownRunning(true);
            setIsCountdownPaused(false);
            setCurrentCycleStartedAt(new Date());
          }}
        >
          Start
        </Button>
      )}

      {state.isCountdownRunning && !state.isCountdownPaused && (
        <Button
          onClick={() => {
            setIsCountdownRunning(false);
            setIsCountdownPaused(true);
          }}
        >
          Pause
        </Button>
      )}

      {state.isCountdownPaused && !state.isCountdownRunning && (
        <Button
          onClick={() => {
            setIsCountdownRunning(true);
            setIsCountdownPaused(false);
          }}
        >
          Resume
        </Button>
      )}

      <Button
        disabled={!state.isCountdownRunning && !state.isCountdownPaused}
        onClick={() => {
          if (!state.currentCycleStartedAt) return;

          setCycle(state.currentCycleStartedAt);
          setIsCountdownRunning(false);
          setIsCountdownPaused(false);
          setValue(TWENTY_FIVE_MINUTES_IN_SECONDS);
        }}
      >
        Done
      </Button>
    </div>

    <PomodoroTable
      cycles={state.cycles}
      handlerDeleteCycle={handlerDeleteCycle}
      handlerDeleteAllCycles={handlerDeleteAllCycles}
    />
  </div>
);

export default withPomodoro(Pomodoro);
