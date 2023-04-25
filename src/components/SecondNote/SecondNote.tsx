import style from "./SecondNote.module.css";
import { INote, ISecondNote } from "../../types/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addNewNote,
  moveNote,
  removeNote,
  removeSublist,
  updateTextOfNote,
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

  const [currentNote, setCurrentNote] = useState<INote>(
    notes.find((item) => item._id === noteId) || {
      _id: noteId,
      parentId,
      text: "",
      childrenId: [],
    }
  );

  useEffect(() => {
    const curNoteFromAll = notes.find((item) => item._id === noteId);

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
    dispatch(
      updateTextOfNote({
        id: currentNote._id,
        updatedNote: { ...currentNote, text },
      })
    );
  };

  return (
    <li className={style.note}>
      <div className={style.moveButtonContainer}>
        {!firstNote && (
          <button type="button" onClick={() => moveMe(currentNote._id, "up")}>
            Up
          </button>
        )}

        {!lastNote && (
          <button type="button" onClick={() => moveMe(currentNote._id, "down")}>
            Down
          </button>
        )}
      </div>

      <div>
        My id: {currentNote._id}
        <ul>
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
        <div>
          <button type="button" onClick={clickOnAddBtn}>
            Add Sublist
          </button>

          {currentNote.childrenId.length > 0 && (
            <button type="button" onClick={deleteSublist}>
              Remove Sublist
            </button>
          )}
        </div>
      </div>

      <button type="button" onClick={() => removeMe(currentNote._id)}>
        Remove me
      </button>
    </li>
  );
}
