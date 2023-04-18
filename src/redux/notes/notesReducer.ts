import { createSlice } from "@reduxjs/toolkit";
import { addNewNote, removeNote, deleteSublist, updNote } from "./notesOptions";
import { INote } from "../../types/types";

const notesArr = [
  {
    id: "App",
    parentId: null,
    text: "Start",
    childrenId: ["s1i0", "s1i1", "s1i2"],
  },
  {
    id: "s1i0",
    parentId: "App",
    text: "s1i0 - text",
    childrenId: [],
  },
  {
    id: "s1i1",
    parentId: "App",
    text: "s1i1 - text",
    childrenId: ["s2i0", "s2i1"],
  },
  {
    id: "s1i2",
    parentId: "App",
    text: "s1i2 - text",
    childrenId: [],
  },
  {
    id: "s2i0",
    parentId: "s1i1",
    text: "ssssssssss",
    childrenId: [],
  },
  {
    id: "s2i1",
    parentId: "s1i1",
    text: "dddddddddddd",
    childrenId: [],
  },
] as INote[];

const initialState = {
  notes: notesArr,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewNote.fulfilled, (state, { payload }) => {
        state.notes = [...state.notes, payload];
      })
      .addCase(updNote.fulfilled, (state, { payload }) => {
        state.notes[payload.index] = payload.updatedNote;
      })
      .addCase(removeNote.fulfilled, (state, { payload }) => {
        state.notes = payload;
      })
      .addCase(deleteSublist.fulfilled, (state, { payload }) => {
        state.notes = payload;
      });
  },
});

export default notesSlice.reducer;
