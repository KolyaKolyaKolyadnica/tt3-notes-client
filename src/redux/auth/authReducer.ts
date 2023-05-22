import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./authOptions";
import { IError, IUserServerResponse } from "../../types/types";

const initialState = {
  isLoading: false,
  isAutorizated: false,
  error: null,
  user: {},
} as {
  isLoading: boolean;
  isAutorizated: boolean;
  error: IError | null;
  user: IUserServerResponse;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Fulfilled

      .addCase(logout.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.isAutorizated = false;
        state.user = {} as IUserServerResponse;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.isAutorizated = true;
        state.user = payload;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.isAutorizated = true;
        state.user = payload;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.isAutorizated = true;
        state.user = payload;
      })

      //Pending

      .addCase(logout.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(login.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(registration.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.pending, (state, { payload }) => {
        state.isLoading = true;
      })

      //Rejected

      .addCase(logout.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(login.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(registration.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(checkAuth.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
