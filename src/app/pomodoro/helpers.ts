import type { ActionDispatchType, Cycle, PomodoroActionType, PomodoroStateType } from "./types";

export const TWENTY_FIVE_MINUTES_IN_SECONDS = 25 * 60;

export const FIVE_MINUTES_IN_SECONDS = 5 * 60;

export const ONE_SECOND_IN_MILLISECONDS = 1000;

export const getInitialPomodoroState: () => PomodoroStateType = () => {
  const storedState = localStorage.getItem("pomodoroState");

  if (storedState) {
    const parsedState = JSON.parse(storedState) as PomodoroStateType;
    return parsedState;
  } else {
    return {
      studying: false,
      cycles: [],
      isCountdownPaused: false,
      isCountdownRunning: false,
      currentCycleStartedAt: null,
      value: TWENTY_FIVE_MINUTES_IN_SECONDS,
    };
  }
};

export const handlerPomodoroState = (oldState: PomodoroStateType, action: PomodoroActionType): PomodoroStateType => {
  let newState = { ...oldState };

  if (action.type === "studying") {
    newState = { ...oldState, studying: action.payload as boolean };
  }

  if (action.type === "cycles") {
    newState = { ...oldState, cycles: [...(oldState.cycles || []), action.payload as Cycle] };
  }

  if (action.type === "delete-cycle" && action.payload) {
    newState = { ...oldState, cycles: oldState.cycles.filter((cycle) => cycle.id !== action.payload) };
  }

  if (action.type === "delete-all-cycle") {
    newState = { ...oldState, cycles: [] };
  }

  if (action.type === "value" && typeof action.payload === "number") {
    newState = { ...oldState, value: action.payload as number };
  }

  if (action.type === "isCountdownPaused" && typeof action.payload === "boolean") {
    newState = { ...oldState, isCountdownPaused: action.payload as boolean };
  }

  if (action.type === "isCountdownRunning" && typeof action.payload === "boolean") {
    newState = { ...oldState, isCountdownRunning: action.payload as boolean };
  }

  if (action.type === "currentCycleStartedAt" && (action.payload instanceof Date || action.payload === null)) {
    newState = { ...oldState, currentCycleStartedAt: action.payload as Date | null };
  }

  localStorage.setItem("pomodoroState", JSON.stringify(newState));
  return newState;
};

export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
};

export const handlerStudying = (dispatch: ActionDispatchType) => (studying: boolean) => {
  dispatch({ type: "studying", payload: studying });
};

export const handlerCycles = (dispatch: ActionDispatchType) => (value: Date) => {
  dispatch({ type: "cycles", payload: { id: generateUniqueId(), startedAt: value, finishedAt: new Date() } });
};

export const handlerDeleteCycle = (dispatch: ActionDispatchType) => (id: string) => {
  dispatch({ type: "delete-cycle", payload: id });
};

export const handlerDeleteAllCycles = (dispatch: ActionDispatchType) => () => {
  dispatch({ type: "delete-all-cycle" });
};

export const handlerValues = (dispatch: ActionDispatchType) => (value: number) => {
  dispatch({ type: "value", payload: value });
};

export const handlerCountdownPaused = (dispatch: ActionDispatchType) => (value: boolean) => {
  dispatch({ type: "isCountdownPaused", payload: value });
};

export const handlerCountdownRunning = (dispatch: ActionDispatchType) => (value: boolean) => {
  dispatch({ type: "isCountdownRunning", payload: value });
};

export const handlerCycleStartedAt = (dispatch: ActionDispatchType) => (value: Date) => {
  dispatch({ type: "currentCycleStartedAt", payload: value });
};

export const handlers = (dispatch: ActionDispatchType) => {
  return {
    handlerStudying: handlerStudying(dispatch),
    setCycle: handlerCycles(dispatch),
    setValue: handlerValues(dispatch),
    handlerDeleteCycle: handlerDeleteCycle(dispatch),
    handlerDeleteAllCycles: handlerDeleteAllCycles(dispatch),
    setIsCountdownPaused: handlerCountdownPaused(dispatch),
    setIsCountdownRunning: handlerCountdownRunning(dispatch),
    setCurrentCycleStartedAt: handlerCycleStartedAt(dispatch),
  };
};

export const playBeep = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);
};
