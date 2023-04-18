import { configureStore, combineReducers } from "@reduxjs/toolkit";

import notesReducer from "./notes/notesReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
