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
export interface INoteComponent {
  notes: INote[];
  noteId?: string;
  parentId?: string;
  firstNote?: boolean;
  lastNote?: boolean;
  removeMe?: (id: string) => void;
  moveMe?: (id: string, direction: string) => void;
}

export interface IList {
  notes: INote[];
  currentNote: INote;
  removeChildById: (id: string) => void;
  moveChildById: (id: string, direction: string) => void;
}

export interface IInput {
  currentNote: INote;
  changeText: (text: string) => void;
}

export interface IAddButton {
  action: () => void;
  usage: string;
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
