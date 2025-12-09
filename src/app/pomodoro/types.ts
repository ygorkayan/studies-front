import type { FC, JSX } from "react";

export type Cycle = {
  id: string;
  finishedAt: Date;
};

export type withPomodoroType = (Component: FC<PomodoroProps>) => () => JSX.Element;

export type PomodoroProps = {
  value: number;
  cycles: Cycle[];
  done: () => void;
  start: () => void;
  studying: boolean;
  pause: () => void;
  resume: () => void;
  isCountdownPaused: boolean;
  isCountdownRunning: boolean;
  deleteAllCycles: () => void;
  deleteCycle: (id: string) => void;
};
