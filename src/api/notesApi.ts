import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { INote, INewNote } from "../types/types";

interface IUserBody {
  email: string;
  password: string;
  username?: string;
}

// Создание инстанса для axios. Для работы с headers.Authorization
//
const axiosInstance = axios.create({ withCredentials: true });
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "notes-token"
  )}`;
  return config;
});
axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log("axiosInstance.interceptors.response. error===", error);

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get("http://localhost:4000/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("notes-token", response.data.accessToken);
        console.log("NotesApi.prototype.URL", NotesApi.prototype.URL);

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log("Error. User not AUTH (axios.response in notesApi");
      }
    }

    throw error;
  }
);

// Альтернативынй вариант для навешивания хедеров на все запросы axios
//
// const tokenHandler = {
//   set(accessToken: string) {
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = "";
//   },
// };
//
// "withCredentials" и другие опции можно указать так:
// await axios.post(requestStr, { withCredentials: true })
//

class NotesApi {
  URL: string;

  constructor() {
    this.URL = "http://localhost:4000";
  }

  //
  // Работа с авторизацией:
  //

  async login(user: IUserBody) {
    const requestStr = `${this.URL}/auth/login`;
    return await axiosInstance.post(requestStr, user);
  }

  async registration(user: IUserBody) {
    const requestStr = `${this.URL}/auth/registration`;
    return await axiosInstance.post(requestStr, user);
  }

  async logout() {
    const requestStr = `${this.URL}/auth/logout`;
    return await axiosInstance.post(requestStr, { withCredentials: true });
  }

  async checkAuth() {
    const requestStr = `${this.URL}/auth/refresh`;
    return await axios.get(requestStr, { withCredentials: true });
  }
  //
  // Работа с заметками:
  //

  async getData(requestStr: string) {
    const response = await fetch(requestStr);
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error("Ошибка. Что то пошло не так."));
  }

  fetchAllNotes(userId: string): Promise<INote[]> {
    const requestStr = `${this.URL}/notes/all/${userId}`;
    return this.getData(requestStr);
  }

  async addNote(note: INewNote): Promise<INote[]> {
    const requestStr = `${this.URL}/notes`;

    await axios.post(requestStr, note);

    return this.fetchAllNotes(note.userId);
  }

  async removeNote(id: string, userId: string): Promise<INote[]> {
    const requestStr = `${this.URL}/notes/${id}`;

    await axios.delete(requestStr);

    return this.fetchAllNotes(userId);
  }

  async removeSublist(id: string, userId: string): Promise<INote[]> {
    const requestStr = `${this.URL}/notes/remove-sublist/${id}`;

    await axios.delete(requestStr);

    return this.fetchAllNotes(userId);
  }

  async updateTextOfNote(id: string, updatedNote: INote): Promise<INote[]> {
    const requestStr = `${this.URL}/notes/${id}`;

    await axios.put(requestStr, updatedNote);

    return this.fetchAllNotes(updatedNote.userId);
  }

  async moveNote(
    childId: string,
    parent: INote,
    direction: string,
    userId: string
  ): Promise<INote[]> {
    const requestStr = `${this.URL}/notes/move/${childId}?direction=${direction}`;

    await axios.put(requestStr, parent);

    return this.fetchAllNotes(userId);
  }
}

const api = new NotesApi();

export default api;
