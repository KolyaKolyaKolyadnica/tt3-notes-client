export interface INote {
  id: string;
  parentId: string | null;
  childrenId: string[];
  text: string;
}
export interface ISecondNote {
  noteId: string;
  parentId: string;
  firstNote: boolean;
  lastNote: boolean;
  removeMe: (id: string) => void;
  moveMe: (id: string, direction: string) => void;
}
