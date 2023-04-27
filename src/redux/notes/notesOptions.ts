import { createAsyncThunk } from "@reduxjs/toolkit";
import { INote, INewNote } from "../../types/types";
import api from "../../api/notesApi";

interface IUpdNote {
  id: string;
  updatedNote: INote;
}

interface IMoveNote {
  childId: string;
  parent: INote;
  direction: string;
}

export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (_, thunkAPI) => {
    try {
      const data = await api.fetchAllNotes();
      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async (newNote: INewNote, thunkAPI) => {
    try {
      const data = await api.addNote(newNote);

      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async (id: string, thunkAPI) => {
    try {
      const data = await api.removeNote(id);

      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeSublist = createAsyncThunk(
  "notes/removeSublist",
  async (id: string, thunkAPI) => {
    try {
      const data = await api.removeSublist(id);

      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTextOfNote = createAsyncThunk(
  "notes/updateTextOfNote",
  async ({ id, updatedNote }: IUpdNote, thunkAPI) => {
    try {
      const data = await api.updateTextOfNote(id, updatedNote);

      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveNote = createAsyncThunk(
  "notes/moveNote",
  async ({ childId, parent, direction }: IMoveNote, thunkAPI) => {
    try {
      const data = await api.moveNote(childId, parent, direction);

      return data as INote[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
