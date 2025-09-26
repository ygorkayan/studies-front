import styles from "./PomodoroDisplay.module.css";
import type { FC } from "react";
import { formatTime } from "./helpers";

export const PomodoroDisplay: FC<{ time: number }> = ({ time }) => {
  return <div className={styles["countdown-container"]}>{formatTime(time)}</div>;
};

export default PomodoroDisplay;
