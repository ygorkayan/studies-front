import type { FC, MouseEventHandler, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
