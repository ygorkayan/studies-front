import { type ActionDispatch } from "react";

export type Cycle = {
  id: string;
  startedAt: Date;
  finishedAt: Date;
};

export type PomodoroStateType = {
  cycles: Cycle[];
  value: number;
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
    | "currentCycleStartedAt";
  payload?: Cycle | number | boolean | Date | null | string;
};

export type ActionDispatchType = ActionDispatch<[action: PomodoroActionType]>;
