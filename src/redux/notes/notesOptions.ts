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

interface IFailedResponse {
  rejectValue: {
    error: string;
  };
}

export const getAllNotes = createAsyncThunk<INote[], void, IFailedResponse>(
  "notes/getAllNotes",
  async (_, thunkAPI) => {
    try {
      const data = await api.fetchAllNotes();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async (newNote: INewNote, thunkAPI) => {
    try {
      const data: INote[] = await api.addNote(newNote);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async (id: string, thunkAPI) => {
    try {
      const data: INote[] = await api.removeNote(id);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeSublist = createAsyncThunk(
  "notes/removeSublist",
  async (id: string, thunkAPI) => {
    try {
      const data: INote[] = await api.removeSublist(id);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTextOfNote = createAsyncThunk(
  "notes/updateTextOfNote",
  async ({ id, updatedNote }: IUpdNote, thunkAPI) => {
    try {
      const data: INote[] = await api.updateTextOfNote(id, updatedNote);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveNote = createAsyncThunk(
  "notes/moveNote",
  async ({ childId, parent, direction }: IMoveNote, thunkAPI) => {
    try {
      const data: INote[] = await api.moveNote(childId, parent, direction);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
