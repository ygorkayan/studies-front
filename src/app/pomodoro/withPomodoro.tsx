import { useEffect, useReducer } from "react";
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

const withPomodoro: withPomodoroType = (Component) => () => {
  const [state, dispatch] = useReducer(handlerPomodoroState, getInitialPomodoroState());

  const {
    setCycle,
    setValue,
    handlerStudying,
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
      const newStudying = !state.studying;
      const timeToWork = newStudying ? TWENTY_FIVE_MINUTES_IN_SECONDS : FIVE_MINUTES_IN_SECONDS;

      if (state.studying) {
        setCycle(state.currentCycleStartedAt);
      }

      playBeep();
      setValue(timeToWork);
      setIsCountdownPaused(false);
      handlerStudying(newStudying);
      setIsCountdownRunning(false);
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
    state.studying,
    handlerStudying,
  ]);

  // refactor later to send only needed props (fnStart, fnPause fnResume, fnDone, fnDeleteCycle, fnDeleteAllCycles, state)
  const props: PomodoroProps = {
    state,
    setCycle,
    setValue,
    handlerStudying,
    handlerDeleteCycle,
    setIsCountdownPaused,
    setIsCountdownRunning,
    handlerDeleteAllCycles,
    setCurrentCycleStartedAt,
  };

  return <Component {...props} />;
};

export default withPomodoro;
