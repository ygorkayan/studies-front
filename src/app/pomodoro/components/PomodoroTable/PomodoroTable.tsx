import styles from "./PomodoroTable.module.css";
import type { FC } from "react";
import Button from "../../../components/Button/Button";
import type { PomodoroTableProps } from "./helpers";
import { PomodoroTableLine } from "./PomodoroTableLine";

export const PomodoroTable: FC<PomodoroTableProps> = ({ cycles, handlerDeleteCycle, handlerDeleteAllCycles }) => {
  const lines = cycles
    .sort((current, next) => current.finishedAt.valueOf() - next.finishedAt.valueOf())
    .map((cycle, index) => (
      <PomodoroTableLine handlerDeleteCycle={handlerDeleteCycle} key={cycle.id} cycle={cycle} position={index + 1} />
    ));

  return (
    <div className={styles.container}>
      <div className={styles.tab}>{lines}</div>

      <Button onClick={() => handlerDeleteAllCycles()}>Delete All Cycles</Button>
    </div>
  );
};

export default PomodoroTable;
