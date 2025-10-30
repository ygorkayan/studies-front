import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";
import withPomodoro from "./withPomodoro";
import type { PomodoroProps } from "./types";
import { FIVE_MINUTES_IN_SECONDS, TWENTY_FIVE_MINUTES_IN_SECONDS } from "./helpers";
import type { FC } from "react";

export const Pomodoro: FC<PomodoroProps> = ({
  setCycle,
  setValue,
  handlerStudying,
  handlerDeleteCycle,
  setIsCountdownPaused,
  setIsCountdownRunning,
  handlerDeleteAllCycles,
  setCurrentCycleStartedAt,
  state,
}) => (
  <div className={styles.container}>
    <PomodoroDisplay time={state.value} studying={state.studying} />

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

          const newStudying = !state.studying;
          const timeToWork = newStudying ? TWENTY_FIVE_MINUTES_IN_SECONDS : FIVE_MINUTES_IN_SECONDS;

          handlerStudying(newStudying);
          setCycle(state.currentCycleStartedAt);
          setIsCountdownRunning(false);
          setIsCountdownPaused(false);
          setValue(timeToWork);
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

const PomodoroWithHOC = withPomodoro(Pomodoro);

export default PomodoroWithHOC;
