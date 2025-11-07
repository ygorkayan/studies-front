import { type ActionDispatch, type FC, type JSX } from "react";

export type Cycle = {
  id: string;
  startedAt: Date;
  finishedAt: Date;
};

export type PomodoroStateType = {
  value: number;
  cycles: Cycle[];
  studying: boolean;
  isCountdownPaused: boolean;
  isCountdownRunning: boolean;
  currentCycleStartedAt: Date | null;
};

export type PomodoroActionType = {
  type:
    | "cycles"
    | "delete-cycle"
    | "delete-all-cycle"
    | "value"
    | "isCountdownPaused"
    | "isCountdownRunning"
    | "currentCycleStartedAt"
    | "studying";

  payload?: Cycle | number | boolean | Date | null | string;
};

export type ActionDispatchType = ActionDispatch<[action: PomodoroActionType]>;

export type withPomodoroType = (Component: FC<PomodoroProps>) => () => JSX.Element;

export type PomodoroProps = {
  state: PomodoroStateType;
  done: () => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  deleteAllCycles: () => void;
  deleteCycle: (id: string) => void;
};

export type localStorageType = {
  expirationDate: number;
  value: PomodoroStateType;
};