import { createSlice } from "@reduxjs/toolkit";
import {
  addNewNote,
  removeNote,
  getAllNotes,
  removeSublist,
  updateTextOfNote,
  moveNote,
  claerNotesFromRedux,
} from "./notesOptions";
import { INote } from "../../types/types";

interface IInitialState {
  notes: INote[];
  isLoading: boolean;
  error: any;
}
const initialState = {
  notes: [],
  isLoading: false,
  error: null,
} as IInitialState;

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Fulfilled

      .addCase(getAllNotes.fulfilled, (state, { payload }) => {
        state.notes = payload;
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
      .addCase(claerNotesFromRedux.fulfilled, (state, { payload }) => {
        state.notes = [];
      })

      //Pending

      .addCase(getAllNotes.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewNote.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeNote.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeSublist.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTextOfNote.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moveNote.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })

      //Rejected

      .addCase(getAllNotes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addNewNote.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(removeNote.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(removeSublist.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateTextOfNote.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(moveNote.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default notesSlice.reducer;
