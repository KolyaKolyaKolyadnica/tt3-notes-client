import style from "./Note.module.css";
import { INote } from "../../types/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  moveNote,
  removeNote,
  removeSublist,
  updateTextOfNote,
} from "../../redux/notes/notesOptions";

import HeaderOfNote from "../HeaderOfNote/HeaderOfNote";
import List from "../List/List";
import Input from "../Input/Input";
import Button from "../Button/Button";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppSelector } from "../../hooks/useAppSelector";
import store from "../../redux/store";

let timer: ReturnType<typeof setTimeout>;

interface INoteComponent {
  notes: INote[];
  noteId?: string;
  parentId?: string;
  isFirstNote?: boolean;
  isLastNote?: boolean;
  removeCurrentNote?: (id: string) => void;
  moveCurrentNote?: (id: string, direction: string) => void;
}

export default function Note({
  notes,
  noteId,
  isFirstNote = false,
  isLastNote = false,
  removeCurrentNote,
  moveCurrentNote,
}: INoteComponent) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);

  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item._id === noteId && item.userId === user.id) ||
      notes[0]
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
      userId: user.id,
    };
    dispatch(addNewNote(newNote));
  };
  const removeChildById = (id: string) => {
    dispatch(removeNote({ id, userId: user.id }));
  };
  const deleteSublist = () => {
    dispatch(removeSublist({ id: currentNote._id, userId: user.id }));
  };
  const moveChildById = (id: string, direction: string) => {
    dispatch(
      moveNote({
        childId: id,
        parent: currentNote,
        direction,
        userId: user.id,
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
          <List
            notes={notes}
            currentNote={currentNote}
            removeChildById={removeChildById}
            moveChildById={moveChildById}
          />
          <Input currentNote={currentNote} changeText={changeText} />
          <Button action={clickOnAddBtn}>
            Add
            <span className={style.addIcon}>
              <AddCircleOutlineIcon />
            </span>
          </Button>
        </>
      ) : (
        //
        // Other Notes
        //
        <li className={style.note}>
          {removeCurrentNote && moveCurrentNote && (
            <HeaderOfNote
              isFirstNote={isFirstNote}
              isLastNote={isLastNote}
              removeCurrentNote={removeCurrentNote}
              moveCurrentNote={moveCurrentNote}
              currentNote={currentNote}
            />
          )}

          <List
            notes={notes}
            currentNote={currentNote}
            removeChildById={removeChildById}
            moveChildById={moveChildById}
          />

          <div className={style.noteContainer}>
            <div className={style.controllBtnContainer}>
              <Button action={clickOnAddBtn}>
                Add Sublist
                <span className={style.addIcon}>
                  <AddCircleOutlineIcon />
                </span>
              </Button>

              {currentNote.childrenId.length > 0 && (
                <Button action={deleteSublist}>
                  <span className={style.removeIcon}>
                    <HighlightOffIcon />
                  </span>
                  Remove Sublists
                </Button>
              )}
            </div>

            <Input currentNote={currentNote} changeText={changeText} />
          </div>
        </li>
      )}
    </>
  );
}
