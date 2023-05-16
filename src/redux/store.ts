import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notesReducer from "./notes/notesReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
