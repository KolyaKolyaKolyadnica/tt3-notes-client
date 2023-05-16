import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/notesApi";
import { AxiosResponse } from "axios";
import { IUserServerResponse } from "../../types/types";

interface IUserBody {
  username?: string;
  email: string;
  password: string;
}

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { data } = await api.logout();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (userBody: IUserBody, thunkAPI) => {
    try {
      const { data }: AxiosResponse<IUserServerResponse, any> = await api.login(
        userBody
      );

      localStorage.setItem("notes-token", data.accessToken);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const registration = createAsyncThunk(
  "auth/registration",
  async (userBody: IUserBody, thunkAPI) => {
    try {
      const { data }: AxiosResponse<IUserServerResponse, any> =
        await api.registration(userBody);

      localStorage.setItem("notes-token", data.accessToken);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const { data }: AxiosResponse<IUserServerResponse, any> =
        await api.checkAuth();

      localStorage.setItem("notes-token", data.accessToken);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
