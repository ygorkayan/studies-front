import { useEffect, useReducer } from "react";
import { formatTime } from "./components/PomodoroDisplay/helpers";

import {
  playBeep,
  handlers,
  handlerPomodoroState,
  getInitialPomodoroState,
  ONE_SECOND_IN_MILLISECONDS,
  TWENTY_FIVE_MINUTES_IN_SECONDS,
} from "./helpers";

import type { PomodoroProps, withPomodoroType } from "./types";

const TITLE = "Pomodoro";

const withPomodoro: withPomodoroType = (Component) => () => {
  const [state, dispatch] = useReducer(handlerPomodoroState, getInitialPomodoroState());

  const {
    setCycle,
    setValue,
    handlerDeleteCycle,
    setIsCountdownPaused,
    setIsCountdownRunning,
    handlerDeleteAllCycles,
    setCurrentCycleStartedAt,
  } = handlers(dispatch);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!state.isCountdownRunning || state.isCountdownPaused || !state.currentCycleStartedAt) {
      document.title = TITLE;

      return;
    }

    if (state.value <= 0) {
      playBeep();
      setCycle(state.currentCycleStartedAt);
      setIsCountdownRunning(false);
      setIsCountdownPaused(false);
      setValue(TWENTY_FIVE_MINUTES_IN_SECONDS);
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
  }, [
    state.isCountdownRunning,
    state.value,
    setCycle,
    setIsCountdownPaused,
    setValue,
    state.currentCycleStartedAt,
    setIsCountdownRunning,
    state.isCountdownPaused,
  ]);

  const props: PomodoroProps = {
    state,
    setCycle,
    setValue,
    handlerDeleteCycle,
    setIsCountdownPaused,
    setIsCountdownRunning,
    handlerDeleteAllCycles,
    setCurrentCycleStartedAt,
  };

  return <Component {...props} />;
};

export default withPomodoro;
