import style from "./HeaderOfNote.module.css";
import { INote } from "../../types/types";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "../Button/Button";

interface IHeaderOfNote {
  isFirstNote: boolean;
  isLastNote: boolean;
  removeCurrentNote: (id: string) => void;
  moveCurrentNote: (id: string, direction: string) => void;
  currentNote: INote;
}

export default function HeaderOfNote({
  isFirstNote,
  isLastNote,
  removeCurrentNote,
  moveCurrentNote,
  currentNote,
}: IHeaderOfNote) {
  return (
    <div className={style.controllerContainer}>
      <div className={style.moveBtnContainer}>
        {!isFirstNote && (
          <Button
            action={() =>
              moveCurrentNote && moveCurrentNote(currentNote._id, "up")
            }
          >
            <span className={style.arrow}>
              <ExpandLessIcon />
            </span>
          </Button>
        )}
        {!isLastNote && (
          <Button
            action={() =>
              moveCurrentNote && moveCurrentNote(currentNote._id, "down")
            }
          >
            <span className={style.arrow}>
              <ExpandMoreIcon />
            </span>
          </Button>
        )}
      </div>

      <button
        className={style.removeMeBtn}
        type="button"
        onClick={() => removeCurrentNote && removeCurrentNote(currentNote._id)}
      >
        <DeleteForeverIcon />
      </button>
    </div>
  );
}
