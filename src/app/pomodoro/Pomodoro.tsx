import styles from "./Pomodoro.module.css";
import Button from "../components/Button/Button";
import { useEffect, useReducer } from "react";
import PomodoroDisplay from "./components/PomodoroDisplay/PomodoroDisplay";
import PomodoroTable from "./components/PomodoroTable/PomodoroTable";

import {
  playBeep,
  handlers,
  handlerPomodoroState,
  getInitialPomodoroState,
  ONE_SECOND_IN_MILLISECONDS,
  TWENTY_FIVE_MINUTES_IN_SECONDS,
} from "./helpers";

export const Pomodoro = () => {
  const [state, dispatch] = useReducer(handlerPomodoroState, getInitialPomodoroState());

  const {
    setCycle,
    setValue,
    setIsCountdownPaused,
    setIsCountdownRunning,
    setCurrentCycleStartedAt,
    handlerDeleteCycle,
    handlerDeleteAllCycles,
  } = handlers(dispatch);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!state.isCountdownRunning || state.isCountdownPaused || !state.currentCycleStartedAt) return;

    if (state.value <= 0) {
      playBeep();
      setCycle(state.currentCycleStartedAt);
      setIsCountdownRunning(false);
      setIsCountdownPaused(false);
      setValue(TWENTY_FIVE_MINUTES_IN_SECONDS);
      return;
    }

    timeout = setTimeout(() => {
      const oldValue = state.value;
      setValue(oldValue - 1);
    }, ONE_SECOND_IN_MILLISECONDS);

    return () => clearTimeout(timeout);
  }, [state.isCountdownRunning, state.value]);

  return (
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
};

export default Pomodoro;
