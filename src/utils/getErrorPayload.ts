import { IError } from "../types/types";

export const getErrorPayload = (error: any): IError => {
  let errorText: string | string[] = error.response.data.message;

  if (typeof errorText !== "string") {
    error.response.data.message = errorText.join(", ");
  }

  return error.response.data;
};
