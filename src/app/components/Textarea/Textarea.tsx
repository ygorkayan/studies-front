import type { FC } from "react";
import styles from "./Text.module.css";

interface TextareaProps {
  width?: string;
  height?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ value, width, height, onChange = () => {} }) => (
  <textarea
    value={value}
    style={{ width, height }}
    className={styles.textarea}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Textarea;
