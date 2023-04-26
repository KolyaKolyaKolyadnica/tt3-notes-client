import style from "./HeaderOfNote.module.css";
import { INote } from "../../types/types";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IHeaderOfNote {
  firstNote: boolean | undefined;
  lastNote: boolean | undefined;
  removeMe: ((id: string) => void) | undefined;
  moveMe: ((id: string, direction: string) => void) | undefined;
  currentNote: INote;
}

export default function HeaderOfNote({
  firstNote,
  lastNote,
  removeMe,
  moveMe,
  currentNote,
}: IHeaderOfNote) {
  return (
    <div className={style.controllerContainer}>
      <div className={style.moveBtnContainer}>
        {!firstNote && (
          <button
            className={style.moveBtnUp}
            type="button"
            onClick={() => moveMe && moveMe(currentNote._id, "up")}
          >
            <ExpandLessIcon />
          </button>
        )}

        {!lastNote && (
          <button
            className={style.moveBtnDown}
            type="button"
            onClick={() => moveMe && moveMe(currentNote._id, "down")}
          >
            <ExpandMoreIcon />
          </button>
        )}
      </div>

      <button
        className={style.removeMeBtn}
        type="button"
        onClick={() => removeMe && removeMe(currentNote._id)}
      >
        <DeleteForeverIcon />
      </button>
    </div>
  );
}
