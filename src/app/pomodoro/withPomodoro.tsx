import { useCallback, useEffect, useReducer } from "react";
import { formatTime } from "./components/PomodoroDisplay/helpers";

import {
  playBeep,
  handlers,
  handlerPomodoroState,
  FIVE_MINUTES_IN_SECONDS,
  getInitialPomodoroState,
  ONE_SECOND_IN_MILLISECONDS,
  TWENTY_FIVE_MINUTES_IN_SECONDS,
} from "./helpers";

import type { PomodoroProps, withPomodoroType } from "./types";

const TITLE = "Pomodoro";

// eslint-disable-next-line react/display-name
const withPomodoro: withPomodoroType = (Component) => () => {
  const [state, dispatch] = useReducer(handlerPomodoroState, getInitialPomodoroState());

  const {
    setCycle,
    setValue,
    deleteCycle,
    deleteAllCycles,
    handlerStudying,
    setIsCountdownPaused,
    setIsCountdownRunning,
    setCurrentCycleStartedAt,
  } = handlers(dispatch);

  const done = useCallback(() => {
    if (!state.currentCycleStartedAt) return;

    const newStudying = !state.studying;
    const timeToWork = newStudying ? TWENTY_FIVE_MINUTES_IN_SECONDS : FIVE_MINUTES_IN_SECONDS;

    if (state.studying) {
      setCycle(state.currentCycleStartedAt);
    }

    setValue(timeToWork);
    setIsCountdownPaused(false);
    handlerStudying(newStudying);
    setIsCountdownRunning(false);
  }, [
    setCycle,
    setValue,
    state.studying,
    handlerStudying,
    setIsCountdownPaused,
    setIsCountdownRunning,
    state.currentCycleStartedAt,
  ]);

  const start = useCallback(() => {
    setIsCountdownRunning(true);
    setIsCountdownPaused(false);
    setCurrentCycleStartedAt(new Date());
  }, [setIsCountdownRunning, setIsCountdownPaused, setCurrentCycleStartedAt]);

  const pause = useCallback(() => {
    setIsCountdownPaused(true);
    setIsCountdownRunning(false);
  }, [setIsCountdownPaused, setIsCountdownRunning]);

  const resume = useCallback(() => {
    setIsCountdownRunning(true);
    setIsCountdownPaused(false);
  }, [setIsCountdownRunning, setIsCountdownPaused]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!state.isCountdownRunning || state.isCountdownPaused || !state.currentCycleStartedAt) {
      document.title = TITLE;

      return;
    }

    if (state.value <= 0) {
      done();

      playBeep();
      alert("Pomodoro cycle completed!");
      return;
    }

    timeout = setTimeout(() => {
      const oldValue = state.value;
      const newValue = oldValue - 1;

      document.title = `${TITLE} - ${formatTime(newValue)}`;
      setValue(newValue);
    }, ONE_SECOND_IN_MILLISECONDS);

    return () => clearTimeout(timeout);
  }, [done, setValue, state.value, state.isCountdownPaused, state.isCountdownRunning, state.currentCycleStartedAt]);

  const props: PomodoroProps = {
    state,
    start,
    pause,
    resume,
    done,
    deleteCycle,
    deleteAllCycles,
  };

  return <Component {...props} />;
};

export default withPomodoro;
