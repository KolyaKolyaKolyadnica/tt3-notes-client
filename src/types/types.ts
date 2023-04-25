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
export interface ISecondNote {
  noteId: string;
  parentId: string;
  firstNote: boolean;
  lastNote: boolean;
  removeMe: (id: string) => void;
  moveMe: (id: string, direction: string) => void;
}
export interface INoteComponent {
  notes: INote[];
  noteId?: string;
  parentId?: string;
  firstNote?: boolean;
  lastNote?: boolean;
  removeMe?: (id: string) => void;
  moveMe?: (id: string, direction: string) => void;
}

export interface IMoveNote {
  childId: string;
  parent: INote;
  direction: string;
}

export interface IInitialState {
  notes: INote[];
  isLoading: boolean;
  error: any;
}
