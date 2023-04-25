import { createSlice } from "@reduxjs/toolkit";
import {
  addNewNote,
  removeNote,
  getAllNotes,
  removeSublist,
  updateTextOfNote,
  moveNote,
} from "./notesOptions";
import { IInitialState, INote } from "../../types/types";

const startingNote = {
  _id: "App",
  parentId: null,
  text: "Start",
  childrenId: [],
};

const initialState = {
  notes: [startingNote],
  isLoading: false,
  error: null,
} as IInitialState;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Fulfilled

      .addCase(getAllNotes.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })
      .addCase(addNewNote.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })
      .addCase(removeNote.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })
      .addCase(removeSublist.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })
      .addCase(updateTextOfNote.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })
      .addCase(moveNote.fulfilled, (state, { payload }) => {
        state.notes = [...payload];
        state.isLoading = false;
      })

      //Pending

      .addCase(getAllNotes.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(addNewNote.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(removeNote.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(removeSublist.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateTextOfNote.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(moveNote.pending, (state, { payload }) => {
        state.isLoading = true;
      })

      //Rejected

      .addCase(getAllNotes.rejected, (state, { payload }) => {})
      .addCase(addNewNote.rejected, (state, { payload }) => {})
      .addCase(removeNote.rejected, (state, { payload }) => {})
      .addCase(removeSublist.rejected, (state, { payload }) => {})
      .addCase(updateTextOfNote.rejected, (state, { payload }) => {})
      .addCase(moveNote.rejected, (state, { payload }) => {});
  },
});

export default notesSlice.reducer;
