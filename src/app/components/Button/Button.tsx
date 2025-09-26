import type { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
