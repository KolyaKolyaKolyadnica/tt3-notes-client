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

import HeaderOfNote from "../HeaderOfNote/HeaderOfNote";
import List from "../List/List";
import Input from "../Input/Input";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "../../hooks/useAppSelector";

import { ToastContainer, toast } from "react-toastify";

let timer: ReturnType<typeof setTimeout>;

export default function Note({
  notes,

  noteId,
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
          <List
            notes={notes}
            currentNote={currentNote}
            removeChildById={removeChildById}
            moveChildById={moveChildById}
          />
          <Input currentNote={currentNote} changeText={changeText} />
          <AddButton action={clickOnAddBtn} usage={"Add"} />
        </>
      ) : (
        //
        // Other Notes
        //
        <li className={style.note}>
          <HeaderOfNote
            firstNote={firstNote}
            lastNote={lastNote}
            removeMe={removeMe}
            moveMe={moveMe}
            currentNote={currentNote}
          />

          <List
            notes={notes}
            currentNote={currentNote}
            removeChildById={removeChildById}
            moveChildById={moveChildById}
          />

          <div className={style.noteContainer}>
            <div className={style.controllBtnContainer}>
              <AddButton action={clickOnAddBtn} usage={"Add Sublist"} />

              {currentNote.childrenId.length > 0 && (
                <AddButton action={deleteSublist} usage={"Remove Sublists"} />
              )}
            </div>

            <Input currentNote={currentNote} changeText={changeText} />
          </div>
        </li>
      )}
    </>
  );
}
