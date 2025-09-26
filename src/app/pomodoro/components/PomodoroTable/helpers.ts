import { type Cycle } from "../../../app/pomodoro/helpers";

export type PomodoroTableProps = {
  cycles: Cycle[];
  handlerDeleteAllCycles: () => void;
  handlerDeleteCycle: (id: string) => void;
};

export type PomodoroTableLineProps = {
  cycle: Cycle;
  position: number;
  handlerDeleteCycle: (id: string) => void;
};
