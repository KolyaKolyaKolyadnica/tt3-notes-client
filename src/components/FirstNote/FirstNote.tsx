import style from "./FirstNote.module.css";
import { INote } from "../../types/types";
import { useEffect, useState } from "react";
import SecondNote from "../SecondNote/SecondNote";
import getMigratedNotesArr from "../../utils/getMigratedNotesArr";
import { useAppSelector } from "../../hooks/useAppSelector";
import store from "../../redux/store";
import throttle from "../../utils/throttle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  removeNote,
  updNote,
} from "../../redux/notes/notesOptions";

export default function FirstNote() {
  const { notes } = useAppSelector((store) => store.notes);
  const dispatch = useAppDispatch();

  const [childrenId, setChildrenId] = useState<number>(0);
  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item.parentId === null) || {
      id: "App",
      parentId: null,
      text: "",
      childrenId: [],
    }
  );

  const clickOnAddBtn = () => {
    const newNote = {
      id: `${currentNote.id}-${childrenId.toString()}`,
      parentId: currentNote.id,
      text: "",
      childrenId: [],
    };

    setCurrentNote({
      ...currentNote,
      childrenId: [...currentNote.childrenId, newNote.id],
    });
    setChildrenId(childrenId + 1);

    dispatch(addNewNote(newNote));
  };
  const removeChildById = (id: string) => {
    const filteredNotes = currentNote.childrenId.filter((item) => item !== id);
    setCurrentNote({ ...currentNote, childrenId: [...filteredNotes] });

    dispatch(removeNote({ id, notes }));
  };
  const moveChildById = (id: string, direction: string) => {
    const arr = getMigratedNotesArr(id, currentNote.childrenId, direction);
    setCurrentNote({ ...currentNote, childrenId: arr });

    dispatch(
      updNote({
        notes,
        updatedNote: { ...currentNote, childrenId: arr },
      })
    );
  };
  const changeText = (text: string) => {
    setCurrentNote({ ...currentNote, text });

    dispatch(
      updNote({
        notes,
        updatedNote: { ...currentNote, text },
      })
    );
  };

  return (
    <>
      <ul className={style.list}>
        My id: {currentNote.id}. My childrens:
        {currentNote.childrenId.map((item: string, index: number) => (
          <SecondNote
            key={item}
            noteId={item}
            parentId={currentNote.id}
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
