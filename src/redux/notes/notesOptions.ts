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
  userId: string;
}

export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (userId: string, thunkAPI) => {
    try {
      const data = await api.fetchAllNotes(userId);
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
      const data = await api.addNote(newNote);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async ({ id, userId }: { id: string; userId: string }, thunkAPI) => {
    try {
      const data = await api.removeNote(id, userId);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeSublist = createAsyncThunk(
  "notes/removeSublist",
  async ({ id, userId }: { id: string; userId: string }, thunkAPI) => {
    try {
      const data = await api.removeSublist(id, userId);

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
      const data = await api.updateTextOfNote(id, updatedNote);

      console.log("TEXT UPD data ======", data);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveNote = createAsyncThunk(
  "notes/moveNote",
  async ({ childId, parent, direction, userId }: IMoveNote, thunkAPI) => {
    try {
      const data = await api.moveNote(childId, parent, direction, userId);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
