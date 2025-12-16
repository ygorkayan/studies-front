import styles from "./Input.module.css";
import { type FC, useId } from "react";

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({ label, value, onChange, type = "text" }) => {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        className={styles.input}
        onChange={(event) => {
          onChange?.(event?.target?.value);
        }}
      />
    </div>
  );
};

export default Input;
