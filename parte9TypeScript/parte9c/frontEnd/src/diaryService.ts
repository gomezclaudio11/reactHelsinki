import axios from "axios"

import type { DiaryEntry, NewDiaryEntry } from "./types"

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = async (): Promise<DiaryEntry[]> => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl);
    return data
};

export const createEntry = async (object: NewDiaryEntry):Promise<DiaryEntry> => {
    try {
        const { data } = await axios.post<DiaryEntry>(baseUrl, object);
        return data
    } catch (error: unknown) {
         if (axios.isAxiosError(error) && error.response) {
      // Devolvemos el mensaje de error del backend (400)
      throw new Error(error.response.data as string); 
    }
    throw new Error("Unknown error occurred during data creation.");
    }
}