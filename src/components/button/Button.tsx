import { ButtonType } from "../../types/button.types";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.SyntheticEvent<HTMLButtonElement, Event>) => void;
  type: ButtonType;
};

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
