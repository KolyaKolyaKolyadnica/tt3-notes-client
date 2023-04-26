import { IInput } from "../../types/types";
import style from "./Input.module.css";

export default function Input({ currentNote, changeText }: IInput) {
  return (
    <input
      className={style.input}
      type="text"
      placeholder="Enter new note"
      value={currentNote.text}
      onChange={(e) => changeText(e.target.value)}
    />
  );
}
