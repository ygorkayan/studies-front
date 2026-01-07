import type { FC } from "react";
import styles from "./Text.module.css";

interface TextareaProps {
  width?: string;
  height?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ defaultValue, width, height, onChange = () => {} }) => (
  <textarea
    className={styles.textarea}
    style={{ width, height }}
    defaultValue={defaultValue}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Textarea;
