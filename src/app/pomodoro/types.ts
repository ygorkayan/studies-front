import type { FC, JSX } from "react";

export type Cycle = {
  id: string;
  finishedAt: Date;
};

export type withPomodoroType = (Component: FC<PomodoroProps>) => () => JSX.Element;

export type PomodoroProps = {
  time: string;
  cycles: Cycle[];
  isStart: boolean;
  done: () => void;
  start: () => void;
  studying: boolean;
  pause: () => void;
  resume: () => void;
  isRunning: boolean;
  deleteAllCycles: () => void;
  deleteCycle: (id: string) => void;
};
