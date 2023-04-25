import axios from "axios";
import { INote, INewNote } from "../types/types";

class NotesApi {
  URL: string;

  constructor() {
    this.URL = `http://localhost:4000/notes`;
  }

  async getData(requestStr: string) {
    const response = await fetch(requestStr);
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error("Ошибка. Что то пошло не так."));
  }

  fetchAllNotes(): Promise<INote[]> {
    const requestStr = `${this.URL}`;
    return this.getData(requestStr);
  }

  async addNote(note: INewNote): Promise<any> {
    const requestStr = `${this.URL}`;

    await axios.post(requestStr, note);

    return this.fetchAllNotes();
  }

  async removeNote(id: string): Promise<INote[]> {
    const requestStr = `${this.URL}/${id}`;

    await axios.delete(requestStr);

    return this.fetchAllNotes();
  }

  async removeSublist(id: string): Promise<INote[]> {
    const requestStr = `${this.URL}/remove-sublist/${id}`;

    await axios.delete(requestStr);

    return this.fetchAllNotes();
  }

  async updateTextOfNote(id: string, updatedNote: INote): Promise<INote[]> {
    const requestStr = `${this.URL}/${id}`;

    await axios.put(requestStr, updatedNote);

    return this.fetchAllNotes();
  }

  async moveNote(
    childId: string,
    parent: INote,
    direction: string
  ): Promise<INote[]> {
    const requestStr = `${this.URL}/move-${direction}/${childId}`;

    await axios.put(requestStr, parent);

    return this.fetchAllNotes();
  }
}

const api = new NotesApi();

export default api;
