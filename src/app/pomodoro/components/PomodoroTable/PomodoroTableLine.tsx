import styles from "./PomodoroTable.module.css";
import type { FC } from "react";
import type { PomodoroTableLineProps } from "./helpers";
import Button from "../../../components/Button/Button";

export const PomodoroTableLine: FC<PomodoroTableLineProps> = ({ cycle, position, handlerDeleteCycle }) => {
  const { format } = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={styles.line}>
      <span>{position}º pomodoro, Finished at {format(new Date(cycle.finishedAt))}</span>
      <Button onClick={() => handlerDeleteCycle(cycle.id)}>DELETE</Button>
    </div>
  );
};
