import style from "./SecondNote.module.css";
import { INote, ISecondNote } from "../../types/types";
import { useState } from "react";
import getMigratedNotesArr from "../../utils/getMigratedNotesArr";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  removeNote,
  updNote,
  deleteSublist,
} from "../../redux/notes/notesOptions";

export default function SecondNote({
  noteId,
  parentId,
  firstNote,
  lastNote,
  removeMe,
  moveMe,
}: ISecondNote) {
  const { notes } = useAppSelector((store) => store.notes);
  const dispatch = useAppDispatch();

  const [childrenId, setChildrenId] = useState<number>(0);
  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item.id === noteId) || {
      id: noteId,
      parentId,
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
  const removeSublist = () => {
    setCurrentNote({ ...currentNote, childrenId: [] });

    dispatch(
      deleteSublist({
        notes,
        updatedNote: { ...currentNote, childrenId: [] },
      })
    );
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
    <li className={style.note}>
      <div className={style.moveButtonContainer}>
        {!firstNote && (
          <button type="button" onClick={() => moveMe(currentNote.id, "up")}>
            Up
          </button>
        )}

        {!lastNote && (
          <button type="button" onClick={() => moveMe(currentNote.id, "down")}>
            Down
          </button>
        )}
      </div>

      <div>
        My id: {currentNote.id}
        <ul>
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
        <div>
          <button type="button" onClick={clickOnAddBtn}>
            Add Sublist
          </button>

          {currentNote.childrenId.length > 0 && (
            <button type="button" onClick={removeSublist}>
              Remove Sublist
            </button>
          )}
        </div>
      </div>

      <button type="button" onClick={() => removeMe(currentNote.id)}>
        Remove me
      </button>
    </li>
  );
}
