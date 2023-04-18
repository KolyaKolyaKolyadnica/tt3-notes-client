import { createAsyncThunk } from "@reduxjs/toolkit";

import { INote } from "../../types/types";

// const asyncWrapper = async (
//   apiMethod: Promise<IPromiseMovieCategory>,
//   thunkAPI: any
// ) => {
//   try {
//     const data = await apiMethod;
//     return data.results;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// };

interface IUpdNote {
  notes: INote[];
  updatedNote: INote;
}
interface IRemoveNote {
  id: string;
  notes: INote[];
}
interface IRemoveSublist {
  notes: INote[];
  updatedNote: INote;
}

export const addNewNote = createAsyncThunk(
  "notes/addNew",
  (newNote: INote, thunkAPI) => newNote
);
export const updNote = createAsyncThunk(
  "notes/update",
  ({ notes, updatedNote }: IUpdNote, thunkAPI) => {
    const index = notes.findIndex(
      (item) =>
        item.id === updatedNote.id && item.parentId === updatedNote.parentId
    );
    return { index, updatedNote };
  }
);
export const removeNote = createAsyncThunk(
  "notes/remove",
  ({ id, notes }: IRemoveNote, thunkAPI) => {
    const filteredNotes = notes.filter((item) => item.id !== id);
    return filteredNotes;
  }
);

export const deleteSublist = createAsyncThunk(
  "notes/deleteSublist",
  ({ notes, updatedNote }: IRemoveSublist, thunkAPI) => {
    const filteredNotes = notes.filter(
      (item) => item.parentId !== updatedNote.id
    );
    const index = filteredNotes.findIndex((item) => item.id === updatedNote.id);
    filteredNotes[index] = { ...updatedNote };
    return filteredNotes;
  }
);

export const x = createAsyncThunk(
  "notes/deleteSublist",
  ({ notes, updatedNote }: IRemoveSublist, thunkAPI) => {
    const filteredNotes = notes.filter(
      (item) => item.parentId !== updatedNote.id
    );
    const index = filteredNotes.findIndex((item) => item.id === updatedNote.id);
    filteredNotes[index] = { ...updatedNote };
    return filteredNotes;
  }
);

// export const getAllCategory = createAsyncThunk(
//   "movies/getAllCategory",
//   async (_, thunkAPI) => {
//     try {
//       const data = await api.getAllFirstPage();

//       const result = {
//         trends: data.trends.results,
//         popular: data.popular.results,
//         nowPlaying: data.nowPlaying.results,
//       };

//       return result as IPromiseAllMovieCategories;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
