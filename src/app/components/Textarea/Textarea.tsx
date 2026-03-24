import { useId, type FC } from "react";
import styles from "./Text.module.css";

interface TextareaProps {
  width?: string;
  value?: string;
  label?: string;
  height?: string;
  onChange?: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ value, width, height, label, onChange = () => {} }) => {
  const id = useId();

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        lang="en"
        value={value}
        spellCheck={true}
        style={{ width, height }}
        className={styles.textarea}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Textarea;
