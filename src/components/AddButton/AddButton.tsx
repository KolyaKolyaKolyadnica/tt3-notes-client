import { IAddButton } from "../../types/types";
import style from "./AddButton.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function AddButton({ action, usage }: IAddButton) {
  return (
    <button className={style.button} type="button" onClick={action}>
      {usage === "Add" && "Add"}
      {usage === "Add Sublist" && "Add Sublist"}

      {usage === "Remove Sublists" ? (
        <span className={style.removeIcon}>
          <HighlightOffIcon />
        </span>
      ) : (
        <span className={style.addIcon}>
          <AddCircleOutlineIcon />
        </span>
      )}

      {usage === "Remove Sublists" && "Remove Sublists"}
    </button>
  );
}
