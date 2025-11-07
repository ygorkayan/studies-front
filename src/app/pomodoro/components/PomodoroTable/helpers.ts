import { type Cycle } from "../../types";

export type PomodoroTableProps = {
  cycles: Cycle[];
  deleteAllCycles: () => void;
  deleteCycle: (id: string) => void;
};

export type PomodoroTableLineProps = {
  cycle: Cycle;
  position: number;
  deleteCycle: (id: string) => void;
};
