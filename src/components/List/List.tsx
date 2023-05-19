import { useAppSelector } from "../../hooks/useAppSelector";
import { INote } from "../../types/types";
import Note from "../Note/Note";
import style from "./List.module.css";

interface IList {
  notes: INote[];
  currentNote: INote;
  removeChildById: (id: string) => void;
  moveChildById: (id: string, direction: string) => void;
}

export default function List({
  notes,
  currentNote,
  removeChildById,
  moveChildById,
}: IList) {
  const { isLoading } = useAppSelector((store) => store.notes);

  const getListClassName = (arr: string[]): string => {
    return isLoading ? `${arr[0]} ${arr[1]}` : arr[0];
  };

  return (
    <ul className={getListClassName([style.list, style.loading])}>
      {currentNote.childrenId.length === 0 && (
        <span className={style.emptyListText}>You can add sublists here</span>
      )}

      {currentNote.childrenId.map((item: string, index: number) => (
        <Note
          notes={notes}
          key={item}
          noteId={item}
          parentId={currentNote._id}
          isFirstNote={index === 0 && true}
          isLastNote={index === currentNote.childrenId.length - 1 && true}
          removeCurrentNote={removeChildById}
          moveCurrentNote={moveChildById}
        />
      ))}
    </ul>
  );
}
