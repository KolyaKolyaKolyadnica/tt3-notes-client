import { ifError } from "assert";

export interface INote {
  _id: string;
  parentId: string | null;
  childrenId: string[];
  text: string;
  userId: string;
}
export interface INewNote {
  parentId: string;
  childrenId: string[];
  text: string;
  userId: string;
}
export interface IUserServerResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  email: string;
  username: string;
  isActivated: boolean;
}
export interface IError {
  statusCode: number;
  message: string;
  error?: string;
}
