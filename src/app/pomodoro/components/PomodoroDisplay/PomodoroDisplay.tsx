import styles from "./PomodoroDisplay.module.css";
import type { FC } from "react";
import { formatTime } from "./helpers";

export const PomodoroDisplay: FC<{ time: number; studying: boolean }> = ({ time, studying }) => (
  <div
    style={{ color: studying ? "var(--color-white)" : "var(--color-green)" }}
    className={styles["countdown-container"]}
  >
    {formatTime(time)}
  </div>
);

export default PomodoroDisplay;
