import style from "./Note.module.css";
import { INote, INoteComponent } from "../../types/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  moveNote,
  removeNote,
  removeSublist,
  updateTextOfNote,
} from "../../redux/notes/notesOptions";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

let timer: ReturnType<typeof setTimeout>;

export default function Note({
  notes,

  noteId,
  parentId,
  firstNote,
  lastNote,
  removeMe,
  moveMe,
}: INoteComponent) {
  const dispatch = useAppDispatch();

  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item._id === noteId) || notes[0]
  );

  useEffect(() => {
    const newNote = notes.find((item) => item._id === noteId);

    if (newNote) {
      setCurrentNote(newNote);
    }
  }, [notes]);

  const clickOnAddBtn = () => {
    const newNote = {
      parentId: currentNote._id,
      childrenId: [],
      text: "",
    };
    dispatch(addNewNote(newNote));
  };
  const removeChildById = (id: string) => {
    dispatch(removeNote(id));
  };
  const deleteSublist = () => {
    dispatch(removeSublist(currentNote._id));
  };
  const moveChildById = (id: string, direction: string) => {
    dispatch(
      moveNote({
        childId: id,
        parent: currentNote,
        direction,
      })
    );
  };

  const changeText = (text: string) => {
    clearTimeout(timer);
    setCurrentNote({ ...currentNote, text });
    timer = setTimeout(() => {
      dispatch(
        updateTextOfNote({
          id: currentNote._id,
          updatedNote: { ...currentNote, text },
        })
      );
    }, 1000);
  };

  return (
    <>
      {currentNote.parentId === null ? (
        //
        // First Note
        //
        <>
          <input
            className={style.input}
            type="text"
            placeholder="Enter new note"
            value={currentNote && currentNote.text}
            onChange={(e) => changeText(e.target.value)}
          />

          <ul className={style.list}>
            {currentNote &&
              currentNote.childrenId.map((item: string, index: number) => (
                <Note
                  notes={notes}
                  key={item}
                  noteId={item}
                  parentId={currentNote._id}
                  firstNote={index === 0 ? true : false}
                  lastNote={
                    index === currentNote.childrenId.length - 1 ? true : false
                  }
                  removeMe={removeChildById}
                  moveMe={moveChildById}
                />
              ))}
          </ul>

          <button
            className={style.addSublistBtn}
            type="button"
            onClick={clickOnAddBtn}
          >
            Add new note
            <AddCircleOutlineIcon />
          </button>
        </>
      ) : (
        //
        // Other Notes
        //
        <li className={style.note}>
          {!firstNote && (
            <button
              className={style.moveBtn}
              type="button"
              onClick={() => moveMe && moveMe(currentNote._id, "up")}
            >
              <ExpandLessIcon />
            </button>
          )}
          <div className={style.noteContainer}>
            <input
              className={style.input}
              type="text"
              placeholder="Enter new note"
              value={currentNote.text}
              onChange={(e) => changeText(e.target.value)}
            />

            <button
              className={style.removeMeBtn}
              type="button"
              onClick={() => removeMe && removeMe(currentNote._id)}
            >
              <RemoveCircleOutlineIcon />
            </button>
          </div>
          <div className={style.listContainer}>
            <ul className={style.list}>
              {currentNote.childrenId.length === 0 && "You can add sublists"}

              {currentNote.childrenId.map((item: string, index: number) => (
                <Note
                  notes={notes}
                  key={item}
                  noteId={item}
                  parentId={currentNote._id}
                  firstNote={index === 0 ? true : false}
                  lastNote={
                    index === currentNote.childrenId.length - 1 ? true : false
                  }
                  removeMe={removeChildById}
                  moveMe={moveChildById}
                />
              ))}
            </ul>

            <div className={style.controllBtnContainer}>
              <button
                type="button"
                onClick={clickOnAddBtn}
                className={style.addSublistBtn}
              >
                <span className={style.btnAssignment}>Add new sublist</span>
                <AddCircleOutlineIcon />
              </button>

              {currentNote.childrenId.length > 0 && (
                <button
                  type="button"
                  onClick={deleteSublist}
                  className={style.removeSublistBtn}
                >
                  <HighlightOffIcon />
                  <span className={style.btnAssignment}>Remove sublists</span>
                </button>
              )}
            </div>
          </div>
          {!lastNote && (
            <button
              className={style.moveBtn}
              type="button"
              onClick={() => moveMe && moveMe(currentNote._id, "down")}
            >
              <ExpandMoreIcon />
            </button>
          )}
        </li>
      )}
    </>
  );
}
