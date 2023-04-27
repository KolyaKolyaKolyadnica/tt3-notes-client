export interface INote {
  _id: string;
  parentId: string | null;
  childrenId: string[];
  text: string;
}
export interface INewNote {
  parentId: string;
  childrenId: string[];
  text: string;
}
