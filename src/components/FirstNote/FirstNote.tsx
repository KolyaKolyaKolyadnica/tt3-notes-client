import style from "./FirstNote.module.css";
import { INote } from "../../types/types";
import { useEffect, useState } from "react";
import SecondNote from "../SecondNote/SecondNote";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  moveNote,
  removeNote,
  updateTextOfNote,
} from "../../redux/notes/notesOptions";

export default function FirstNote() {
  const { notes } = useAppSelector((store) => store.notes);
  const dispatch = useAppDispatch();

  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item.parentId === null) || {
      _id: "App",
      parentId: null,
      text: "",
      childrenId: [],
    }
  );

  useEffect(() => {
    const curNoteFromAll = notes.find((item) => item.parentId === null);
    if (curNoteFromAll) {
      setCurrentNote(curNoteFromAll);
    }
  }, [notes, dispatch]);

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
    dispatch(
      updateTextOfNote({
        id: currentNote._id,
        updatedNote: { ...currentNote, text },
      })
    );
  };

  return (
    <>
      <ul className={style.list}>
        My id: {currentNote._id}. My childrens:
        {currentNote.childrenId.map((item: string, index: number) => (
          <SecondNote
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

      <input
        type="text"
        placeholder="Enter new note"
        value={currentNote.text}
        onChange={(e) => changeText(e.target.value)}
      />

      <button type="button" onClick={clickOnAddBtn}>
        Add
      </button>
    </>
  );
}
