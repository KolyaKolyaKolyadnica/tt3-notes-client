import { ReactNode } from "react";
import style from "./Button.module.css";

interface IAddButton {
  action: () => void;
  children: ReactNode;
}

export default function Button({ action, children }: IAddButton) {
  return (
    <button className={style.button} type="button" onClick={action}>
      {children}
    </button>
  );
}
