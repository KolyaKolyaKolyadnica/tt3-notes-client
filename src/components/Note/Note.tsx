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

    // const newNote = !noteId
    //   ? notes.find((item) => item.parentId === null)
    //   : notes.find((item) => item._id === noteId);

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
    }, 500);
  };

  return (
    <>
      {currentNote.parentId === null ? (
        //
        // First Note
        //
        <>
          <ul className={style.list}>
            My id: {currentNote._id}. My childrens:
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
                // <li key={item}>key={item}</li>
              ))}
          </ul>

          <input
            type="text"
            placeholder="Enter new note"
            value={currentNote && currentNote.text}
            onChange={(e) => changeText(e.target.value)}
          />

          <button type="button" onClick={clickOnAddBtn}>
            Add
          </button>
        </>
      ) : (
        //
        // Other Notes
        //
        <li className={style.note}>
          <div className={style.moveButtonContainer}>
            {!firstNote && (
              <button
                type="button"
                onClick={() => moveMe && moveMe(currentNote._id, "up")}
              >
                Up
              </button>
            )}

            {!lastNote && (
              <button
                type="button"
                onClick={() => moveMe && moveMe(currentNote._id, "down")}
              >
                Down
              </button>
            )}
          </div>

          <div>
            My id: {currentNote._id}
            <ul>
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

          <button
            type="button"
            onClick={() => removeMe && removeMe(currentNote._id)}
          >
            Remove me
          </button>
        </li>
      )}
    </>
  );
}
