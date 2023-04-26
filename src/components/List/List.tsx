import { IList } from "../../types/types";
import Note from "../Note/Note";
import style from "./List.module.css";

export default function List({
  notes,

  currentNote,
  removeChildById,
  moveChildById,
}: IList) {
  return (
    <ul className={style.list}>
      {currentNote.childrenId.length === 0 && (
        <span className={style.emptyListText}>You can add sublists here</span>
      )}

      {currentNote.childrenId.map((item: string, index: number) => (
        <Note
          notes={notes}
          key={item}
          noteId={item}
          parentId={currentNote._id}
          firstNote={index === 0 ? true : false}
          lastNote={index === currentNote.childrenId.length - 1 ? true : false}
          removeMe={removeChildById}
          moveMe={moveChildById}
        />
      ))}
    </ul>
  );
}
