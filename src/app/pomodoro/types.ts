import { type ActionDispatch, type FC, type JSX } from "react";

export type Cycle = {
  id: string;
  startedAt: Date;
  finishedAt: Date;
};

export type PomodoroStateType = {
  studying: boolean;
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
    | "currentCycleStartedAt"
    | "studying";

  payload?: Cycle | number | boolean | Date | null | string;
};

export type ActionDispatchType = ActionDispatch<[action: PomodoroActionType]>;

export type withPomodoroType = (Component: FC<PomodoroProps>) => () => JSX.Element;

export type PomodoroProps = {
  state: PomodoroStateType;
  handlerStudying: (studying: boolean) => void;
  setCycle: (value: Date) => void;
  setValue: (value: number) => void;
  setIsCountdownPaused: (value: boolean) => void;
  setIsCountdownRunning: (value: boolean) => void;
  setCurrentCycleStartedAt: (value: Date) => void;
  handlerDeleteCycle: (id: string) => void;
  handlerDeleteAllCycles: () => void;
};
