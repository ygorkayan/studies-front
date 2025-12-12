import styles from "./PomodoroDisplay.module.css";
import type { FC } from "react";

export const PomodoroDisplay: FC<{ studying: boolean; time: string }> = ({ studying, time }) => (
  <div
    style={{ color: studying ? "var(--color-white)" : "var(--color-green)" }}
    className={styles["countdown-container"]}
  >
    {time}
  </div>
);

export default PomodoroDisplay;
